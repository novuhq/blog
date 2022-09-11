const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const puppeteer = require("puppeteer");
const PuppeteerMassScreenshots = require("./screen.shooter");
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

	socket.on('browse', async ({url}) => {
		const browser = await puppeteer.launch({
			headless: true
		});
		const context = await browser.createIncognitoBrowserContext();
		const page = await context.newPage();
		await page.setViewport({
			width: 1255,
			height: 800,
		});
		await page.goto(url);
		const screenshots = new PuppeteerMassScreenshots();
		await screenshots.init(page, socket);
		await screenshots.start();
		socket.on('mouseMove', async ({x, y}) => {
			try {
				await page.mouse.move(x, y);
				const cur = await page.evaluate((p) => {
					const elementFromPoint = document.elementFromPoint(p.x, p.y);
					return window
						.getComputedStyle(elementFromPoint, null)
						.getPropertyValue('cursor');
				}, {x, y});

				socket.emit('cursor', cur);
			} catch (err) {}
		});

		socket.on('mouseClick', async ({x, y}) => {
			try {
				await page.mouse.click(x, y);
			} catch (err) {}
		});

		socket.on('scroll', ({position}) => {
			page.evaluate((top) => {
				window.scrollTo({ top });
			}, position);
		});
	});

	socket.on("disconnect", () => {
		socket.disconnect();
		console.log("🔥: A user disconnected");
	});
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
