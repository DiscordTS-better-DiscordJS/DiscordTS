import Client from '../models/Client.ts'
import EventEmitter from 'https://deno.land/std@0.84.0/node/events.ts'
import Guild from '../models/Guild.ts'
import * as events from '../events/eventsExports.ts'
// import { ensureFileSync } from 'https://deno.land/std@0.84.0/fs/mod.ts'
// import { WebSocket } from 'https://deno.land/x/websocket@v0.0.6/mod.ts'
import { Constants } from '../constants/constants.ts'
import { OPCODES } from '../constants/opcodes.ts'
import { Heartbeat, Identify } from '../constants/payloads.ts'
import { EVENTS } from '../constants/events.ts'
import User from '../models/User.ts'

/**
 * WebSocket class.
 */
export default class WebSocketManager extends EventEmitter {
    debug: boolean
    token: string; reconnect: boolean; heart: any
    socket: WebSocket
    sessionID: number
    sequence: number
    client: Client

    /**
     * Create WebSocket Manager.
     * @param {boolean} reconnect - Reconnect to gateway?
     * @param {string} token - Bot token.
     * @param {Client} client - Client.
     */
    constructor (reconnect: boolean, token: string, client: Client) {
        super()

        this.debug = false
        this.token = token
        this.reconnect = reconnect
        this.sequence = 0
        this.sessionID = 0
        this.client = client
        this.socket = new WebSocket(Constants.GATEWAY)

        this.socket?.addEventListener('open', () => {
            this.debug && console.log('WebSocket send OPEN')
        })

        this.socket?.addEventListener('message', async (data: any) => {
            const packet = JSON.parse(data.data)
            const { op, s, t, d } = packet

            s ? this.sequence = s : 0
            switch (op) {

                case OPCODES.INVALID_SESSION:
                    throw new Error('[OPCODE: 9]: Gateway INVALID session.')

                case OPCODES.HELLO:

                    this.debug && console.log(`WebSocket send HELLO`)
                    this.debug && console.log(packet)

                    this.heartbeat(d.heartbeat_interval, s, d)

                    this.socket?.addEventListener('close', () => {
                        clearInterval(this.heart)
                        new WebSocketManager(false, this.token, client)
                    })

                    this.socket?.addEventListener('error', (e: any) => {
                        this.debug && console.log(e)
                    })

                    this.identify(this.token)

                    break

            }

            this.debug && console.log(packet)
            this.emit('raw', packet)
            this.module(EVENTS[t], d)

            switch (t) {

                case 'READY':
                    this.debug && console.log(`Connected to gateway!`)
                    this.emit('ready')
                    client.user = new User(d.user)
                    break

                case 'GUILD_CREATE':
                    if (client.options?.cache?.guilds) {
                        const new_d = new Guild(d, client)
                        client.cache.guilds.set(d.id, new_d)
                    }
                    break
            }

        })
    }

    /**
     * Load event.
     * @async
     * @param {string} name - Event name.
     * @param {*} d - D from Discord gateway.
     */
    async module (name: string, d: any) {
        if (events && (events as any)[name]) {
            const res = await (events as any)[name](d, this.client)
            this.emit(name, res)
        }
    }
    /**
     * Creates heatbeat.
     * @param {number} interval - Heart interval from Discord gateway. 
     * @param {*} s - S from Discord gateway. 
     * @param {*} d - D from Discord gateway. 
     */
    heartbeat (interval: number, s: any, d: any) {
        this.heart = setInterval(() => {
            Heartbeat.s = s
            Heartbeat.d = d
            this.socket?.send(JSON.stringify(Heartbeat))
        }, interval)
    }

    /**
     * Identify to Discord gateway.
     * @param {string} token - Bot's token.
     */
    identify (token: string) {
        switch (this.reconnect) {
            case true:

                this.socket?.send(JSON.stringify({
                    op: 6,
                    d: {
                        token: token,
                        session_id: this.sessionID
                    }
                }))

                break

            case false:

                Identify.d.token = token
                this.socket?.send(JSON.stringify(Identify))

                break
        }
    }
}