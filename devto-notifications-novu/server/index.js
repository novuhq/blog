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

const novu = new Novu("cdaa6070dfc6e6edf820515f19a90627");
app.use(cors());
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
	res.json({ message: "Hello" });
});

app.post("/notify", async (req, res) => {
	await novu
		.trigger("on-boarding-notification-DyhJZuHvb", {
			to: {
				subscriberId: "62d1fc97bbe3160014a8cb23",
			},
		})
		.then((data) => {
			console.log(data);
		})
		.catch((err) => console.error(err));
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
