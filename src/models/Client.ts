import { EVENTS } from '../constants/events'
import { EventEmitter } from 'events'
import WebSocketManager from '../ws/WebSocketManager'

export default class Client extends EventEmitter {

    ws!: WebSocketManager
    cache: Map<string, any>

    constructor() {

        super()
        this.cache = new Map()

    }

    async connect(token: string){

        try {
            this.ws = await new WebSocketManager(false, token, this)
            Object.values(EVENTS).forEach((event: any) => {
                this.ws.on(event, (...args) => this.emit(event, ...args))
            })
        } catch (e) {
            e && console.log(e)
        }
        
    }

}