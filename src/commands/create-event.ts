import { CommandInteraction } from "discord.js";
import DiscordClient,{Command} from "../DiscordClient";


export default {    
    run: (discordClient, interaction) => {
        console.log("teste")
    },
    data: {
        name: 'create-event',
        description: 'descricao',
        type: 1,
        options:[{
            name: "lov",
            description: "desc da opcao",
            type: "NUMBER",
            required: true,       
        }]
    },    

} as Command