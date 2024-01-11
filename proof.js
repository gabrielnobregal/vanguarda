const makeWASocket = require("@whiskeysockets/baileys").default;

const {DisconnectReason, useMultiFileAuthState, Browsers} = require("@whiskeysockets/baileys")

let gState;
let gCreds;
let gSock;

async function makeSocketConnection() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
    
    gState = state;
    gCreds = saveCreds;

    return  makeWASocket({
        // can provide additional config here
        printQRInTerminal: true,
        auth: state,

        browser: Browsers.macOS('Desktop'),
        syncFullHistory: true
    });
}

function sendPendingMessages() {
    const id = '5511995020995@s.whatsapp.net' // the WhatsApp ID 
// send a simple text!
    const sentMsg  = gSock.sendMessage(id, { text: 'ojhkjvblo there' })
}

async function connectToWhatsApp() {
        
    const sock = await makeSocketConnection()
    gSock = sock;
    
    //sock.logout()
    
    sock.ev.on("connection.update", async(update) => {

        const {connection, lastDisconnect, isNewLogin, qr, receivedPendingNotifications} = update || {};
        console.log(`connection: ${connection} lastDisconnect: ${lastDisconnect} isNewLogin: ${isNewLogin} receivedPendingNotifications: ${receivedPendingNotifications}`)
        
        if(qr) {
            console.log(qr);
        }

        


        if(connection == "close") {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode != DisconnectReason.loggedOut;

            if(shouldReconnect) {
                console.log("Pedindo para reconectar!!!")
                await sleep(1000);
                connectToWhatsApp();
            }
        }

    });
    
    sock.ev.on("creds.update", gCreds);

    sock.ev.on("messages.update", (message) => {
        console.log("update: " + JSON.stringify(message, undefined, 2))
    })
    
    sock.ev.on("messages.upsert", (message) => {
        console.log("uppsert: " + JSON.stringify(message, undefined, 2))
        sendPendingMessages()
        console.log("Mensagem enviada de volta!")
    })

    sock.ev.on("chats.upsert", (chats) => {
        console.log("chats =" +  JSON.stringify(m, undefined, 2))
    })

    sock.ev.on("messaging-history.set", (history) => {
        console.log("chats =" +  JSON.stringify(history, undefined, 2))
    })   
   
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

connectToWhatsApp()