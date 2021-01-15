import WebSocketManager from '../ws/WebSocketManager'

export default class CacheManager {

    ws: WebSocketManager

    constructor(ws: WebSocketManager){

        this.ws = ws

        this.ws.socket?.on('GUILD_CREATE', async (data: any) => {
            // guild model required bruh
        })

    }

}