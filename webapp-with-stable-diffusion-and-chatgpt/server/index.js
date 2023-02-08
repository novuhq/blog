import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const puppeteer = require("puppeteer");
import axios from "axios";
import { ChatGPTAPIBrowser } from "chatgpt";
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const database = [];

async function chatgptFunction(content) {
	try {
		const api = new ChatGPTAPIBrowser({
			email: "<YOUR_CHATGPT_EMAIL>",
			password: "<YOUR_CHATGPT_PASSWORD>",
		});
		await api.initSession();

		const getDomainName = await api.sendMessage(
			`Can you generate a domain name for a website about: ${content}`
		);
		let domainName = getDomainName.response;

		const generatePrompt = await api.sendMessage(
			`I have a website for ${content}, and I want to generate a logo for it, can you generate a prompt for dall-e for me? make it long like 50 words, you don't need to tell me why you generated the prompt`
		);
		const diffusionPrompt = generatePrompt.response;

		const request = await axios.post("http://127.0.0.1:7860/sdapi/v1/txt2img", {
			prompt: diffusionPrompt,
		});

		let logoImage = await request.data.images;
		return { logoImage, domainName };
	} catch (err) {
		console.error(err);
	}
}

app.post("/api", async (req, res) => {
	const { prompt } = req.body;
	const result = await chatgptFunction(prompt);
	database.push(result);
	res.json({ message: "Retrieved successfully!", result: database });
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
