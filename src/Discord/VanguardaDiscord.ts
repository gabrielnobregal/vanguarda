import { ModalBuilder, Client, Events,EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,
ApplicationCommandOptionType, SlashCommandBuilder,TextInputBuilder,TextInputStyle,RestOrArray,
REST,
Routes} from "discord.js";
import DiscordClient from "../DiscordClient";

import createEvent from "../commands/create-event";
// Carrega variaveis de ambiente



const client = new DiscordClient({
    intents: [
        'Guilds',
        'GuildMessages',
        'GuildMembers',
        'MessageContent',
        'DirectMessages',
        'GuildMessageTyping'
    ]
})

export class VanguardaDiscordBot {

    discordClient : DiscordClient = new DiscordClient({
        intents: [
            'Guilds',
            'GuildMessages',
            'GuildMembers',
            'MessageContent',
            'DirectMessages',
            'GuildMessageTyping',        
        ]
    })

    async connect(refreshCommands: boolean) {        
        this.discordClient.login(process.env.BOT_TOKEN)
        

        //this.discordClient as any).commands = new Collection();

        // if(refreshCommands) {
        //     await this.refreshCommandsDeclaration()
        // }
    }

    async registerSlashCommandsOnServer() {

        //this.discordClient.commands.set(createEvent.data.name,createEvent)
     
        const commands = [
            {
              name: 'event',
              description: 'Cria eventos para a comunidade!',
            //   options: [
            //     {
            //       name: 'configuration',
            //       description: 'Payload para a criacao do evento.',
            //       type: ApplicationCommandOptionType.String,
            //       required: true,
            //     },
            //   ],
            },
            
          ];       

        const rest = new REST({version: '10'}).setToken(process.env.BOT_TOKEN)

        try {
            await rest.put(
                    Routes.applicationGuildCommands (
                    process.env.APP_ID,                    
                    process.env.TEST_GUILD_ID),
                    {body: commands})

            console.log("Comando registrado com sucesso!")                    
        } catch (error) {
            console.log("Erro no registro de comandos " + error)
        }

    }

    listenForRequests() {

        console.log("Escutando eventos!")
        this.discordClient.on('ready', (c)=> {
            console.log("ready")            
        })


        this.discordClient.on("interactionCreate", async (interaction) => {
            
            if (!interaction.isChatInputCommand()) return;
           
            if(interaction.commandName == 'event') {
                const modal = this.createEventRegistrationModalSecondPage()
                await interaction.showModal(modal);
            }        
           



            //const command = interaction.client.commands.get(interaction.commandName);
        
            // if (!command) {
            //     console.error(`No command matching ${interaction.commandName} was found.`);
            //     return;
            // }
        
            // try {
            //     await command.execute(interaction);
            // } catch (error) {
            //     console.error(error);
            //     if (interaction.replied || interaction.deferred) {
            //         await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            //     } else {
            //         await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            //     }
            // }
        });

        
    }

    
    createEventRegistrationModalFirstPage() : ModalBuilder  {
        const modal = new ModalBuilder()
            .setCustomId('eventModal')
            .setTitle('Criação de Eventos - Vanguarda');
        
        const name = new TextInputBuilder()
            .setCustomId('eventModalName')            
            .setLabel("Nome do Evento")
            .setPlaceholder("Nomde do time adversário e modalidade do jogo")
            .setRequired(true)            
            .setStyle(TextInputStyle.Short);

        const description = new TextInputBuilder()
            .setCustomId('eventModalDescription')
            .setLabel("Descrição")
            .setPlaceholder("Detalhe melhor evento indicando se ele é aberto para a comunidade, mapa e relevância do jogo.")
            .setRequired(true)            
            .setStyle(TextInputStyle.Paragraph);

        /*
        https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
        time zone de origem que o cara esta falando -> unix -> para o tipo que quisermos exibir https://www.youtube.com/watch?v=5rJBnFWbQGk
        */        
        const timezone = new TextInputBuilder()
        .setCustomId('eventModalTimezone')
        .setLabel("Fuso horário (TZ identifier)")        
        //.setPlaceholder("Detalhe melhor evento indicando se ele é aberto para a comunidade, mapa e relevância do jogo.")
        .setValue("Brazil/East")
        .setRequired(true)            
        .setStyle(TextInputStyle.Short);

        const startDateTime = new TextInputBuilder()
        .setCustomId('eventModalStartDateTime')
        .setLabel("Inicio do evento")
        //.setPlaceholder("Forma padrão de data no brasil DD/MM/YYYY HH:MM, por exemplo 16/10/2024 20:00")        
        .setRequired(true)            
        .setStyle(TextInputStyle.Short);

        const eventDurationInMinutes = new TextInputBuilder()
        .setCustomId('eventModalDurationInMinutes')     
        .setLabel("Duração do evento em minutos")   
        .setRequired(true)            
        .setStyle(TextInputStyle.Short);
        
        let actionBuilderList = new Array (
            new ActionRowBuilder<TextInputBuilder>().addComponents(name),
            new ActionRowBuilder<TextInputBuilder>().addComponents(description),            
            new ActionRowBuilder<TextInputBuilder>().addComponents(timezone),
            new ActionRowBuilder<TextInputBuilder>().addComponents(startDateTime),
            new ActionRowBuilder<TextInputBuilder>().addComponents(eventDurationInMinutes),
        )            

        
        // Add inputs to the modal
        modal.addComponents(actionBuilderList)

        return modal
    }


    createEventRegistrationModalSecondPage() : ModalBuilder  {
        const modal = new ModalBuilder()
            .setCustomId('eventModal1')
            .setTitle('Criação de Eventos - Vanguarda');
       
        const checkinStartDateTime = new TextInputBuilder()
        .setCustomId('eventModalCheckinStartDateTime')
        .setLabel("Inicio do check-in")     
        .setPlaceholder("")
        .setValue("")      
        .setRequired(false)            
        .setStyle(TextInputStyle.Short);

        const checkinEndDateTime = new TextInputBuilder()
        .setCustomId('eventModalCheckinEndDateTime')
        .setLabel("Término do check-in")        
        .setRequired(false)            
        .setStyle(TextInputStyle.Short);

        const briefingStartDateTime = new TextInputBuilder()
        .setCustomId('eventModalBriefingStartDateTime')
        .setLabel("Inicio do briefing") 
        .setPlaceholder("")
        .setValue("")      
        .setRequired(false)            
        .setStyle(TextInputStyle.Short);

        const briefingEndDateTime = new TextInputBuilder()
        .setCustomId('eventModalBriefingEndDateTime')
        .setLabel("Término do briefing")        
        .setRequired(false)            
        .setStyle(TextInputStyle.Short);
        
        let actionBuilderList = new Array (
            new ActionRowBuilder<TextInputBuilder>().addComponents(checkinStartDateTime),
            new ActionRowBuilder<TextInputBuilder>().addComponents(checkinEndDateTime),            
            new ActionRowBuilder<TextInputBuilder>().addComponents(briefingStartDateTime),
            new ActionRowBuilder<TextInputBuilder>().addComponents(briefingEndDateTime)
        )                    
        
        modal.addComponents(actionBuilderList)

        return modal
    }

}


