const { Server } = require("socket.io");
const http = require("http");
const url = require("url");
const ytdl = require("ytdl-core");
const ytpl = require("ytpl");

// Config
const logLimit = 20;

let trackIndex = 0;
let playerState = {
  playing: false,
  played: 0,
  playedSeconds: 0,
  loaded: 0,
  loadedSeconds: 0,
  duration: 0,
  playbackRate: 1,
  loop: false,
  random: false,
  trackQueue: [],
  currentTrack: null,
  index: 0,
  isEnd: false,
};
let logs = [];
let users = {};

const server = http.createServer(async (req, res) => {
  console.log("received request", req.method, req.url);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, ngrok-skip-browser-warning"
  );

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url.startsWith("/api/ytdl")) {
    const query = url.parse(req.url, true).query;
    const { videoId } = query;

    if (!videoId) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "缺少 videoId 參數" }));
      return;
    }

    try {
      const info = await ytdl.getBasicInfo(
        `https://www.youtube.com/watch?v=${videoId}`
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(info.videoDetails));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "無法獲取影片資訊" }));
    }
    return;
  }

  if (req.url.startsWith("/api/ytpl")) {
    const query = url.parse(req.url, true).query;
    const { playlistId } = query;

    if (!playlistId) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "缺少 playlistId 參數" }));
      return;
    }

    try {
      const info = await ytpl(
        `https://www.youtube.com/playlist?list=${playlistId}`
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(info.items.filter((item) => item.isPlayable)));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "無法獲取影片資訊" }));
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "找不到該路由" }));
});

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    logs = [`${users[socket.id]} 離開了房間`, ...logs].slice(0, logLimit);
    if (users[socket.id]) delete users[socket.id];

    io.emit("receiveLog", logs);
    io.emit("receiveUsers", users);
  });

  socket.on("join", (username) => {
    console.log("A user connected:", socket.id);
    logs = [`${username} 加入了房間`, ...logs].slice(0, logLimit);
    users[socket.id] = username;

    io.emit("receiveLog", logs);
    io.emit("receiveUsers", users);
    io.to(socket.id).emit("receivePlayerState", playerState);
  });

  socket.on("setUsername", (username) => {
    users[socket.id] = username;
    io.emit("receiveUsers", users);
  });

  socket.on("addLog", (newLog) => {
    logs = [newLog, ...logs].slice(0, logLimit);
    io.emit("receiveLog", logs);
  });

  socket.on("setPlayerState", (state) => {
    playerState = { ...playerState, ...state };
    io.emit("receivePlayerState", playerState);
  });
  socket.on("onDuration", (duration) => {
    playerState.duration = duration;
  });
  socket.on("onProgress", (state) => {
    playerState.played = state.played;
    playerState.playedSeconds = state.playedSeconds;
    playerState.loaded = state.loaded;
    playerState.loadedSeconds = state.loadedSeconds;
  });
  socket.on("onEnd", () => {
    playerState.isEnd = true;
  });
  socket.on("play", () => {
    playerState.playing = true;
    io.emit("receivePlayerState", playerState);
  });
  socket.on("pause", () => {
    playerState.playing = false;
    io.emit("receivePlayerState", playerState);
  });
  socket.on("refresh", async () => {
    io.emit("receivePlayerState", playerState);
    io.emit("seek", playerState.playedSeconds);
  });
  socket.on("addTrack", (track) => {
    playerState.trackQueue.push(track);
    UpdateCurrentTrack(trackIndex);
  });
  socket.on("addTracks", (tracks) => {
    playerState.trackQueue.push(...tracks);
    UpdateCurrentTrack(trackIndex);
  });
  socket.on("removeTrack", (index) => {
    playerState.trackQueue.splice(index, 1);
    if (index < trackIndex) trackIndex--;
    trackIndex = Math.min(trackIndex, playerState.trackQueue.length - 1);
    trackIndex = Math.max(trackIndex, 0);
    UpdateCurrentTrack(trackIndex);
  });
  socket.on("setTrackQueue", (trackQueue) => {
    playerState.trackQueue = trackQueue;
    trackIndex = 0;
    UpdateCurrentTrack(trackIndex);
  });
  socket.on("nextTrack", () => {
    trackIndex =
      trackIndex == playerState.trackQueue.length - 1 ? 0 : trackIndex + 1;
    UpdateCurrentTrack(trackIndex);
  });
  socket.on("prevTrack", () => {
    trackIndex =
      trackIndex == 0 ? playerState.trackQueue.length - 1 : trackIndex - 1;
    UpdateCurrentTrack(trackIndex);
  });
  socket.on("setTrackIndex", (index) => {
    trackIndex = index;
    UpdateCurrentTrack(trackIndex);
  });
  socket.on("setPlaybackRate", (rate) => {
    playerState.playbackRate = rate;
    io.emit("receivePlayerState", playerState);
  });
  socket.on("setLoop", (loop) => {
    playerState.loop = loop;
    io.emit("receivePlayerState", playerState);
  });
  socket.on("setRandom", (random) => {
    playerState.random = random;
    io.emit("receivePlayerState", playerState);
  });
  socket.on("seek", (time) => {
    io.emit("seek", time);
  });
});

server.listen(4000, () => {
  console.log("Websocket and API server is running on port 4000");
});

const interval = setInterval(() => {
  // console.log("playerState: ", playerState);
  if (playerState.isEnd) HandleEnd();
}, 1000);

const HandleEnd = () => {
  playerState.isEnd = false;
  if (playerState.random) {
    trackIndex = Math.floor(Math.random() * playerState.trackQueue.length);
    UpdateCurrentTrack(trackIndex);
  } else if (playerState.trackQueue.length === 1) {
    io.emit("seek", 0);
  } else {
    trackIndex =
      trackIndex == playerState.trackQueue.length - 1 ? 0 : trackIndex + 1;
    UpdateCurrentTrack(trackIndex);
  }
};

const UpdateCurrentTrack = (index) => {
  const currentTrack = playerState.currentTrack;
  const newTrack = playerState.trackQueue[index] ?? null;
  if (currentTrack && newTrack && newTrack.id != currentTrack.id) {
    io.emit("seek", 0);
  }
  playerState.currentTrack = newTrack;
  playerState.index = index;
  io.emit("receivePlayerState", playerState);
};
