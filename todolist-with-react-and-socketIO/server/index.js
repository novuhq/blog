const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const PORT = 4000;
const { Novu } = require("@novu/node");
const novu = new Novu("cdaa6070dfc6e6edf820515f19a90627");

const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

let todoList = [];

// const sendNotification = async (template_id) => {
// 	try {
// 		const result = await novu.trigger(template_id, {
// 			to: {
// 				subscriberId: "<YOUR_SUBSCRIBER_ID>",
// 			},
// 		});
// 		console.log(result);
// 	} catch (err) {
// 		console.error("Error >>>>", { err });
// 	}
// };
//http://localhost:61931/demo

socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on("addTodo", (todo) => {
		todoList.unshift(todo);
		socket.emit("todos", todoList);

		// sendNotification("<TEMPLATE_ID>");
	});

	socket.on("viewComments", (id) => {
		for (let i = 0; i < todoList.length; i++) {
			if (id === todoList[i].id) {
				socket.emit("commentsReceived", todoList[i]);
			}
		}
	});
	socket.on("updateComment", (data) => {
		const { user, todoID, comment } = data;
		for (let i = 0; i < todoList.length; i++) {
			if (todoID === todoList[i].id) {
				todoList[i].comments.push({ name: user, text: comment });
				socket.emit("commentsReceived", todoList[i]);
			}
		}
	});

	socket.on("deleteTodo", (id) => {
		todoList = todoList.filter((todo) => todo.id !== id);
		socket.emit("todos", todoList);
		// sendNotification("<TEMPLATE_ID>");
	});

	socket.on("disconnect", () => {
		socket.disconnect();
		console.log("🔥: A user disconnected");
	});
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api", (req, res) => {
	res.json(todoList);
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
