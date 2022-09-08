const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const puppeteer = require("puppeteer");
const PORT = 4000;
const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let channelList = [];
socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on("createChannel", (channelDetails) => {
		channelList.unshift(channelDetails);
		socket.join(channelDetails.channel);
		socketIO.emit("channels", channelList);
	});
	socket.on("joinChannel", (channel) => {
		socket.join(channel);
	});
	socket.on("screenshotPage", (data) => {
		const { url } = data;
		async function screenshot(data) {
			try {
				const browser = await puppeteer.launch();
				const page = await browser.newPage();
				const options = {
					path: "screenshot.png",
					fullPage: true,
					omitBackground: true,
				};
				await page.goto(data);
				const screenshotBuffer = await page.screenshot(options);
				socketIO.emit("imageBuffer", screenshotBuffer);
				console.log("Screenshot sent! 📸");
				await browser.close();
			} catch (err) {
				console.error("ERROR >>>", err);
			}
		}
		screenshot(url);
		
	});

	socket.on("mousePosition", (position) => {
		//Receives mouse position
		console.log(position);
		socketIO.emit("setMousePosition", position);
	});
	socket.on("disconnect", () => {
		socket.disconnect();
		console.log("🔥: A user disconnected");
	});
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
