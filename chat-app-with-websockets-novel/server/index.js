const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:5173",
	},
});

socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on("message", (data) => {
		console.log(data);
		socketIO.emit("messageResponse", data);
	});

	socket.on("disconnect", () => {
		console.log("🔥: A user disconnected");
	});
});

app.get("/api", (req, res) => {
	res.json({
		message: "Hello world",
	});
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
