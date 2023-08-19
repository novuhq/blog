const { Novu, ChatProviderIdEnum } = require("@novu/node");
const novu = new Novu("NOVU_API_KEY");
const subscriberId = "NOVU_SUBSCRIBER_ID";
const { XMLParser } = require("fast-xml-parser");
const cron = require("node-cron");
const parser = new XMLParser();
const urlPattern = /https:\/\/i\.redd\.it[^"]*/g;

//👇🏻 retrieves memes from Reddit
const getMemes = async () => {
	const matchedUrls = [];
	try {
		const fetchMeme = await fetch(
			"https://www.reddit.com/r/ProgrammerHumor/.rss"
		);
		const XMLdata = await fetchMeme.text();
		const jsonObj = parser.parse(XMLdata);
		const content = jsonObj.feed.entry;
		const contentArray = content.map((obj) => obj.content);
		contentArray.forEach((htmlString) => {
			const matches = htmlString.match(urlPattern);
			if (matches) {
				// Add the matches to the array
				matchedUrls.push(...matches);
			}
		});
		return matchedUrls;
	} catch (err) {
		console.error(err);
	}
};

//👇🏻 sends the Discord message via Novu
const sendChatMessage = async () => {
	await novu.subscribers.setCredentials(
		subscriberId,
		ChatProviderIdEnum.Discord,
		{
			webhookUrl: "DISCORD_CHANNEL_WEBHOOK",
		}
	);
	const memes = await getMemes();
	memes.forEach(async (meme) => {
		await novu
			.trigger("discord", {
				to: {
					subscriberId,
				},
				payload: { content: meme },
			})
			.then((res) => console.log(res.data.data));
	});
};

//👇🏻 schedules the task hourly
const hourlyTask = cron.schedule("0 * * * *", sendChatMessage);

console.log("Scheduled task to run every hour.");
