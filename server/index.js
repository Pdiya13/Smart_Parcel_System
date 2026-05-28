const http = require("http");
const { Server } = require("socket.io");

const app = require("../server/src/app");

const PORT = process.env.PORT || 8080;

// CREATE HTTP SERVER
const server = http.createServer(app);

// SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// GLOBAL SOCKET ACCESS
global.io = io;

// SOCKET CONNECTION
io.on("connection", (socket) => {

  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});

// START SERVER
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});