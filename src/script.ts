import { PrismaClient } from '@prisma/client'
import moment from 'moment';
import { Players } from '@prisma/client';
import { VanguardaException } from './exceptions';

const prisma = new PrismaClient()

async function createEvent() {
  // Cria evento
  const event = await prisma.events.create({
      data: {
        name: "FNF",
        description: "Jogo casual as sextas",          
        checkin_limit_date: moment('05/02/2024 19:00', 'MM/DD/YYYY hh:mm').format(),          
        start_date: moment('05/02/2024 20:00', 'MM/DD/YYYY hh:mm').format(), 
        end_date: moment('05/02/2024 22:00', 'MM/DD/YYYY hh:mm').format(),
        player_id: 1,
        player_reminder: false,
      },
    })

    // Encontra os players que precisam ser notificados
    const players = await prisma.players.findMany({
        include : {
          states:  {                 
            orderBy: {
              id: "desc"
            }       
          }
        }
      })    
    
    let playersToNotify : Players[] = []

    //Obtetendo os players que precisam ser notificados para este evento!
    for(var player of players) {
      if(player.states[0].state == "ATIVO") {          
        playersToNotify.push(player)
      }
    }

    // Inserindo pendencias para notificacao
    for(let pf of playersToNotify) {
     const eventNotificatin = await prisma.eventNotifications.create({
      data: {
        event_id : event.id,
        player_id: pf.id,
      },
    })
  }


  
    /*
    model EventNotifications {
  id    Int     @id @default(autoincrement())

  event Events @relation(fields: [event_id], references: [id])
  event_id Int

  player Players @relation(fields: [player_id], references: [id])
  player_id Int
  
  delivered Boolean @default(false)
  viewed Boolean @default(false)

  player_response String // ACCEPT, REJECT ou TENTATIVE
 */ 
//}


    //console.log(players)


}



function notificationViewed() {

}

async function sendPendingNotifications() {
  
  const pendingEventNotifications = await prisma.eventNotifications.findMany({
    include : {
      player : {
        include: {
          states :  {
            orderBy: {
              id: "desc"
            },                
          },          

        }
      },
      event: true,
    },

  })    

  for(const pf of pendingEventNotifications) {

    const player = pf.player;
    const fromEvent = pf.event;
    
    if(player == null || fromEvent == null) {
      throw new VanguardaException(`Um jogador e evento origem devem ser obrigatoriamente não nulos. player = ${player}, event=${fromEvent}`)
    }

    const lastPlayerState = player.states[0]

    // Somente eventos que nao foram descartados associados a players ativos
    if(pf.discarded == false && lastPlayerState.motive == "ATIVO") {
      
      const currentDate = new Date()


      if(currentDate >= fromEvent.checkin_limit_date) {
        console.log(`Notificação de evento pendente não precisa mais ser enviado. Limite máximo para o check-in atingido. current_date_time=${currentDate}, check-in-limit=${fromEvent.checkin_limit_date}`)
        
        // Descarta o evento para que nao seja mais levado em consideracao        
        await prisma.eventNotifications.update( {
          where : {
            id: pf.id
          },
          data: {
            discarded : true,
            discarded_reason : ""
          }
        })

        return;
      }


      // Envia mensagem para whatsapp
      const phone = player.phone
      
      // Marca como enviado  preenchendo o momento em que enviamos!
      pf.delivered_date = new Date()
      await prisma.eventNotifications.update( {
        where : {
          id: pf.id
        },
        data: {
          delivered_date : new Date()
        }
      })

    } else {
      if(lastPlayerState.motive != "ATIVO") {
        await prisma.eventNotifications.update( {
          where : {
            id: pf.id
          },
          data: {
            discarded : true,
            discarded_reason : `Evento foi descartado porque o player ${player.nick} passou para o estado ${lastPlayerState.state} devido a  ${lastPlayerState.motive}`
          }
        })                
      }      
    }
  }
}

/*
model EventNotifications {
  id    Int     @id @default(autoincrement())

  event Events @relation(fields: [event_id], references: [id])
  event_id Int

  player Players @relation(fields: [player_id], references: [id])
  player_id Int    
  delivered_date DateTime?
  viewed_date DateTime?
  
  player_response String? // ACCEPT, REJECT ou TENTATIVE

  creation_date DateTime @default(now())  
  
}*/

async function main() {

  createEvent()
  sendPendingNotifications()
  
    // const player = await prisma.players.create({
    //     data: {
    //       name: "Gabriel Nobrega de Lima",
    //       nick: "Napalm",
    //       type: "COMPETITIVE",
    //       email: "gabriel.nobrega.lima@gmail.com",
    //       steamId: "12211212121",
    //       social_credits: -1,
    //       description: "One man army",
    //       phone: 11995020995
    //     },
    //   })
      

      // const event = await prisma.events.create({
      //   data: {
      //     name: "FNF",
      //     description: "Jogo casual as sextas",
          
      //     checkin_limit_date: moment('05/02/2024 19:00', 'MM/DD/YYYY hh:mm').format(),
          
      //     start_date: moment('05/02/2024 20:00', 'MM/DD/YYYY hh:mm').format(), //new Date(2023, 5, 14),
      //     end_date: moment('05/02/2024 22:00', 'MM/DD/YYYY hh:mm').format(),
      //     player_id: 1,
      //     player_reminder: false,
          
       
      //   },
      // })

      // const event = await prisma.events.findFirst({
      //   where: {
      //     name: 'FNF',
      //   },
      //   include : {
      //     player : true,
      //   },
      // })

      // console.log(event)

      


      // const player = await prisma.playerStates.create({
      //     data: {
      //       player_id : 1,           
      //       state: "EXPULSO",
      //       motive: "Xingou o zequinha!",
      //     },


      // });
      
      // model PlayerStates {
      //   id    Int     @id @default(autoincrement())
      //   creation_date DateTime @default(now())
      //   // Quem solicitou a mudanca de estado: pode ser o sistema por deteccao de inatividade, o proprio ou um adm
      //   player Players  @relation(fields: [player_id], references: [id]) 
      //   player_id Int
      
      //   state String  // ATIVO, INATIVO, EXPULSO 
      //   motive String?
      }
/*
model Events {
  id    Int     @id @default(autoincrement())
  name String
  
  
  description String?

  start_date DateTime
  end_date DateTime
  checkin_limit_date DateTime

  player_event_creation Players @relation(fields: [player_id], references: [id])
  player_id Int     

  player_reminder Boolean @default(false) // Alerta jogador ja registrado sobre o game e necessidade de checking 
  creation_date DateTime @default(now())
}
  */
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })