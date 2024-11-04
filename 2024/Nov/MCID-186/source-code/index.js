const http = require("http");
const WebSocket = require("ws");

//Browser websocket implementation
const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    // Process the Registration and send a response
    socket.send(message);
  });
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
