const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});
const { Novu } = require("@novu/node");

const novu = new Novu("YOUR_API_KEY");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let posts = [];

const increaseLikes = (postId, array) => {
	for (let i = 0; i < array.length; i++) {
		if (array[i].id === postId) {
			array[i].likes += 1;
		}
	}
};
socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on("newPost", (data) => {
		posts.unshift(data);
		socket.emit("posts", posts);
	});
	socket.on("postLiked", (postId) => {
		increaseLikes(postId, posts);
		socket.emit("posts", posts);
	});
	socket.on("disconnect", () => {
		socket.disconnect();
	});
});

app.get("/api", (req, res) => {
	res.json({
		message: "Hello world",
	});
});

app.post("/notify", async (req, res) => {
	const { username } = req.body;
	await novu
		.trigger("TEMPLATE_ID", {
			to: {
				subscriberId: "SUBSCRIBER_ID",
			},
			payload: {
				username,
			},
		})
		.catch((err) => console.error(err));
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
