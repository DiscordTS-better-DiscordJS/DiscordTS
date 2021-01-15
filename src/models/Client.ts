import { EVENTS } from '../constants/events'
import { EventEmitter } from 'events'
import WebSocketManager from '../ws/WebSocketManager'
import CacheManager from '../cache/main'

export default class Client extends EventEmitter {

    ws!: WebSocketManager
    cache: CacheManager | undefined

    constructor() {

        super()

    }

    connect(token: string){

        try {
            this.ws = new WebSocketManager(false, token)
            this.cache = new CacheManager(this.ws)
            Object.values(EVENTS).forEach((event: any) => {
                this.ws.on(event, (...args) => this.emit(event, ...args))
            })
        } catch (e) {
            e && console.log(e)
        }

    }

}