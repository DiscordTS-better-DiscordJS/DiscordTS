import WebSocketManager from '../ws/WebSocketManager.ts'
import EventEmitter from 'https://deno.land/std@0.84.0/node/events.ts'
import Collection from './Collection.ts'
import { EVENTS } from '../constants/events.ts'
import { ClientOptions } from '../types/ClientOptions.ts'
import { Cache } from '../types/Cache.ts'
import { changeClientAvatar } from '../fetch/Client.ts'
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

/**
 * Class representing a Client.
 * @extends EventEmitter
 */
export default class Client extends EventEmitter {

    ws!: WebSocketManager
    cache: Cache
    token!: string
    options: any

    /**
     * Create a Client.
     * @param {ClientOptions} [options] - Client options.
     */
    constructor(options?: ClientOptions) {

        super()
        this.cache = {
            users: new Collection(),
            channels: new Collection(),
            messages: new Collection(),
            guilds: new Collection()
        }
        this.options = { bot: '', appID: '', cache: {} }
        this.options.appID = options?.appID || ''
        this.options.bot = options?.bot == false ? false : true
        this.options.cache.channels = options?.cache?.channels == false ? false : true
        this.options.cache.messages = options?.cache?.messages == false ? false : true
        this.options.cache.guilds = options?.cache?.guilds == false ? false : true
        this.options.cache.users = options?.cache?.users == false ? false : true

        console.log(this.options)

    }

    /**
     * Connect with Discord WebSocket.
     * @param {string} token - Bot token.
     */
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
     * Change client user avatar
     * @param {string} avatarURL
     * @returns null
     * @description Change client user avatar 
     */
    setAvatar(avatarURL: string) {
        changeClientAvatar(avatarURL)
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