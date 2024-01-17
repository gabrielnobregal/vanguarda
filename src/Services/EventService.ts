import { PrismaClient } from '@prisma/client'
import moment from 'moment';
import { Players } from '@prisma/client';
import { VanguardaException } from '../exceptions';

const prisma = new PrismaClient()

module EventService {

    export async function createEvent(eventDescriptionJson) {

        if(!eventDescriptionJson.name) {
            throw new VanguardaException("Nome do evento é obrigatório!")            
        }

        if(!eventDescriptionJson.description) {
            throw new VanguardaException("Um evento deve ter obrigatoriamente uma descrição.")            
        }

        if(!eventDescriptionJson.time_zone) {
            throw new VanguardaException("Um timezone deve ser definido.")            
        }    

        

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
    
    

    }

}