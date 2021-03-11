const express = require("express");
const socket = require("socket.io");

const app = express();

const server = app.listen(process.env.PORT || 4000, () =>
  console.log("Port 4000")
);

app.use(express.static("public"));

// socket setup
const io = socket(server);

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("chat", (data) => {
    console.log(data);
    io.sockets.emit("chat", data);
  });
  socket.on("keypress", (data) => {
    console.log(data);
    socket.broadcast.emit("keypress", data);
  });
});
