import { EVENTS } from '../constants/events'
import { EventEmitter } from 'events'
import WebSocketManager from '../ws/WebSocketManager'

export default class Client extends EventEmitter {

    ws!: WebSocketManager

    constructor() {

        super()

    }

    connect(token: string){

        try {
            this.ws = new WebSocketManager(false, token)
            Object.values(EVENTS).forEach((event: any) => {
                this.ws.on(event, (...args) => this.emit(event, ...args))
            })
        } catch (e) {
            e && console.log(e)
        }

    }

}