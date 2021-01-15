import WebSocketManager from '../ws/WebSocketManager'

export default class CacheManager {

    ws: WebSocketManager
    cache: Map<number, any> // any but soon interface for messages, guild etc.

    constructor(ws: WebSocketManager){

        this.ws = ws
        this.cache = new Map()

        this.ws.socket?.on('GUILD_CREATE', async (data: any) => {
            if (!this.cache.has(data.id)) this.cache.set(data.id, data)
        })

    }

}