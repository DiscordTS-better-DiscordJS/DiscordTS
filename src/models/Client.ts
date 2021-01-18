import WebSocketManager from '../ws/WebSocketManager'
import { EVENTS } from '../constants/events'
import { EventEmitter } from 'events'
import { ClientOptions } from '../types/ClientOptions'
import { Cache } from '../types/Cache'
import Collection from './Collection'
// import { StatusOptions } from '../types/StatusOptions'

class Options {
    token: string
    bot?: boolean
    appID?: string

    constructor() {
        this.token = ''
        this.appID = ''
        this.bot = true
    }
}

const options = new Options()

export default class Client extends EventEmitter {

    ws!: WebSocketManager
    cache: Cache
    token!: string
    options?: ClientOptions

    constructor(options?: ClientOptions) {

        super()
        this.cache = {
            channels: new Collection(),
            messages: new Collection(),
            guilds: new Collection()
        }
        this.options = Object.assign({
            cache: {
                channels: true, messages: true, guilds: true
            },
            bot: true,
            appID: ''
        }, options)

    }

    async connect(token: string){

        this.token = token
        options.token = this.token
        options.bot = this.options?.bot
        options.appID = this.options?.appID

        try {
            this.ws = await new WebSocketManager(false, token, this)
            Object.values(EVENTS).forEach((event: any) => {
                this.ws.on(event, (...args) => this.emit(event, ...args))
            })
        } catch (e) {
            e && console.log(e)
        }

    }
    /**
     * @TODO add client methods.
     */
    /* 
    setStatus(options: StatusOptions) {
    } 
    setUsername(username: string) {
    }
    setAvatar(avatarURL: string) {
    }
    */

}

export {
    options
}