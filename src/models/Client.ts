import { EVENTS } from '../constants/events'
import { EventEmitter } from 'events'
import WebSocketManager from '../ws/WebSocketManager'
import { clientOptions, Cache } from '../types/clientOptions'

export default class Client extends EventEmitter {

    ws!: WebSocketManager
    cache: Cache
    token!: string
    options?: clientOptions

    constructor(options?: clientOptions) {

        super()
        this.cache = {
            channels: new Map(),
            messages: new Map(),
            guilds: new Map()
        }
        this.options = Object.assign({
            cache: {
                channels: true, messages: true, guilds: true
            },
            bot: true
        },options)

    }

    async connect(token: string){

        this.token = token
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