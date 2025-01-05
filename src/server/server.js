const { Server } = require("socket.io");
const http = require("http");
const url = require("url");
const ytdl = require("ytdl-core");
const ytpl = require("ytpl");

// Config
const logLimit = 20;

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
  index: 0,
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
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    logs = [`${users[socket.id]} 離開了房間`, ...logs].slice(0, logLimit);
    if (users[socket.id]) delete users[socket.id];

    io.emit("receiveLog", logs);
    io.emit("receiveUsers", users);
  });

  socket.on("join", (username) => {
    logs = [`${username} 加入了房間`, ...logs].slice(0, logLimit);
    users[socket.id] = username;

    io.emit("receiveLog", logs);
    io.emit("receiveUsers", users);
  });

  socket.on("ready", () => {
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
  socket.on("updatePlayerState", (state) => {
    playerState = { ...playerState, ...state };
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
    playerState.playing = false;
    io.emit("receivePlayerState", playerState);
    await new Promise((resolve) => setTimeout(resolve, 100));
    io.emit("seek", playerState.playedSeconds);
    await new Promise((resolve) => setTimeout(resolve, 100));
    playerState.playing = true;
    io.emit("receivePlayerState", playerState);
  });
  socket.on("addTrack", (track) => {
    playerState.trackQueue.push(track);
    io.emit("receivePlayerState", playerState);
  });
  socket.on("addTracks", (tracks) => {
    playerState.trackQueue.push(...tracks);
    io.emit("receivePlayerState", playerState);
  });
  socket.on("removeTrack", (index) => {
    playerState.trackQueue.splice(index, 1);
    if (index < playerState.index) playerState.index--;
    playerState.index = Math.min(
      playerState.index,
      playerState.trackQueue.length - 1
    );
    playerState.index = Math.max(playerState.index, 0);
    io.emit("receivePlayerState", playerState);
  });
  socket.on("setTrackQueue", (trackQueue) => {
    playerState.trackQueue = trackQueue;
    playerState.index = 0;
    io.emit("receivePlayerState", playerState);
  });
  socket.on("nextTrack", () => {
    playerState.index =
      playerState.index == playerState.trackQueue.length - 1
        ? 0
        : playerState.index + 1;
    io.emit("receivePlayerState", playerState);
  });
  socket.on("prevTrack", () => {
    playerState.index =
      playerState.index == 0
        ? playerState.trackQueue.length - 1
        : playerState.index - 1;
    io.emit("receivePlayerState", playerState);
  });
  socket.on("setTrackIndex", (index) => {
    playerState.index = index;
    io.emit("receivePlayerState", playerState);
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
  socket.on("end", () => {
    if (playerState.random) {
      playerState.index = Math.floor(
        Math.random() * playerState.trackQueue.length
      );
      io.emit("receivePlayerState", playerState);
    } else {
      io.emit("nextTrack");
    }
  });
});

server.listen(4000, () => {
  console.log("WebSocket 和 HTTP API 伺服器啟動於端口 4000");
});
