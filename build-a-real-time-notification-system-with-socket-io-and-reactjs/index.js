const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const { Server } = require("socket.io");
const { Novu } = require("@novu/node");

const novu = new Novu(process.env.NOVU_SECRET_KEY);

const app = express();
app.use(cors());

const PORT = 3001;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const time = new Date();

const notification = (data) => {
  novu.trigger("demo-recent-login", {
    to: {
      subscriberId: "66be2642d3f9eb69fff3f2ca",
      email: data.email,
    },
    payload: {
      header: `Hi ${data.sender} you have an active chat at room ${data.room} login to continue chatting`,
      loginDate: JSON.parse(JSON.stringify(time)),
      loginLocation: "Unknown",
      userFirstName: data.username,
    },
  });
};

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data.room);
    socket.to(data.room).emit("user_joined", data);
  });

  socket.on("notify-user", (data) => {
    notification(data);
  });
  socket.on("send_message", (data) => {
    // console.log(data);
    socket.to(data.room).emit("recieve_message", data);
  });

  socket.on("disconnect", () => console.log("User disconnected", socket.id));
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
