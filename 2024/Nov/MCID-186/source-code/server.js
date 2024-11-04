const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { Novu } = require("@novu/node");

const novu = new Novu("<YOUR SECRET KEY>");
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

const notification = (data) => {
  try {
    novu.trigger("demo-verify-otp", {
      to: {
        subscriberId: "66be2642d3f9eb69fff3f2ca",
        email: `${data.email}`,
      },
      payload: {
        validationCode: data.code,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

io.on("connection", (socket) => {
  socket.on("verify-user", (data) => {
    notification(data);
    // console.log(data);
    socket.emit("user-verified", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
