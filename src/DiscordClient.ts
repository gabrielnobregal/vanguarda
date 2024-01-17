import Discord, {ApplicationCommandOption, ClientOptions,Collection} from "discord.js"

export interface Command {
    data: {
        name: string,
        description: string,
        type?: number,
        options?: ApplicationCommandOption[]
    },
    permissions?: string[],
    run(...args): any
}

export default class DiscordClient extends Discord.Client {
    commands : Collection<string, Command> = new Collection()

    constructor(options: ClientOptions) {
        super(options)
    }
}
