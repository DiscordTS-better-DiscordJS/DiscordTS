/*import WebSocket from 'ws'
import { EventEmitter } from 'events'
import { existsSync } from 'fs'
import { OPCODES } from '../constants/opcodes'
import { Constants } from '../constants/constants'
import { EVENTS } from '../constants/events'
import { Heartbeat, Identify } from '../constants/payloads'
import Client from '../models/Client'
import Guild from '../models/Guild'

export default class WebSocketManager extends EventEmitter {
    debug: boolean
    token: string; reconnect: boolean; heart: any
    socket: WebSocket | undefined
    sessionID: number
    sequence: number
    client

    constructor (reconnect: boolean, token: string, client: Client) {
        super()

        this.debug = false
        this.token = token
        this.reconnect = reconnect
        this.sessionID = 0
        this.sequence = 0
        this.client = client
        
        try {
            this.socket = new WebSocket(Constants.GATEWAY)
        } catch(error) { console.error(error) }

        this.socket?.on('open', () => {
            this.debug && console.log('WebSocket send OPEN')
        })

        this.socket?.on('message', async (data: string) => {
            const packet = JSON.parse(data)
            const { op, s, t, d } = packet

            s ? this.sequence = s : null

            switch (op) {

                case OPCODES.INVALID_SESSION:
                    throw new Error("[OPCODE: 9]: Gateway INVALID session.")

                case OPCODES.HELLO:

                    this.debug && console.log(`WebSocket send HELLO`)
                    this.debug && console.log(packet)

                    this.heartbeat(d.heartbeat_interval, s, d)

                    this.socket?.on('close', () => {
                        clearInterval(this.heart)
                        new WebSocketManager(false, this.token, client)
                    })

                    this.socket?.on('error', (e: any) => {
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
                    break

                case 'GUILD_CREATE':
                    if (!client.cache.guilds.get(d.id) && client.options?.cache?.guilds) {
                        const new_d = new Guild(d)
                        client.cache.guilds.set(d.id, new_d)
                    }
                    break
            }
        })
    }

    async module (name: string, d: any) {
        const exist = await existsSync(`${__dirname}/../events/${name}.js`)
        if (exist) {
            const new_d = await require(`../events/${name}`)._(d, this.client)
            this.emit(name, new_d)
        }
    }

    heartbeat (interval: number, s: any, d: any) {
        this.heart = setInterval(() => {
            Heartbeat.s = s
            Heartbeat.d = d
            this.socket?.send(JSON.stringify(Heartbeat))
        }, interval)
    }

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
}*/

import { 
    WebSocket 
} from 'https://deno.land/std@0.84.0/ws/mod.ts'
import Client from '../models/Client.ts'

/**
 * WebSocket class.
 */
export default class WebSocketManager {
    token: string; reconnect: boolean; heart: any
    socket: WebSocket | undefined
    client: Client

    constructor (reconnect: boolean, token: string, client: Client) {
        this.token = token
        this.reconnect = reconnect
        this.client = client
    }
}