import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {Client} from "discordx"
import {Intents, TextChannel} from "discord.js"
import path from "path"
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

const { BOT_TOKEN, CHANNEL_ID} = process.env

if(!BOT_TOKEN || !CHANNEL_ID) throw new Error("Missing ids from .env file")

const client = new Client({
  botId: "testing-bot",
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ["CHANNEL"],
})

client.once("ready", () => {
  console.log(`Discord bot ready!`)
})

app.use(express.urlencoded({extended: true}))

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.post("/sent", (req, res) => {
  const {message} = req.body
  
  const channel = client.channels.cache.find(channel => channel.id === CHANNEL_ID);
  if(channel?.isText()) (<TextChannel> channel).send(message)

  res.send("Your message has been sent!")
})

client.login(BOT_TOKEN)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});