"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const discordx_1 = require("discordx");
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const { BOT_TOKEN, CHANNEL_ID } = process.env;
if (!BOT_TOKEN || !CHANNEL_ID)
    throw new Error("Missing ids from .env file");
const client = new discordx_1.Client({
    botId: "testing-bot",
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
    partials: ["CHANNEL"],
});
client.once("ready", () => {
    console.log(`Discord bot ready!`);
});
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname + '/index.html'));
});
app.post("/sent", (req, res) => {
    const { message } = req.body;
    const channel = client.channels.cache.find(ch => ch.id === CHANNEL_ID);
    if (channel === null || channel === void 0 ? void 0 : channel.isText())
        channel.send(message);
    res.send("Your message has been sent!");
});
client.login(BOT_TOKEN);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
