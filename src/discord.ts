import { Client, Events,EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import * as dotenv from "dotenv";

// Carrega variaveis de ambiente
dotenv.config({ path: __dirname+'/.env' });


const client = new Client({
    intents: [
        'Guilds',
        'GuildMessages',
        'GuildMembers',
        'MessageContent',
        'DirectMessages',
        'GuildMessageTyping'
    ]
})



client.once(Events.ClientReady, (c) => {
    console.log("new")
    console.log(c)
});

let i = 0;

client.on(Events.InteractionCreate, async(interaction) => {

    if(!interaction.isButton()) {
        return;
    }
    if(i ==0)
    await interaction.reply("Comando executado...")

    interaction.editReply("Comando executado..." + (++i)) // So atualiza para o reply corrente se houver inducao de outro vira outra thread
    
    console.log("Customer Id:" + interaction.customId)
    

})

client.on('ready', (c)=> {
    console.log("old")
    console.log(c)

    const channel = client.channels.cache.get('1196045037398655078');
    
    //Cria um embeded
    const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Partida competitiva Vanguarda x Glow - 18 x 18')
	//.setURL('https://discorddadsadasd.js.org/')
	//.setAuthor({ name: 'Some fsdfsdfsdfsdfsd', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription(`PRIMEIRA TENTATIVA DE SCRIM 35X35 \nPrecisamos de pelo menos 25 VNGD
    O restante será completado pela BAIN
    
    DIA 10/12 DOMINGO AS 21:00
    Tentaremos jogar contra Ronin
    
    10 vagas são da Bain
    
    Se houver bastante engajamento nosso talvez na proxima vez conseguimos 35 só vngd`)
	//.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
        { name: 'Horários', value: 'Check-in: 10:00 às 19:00\nAlinhamento: 19:00 às 20:00\nPartida: 20:00 às 21:30', inline: false},
		{ name: ':white_check_mark:Inscrito(20)', value: 'Napalm\nKingdomMedu\nSkyline', inline: true},
	 //{ name: '\u200B', value: '\u200B' },
		{ name: ':triangular_flag_on_post:Negado(30)', value: 'Napalm\nKingdomMedu\nSkyline', inline: true },
		{ name: ':grey_question:Talvez(25)', value: 'Napalm\nKingdomMedu\nSkyline', inline: true },
	)	
    //.addFields({ name: 'Inlinasdasdasdade field title', value: 'Some value here', inline: true })

	.setImage('https://i.ibb.co/q5Hsgv0/Desktop-2-Vanguarda.jpg')
	.setTimestamp()
	.setFooter({ text: 'Evento criado por Napalm', iconURL: 'https://i.imgur.com/AfFp7pu.png' })

    
     channel.fetch().then((channel) => {
         channel.send({ embeds: [exampleEmbed] });
    })

    const row = new ActionRowBuilder()
    row.components.push(
        new ButtonBuilder().setCustomId('1').setLabel("Editar").setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId('2').setLabel("Deletar").setStyle(ButtonStyle.Danger),
    )
    
    channel.fetch().then((channel) => {
        
        channel.send( {//content: "",
                      components: [row]})
    })

    //Edita embed
    // client.channels.cache.get('1196045037398655078').fetch().then((channel) =>{

    //     channel.messages.fetch('1196770285404307569').then((msg) => {
    //         msg.embeds[0].data.title = "SOBREPOSTO"
    //         channel.messages.edit('1196770285404307569', {embeds: [msg.embeds[0]]}).then((x) => {
    //             console.log(x)
    //         })

    //     })

       
    //     console.log("teste")
    // })
      

   // message.channel.messages.fetch("902919303043637269")


    // channel.fetch().then((channel) => {
    //     const embeded = channel.messages.cache.get('1196770285404307569')
        
    //      console.log(channel)
    //     })

    console.log("teste")
    //channel.send('content');
})




 client.login(process.env.BOT_TOKEN)


