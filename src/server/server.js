const { Server } = require("socket.io");
const http = require("http");
const url = require("url");
const ytdl = require("ytdl-core");

let playerState = {
  playing: false,
  played: 0,
  playedSeconds: 0,
  loaded: 0,
  loadedSeconds: 0,
  duration: 0,
  playbackRate: 1,
  loop: false,
  trackQueue: [],
  index: 0,
};
let logs = [];
let users = {};

const server = http.createServer(async (req, res) => {
  console.log("received request", req.method, req.url);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

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

  io.to(socket.id).emit("receiveLog", logs);
  io.to(socket.id).emit("receiveUsers", users);
  io.to(socket.id).emit("receivePlayerState", playerState);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    logs = [`${users[socket.id]} 離開了房間`, ...logs].slice(0, 100);
    if (users[socket.id]) delete users[socket.id];

    io.emit("receiveLog", logs);
    io.emit("receiveUsers", users);
  });

  socket.on("join", (username) => {
    logs = [`${username} 加入了房間`, ...logs].slice(0, 100);
    users[socket.id] = username;

    io.emit("receiveLog", logs);
    io.emit("receiveUsers", users);
  });

  socket.on("setUsername", (username) => {
    users[socket.id] = username;
    io.emit("receiveUsers", users);
  });

  socket.on("setLog", (newLogs) => {
    logs = newLogs.slice(0, 100);
    io.emit("receiveLog", logs);
  });
  socket.on("addLog", (newLog) => {
    logs = [newLog, ...logs].slice(0, 100);
    io.emit("receiveLog", logs);
  });

  socket.on("setPlayerState", (state) => {
    playerState = { ...playerState, ...state };
    io.emit("receivePlayerState", playerState);
  });
  socket.on("getPlayerState", () => {
    io.to(socket.id).emit("getPlayerState", playerState);
  });
  socket.on("updatePlayerState", (state) => {
    playerState = { ...playerState, ...state };
  });

  socket.on("seek", (time) => {
    io.emit("seek", time);
  });
});

server.listen(4000, () => {
  console.log("WebSocket 和 HTTP API 伺服器啟動於端口 4000");
});
