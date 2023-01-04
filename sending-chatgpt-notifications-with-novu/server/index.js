import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
import { ChatGPTAPIBrowser } from "chatgpt";
const { Novu } = require("@novu/node");

const novu = new Novu("<YOUR_API_KEY>");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

let chatgptResult = "";

async function chatgptFunction(message, subscriberId, firstName, res) {
	// use puppeteer to bypass cloudflare (headful because of captchas)
	const api = new ChatGPTAPIBrowser({
		email: "<YOUR_CHATGPT_EMAIL>",
		password: "<YOUR_CHATGPT_PASSWORD>",
	});
	await api.initSession();
	const result = await api.sendMessage(message);
	chatgptResult = result.response;
	const notificationString = chatgptResult.replace("{{user}}", firstName);

	sendNotification(notificationString, subscriberId, res);
}

async function sendNotification(data, subscriberId, res) {
	try {
		let result = await novu.trigger("<YOUR_TEMPLATE_ID>", {
			to: {
				subscriberId: subscriberId,
			},
			payload: {
				message: data,
			},
		});
		return res.json({ message: result });
	} catch (err) {
		return res.json({ error_message: err });
	}
}

app.post("/notify", (req, res) => {
	const { message, subscriber } = req.body;
	const subscriberDetails = subscriber.split(" ");
	const firstName = subscriberDetails[0];
	const subscriberId = subscriberDetails[3];

	const fullMessage = `"${message}" can you write me one?
please use double curly brackets for variables.
make it short, and use only one variable for the user name.
Please just write 1 notification without any intro.`;
	console.log({ firstName, subscriberId, fullMessage });

	chatgptFunction(fullMessage, subscriberId, firstName, res);
});

app.get("/subscribers", async (req, res) => {
	try {
		const { data } = await novu.subscribers.list(0);
		const resultData = data.data;
		const subscribers = resultData.filter(
			(d) => d.firstName && d.lastName && d.subscriberId
		);
		res.json(subscribers);
	} catch (err) {
		console.error(err);
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
