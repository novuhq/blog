import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const puppeteer = require("puppeteer");
import { ChatGPTAPIBrowser } from "chatgpt";
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
	res.json({
		message: "Hello world",
	});
});

async function chatgptFunction(content) {
	// use puppeteer to bypass cloudflare (headful because of captchas)
	const api = new ChatGPTAPIBrowser({
		email: "asaoludavid234@yahoo.com",
		password: "davidasaolu",
	});
	await api.initSession();

	const getBrandName = await api.sendMessage(
		`I have a raw text of a website, can you extract the brand name from the text, without writing anything else? raw text: ${content}`
	);
	const getBrandDescription = await api.sendMessage(
		`I have a raw text of a website, can you extract the description of the website from the raw text: ${content}`
	);
	return {
		brandName: getBrandName.response,
		brandDescription: getBrandDescription.response,
	};
}

app.post("/api/url", (req, res) => {
	const { url } = req.body;

	(async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(url);

		const websiteContent = await page.evaluate(() => {
			return document.documentElement.innerText.trim();
		});
		const websiteOgImage = await page.evaluate(() => {
			const metas = document.getElementsByTagName("meta");

			for (let i = 0; i < metas.length; i++) {
				if (metas[i].getAttribute("property") === "og:image") {
					return metas[i].getAttribute("content");
				}
			}
		});

		let result = await chatgptFunction(websiteContent);
		result.brandImage = websiteOgImage;
		return res.json({
			message: "Request successful!",
			result,
		});

		await browser.close();
	})();
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
