import {VanguardaDiscordBot} from './Discord/VanguardaDiscord'
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname+'/.env' });

const bot = new VanguardaDiscordBot()
bot.connect(true)
bot.registerSlashCommandsOnServer()
bot.listenForRequests()



