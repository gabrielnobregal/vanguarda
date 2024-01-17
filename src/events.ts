import { CommandInteraction } from "discord.js";
import DiscordClient from "./DiscordClient";

export default(discordClient:DiscordClient, interaction: CommandInteraction) => {
    if(!interaction.isCommand()) {
        return;
    }

    const command = client.commands.get(interaction.commandName)

    try {
        command.run(discordClient, interaction)
    } catch (error) {
        if(interaction.replied) {
            interaction.followUp(`Ocoreu um erro durante o processamento a interação ${interaction.commandName}: ${error}`)
        } else {
            interaction.reply(`Ocoreu um erro durante o processamento a interação ${interaction.commandName}: ${error}`)
        }
    }

}