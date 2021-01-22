import Client from '../models/Client.ts'

import * as events from '../events/eventsExports.ts'

import { 
    WebSocket 
} from 'https://deno.land/std@0.84.0/ws/mod.ts'

import EventEmitter from "https://deno.land/std@0.84.0/node/events.ts"
import { Constants } from "../constants/constants.ts"
import { OPCODES } from "../constants/opcodes.ts"
import { Heartbeat, Identify } from "../constants/payloads.ts"
import { existsSync } from 'https://deno.land/std@0.84.0/fs/mod.ts'
import { EVENTS } from "../constants/events.ts"
import Guild from "../models/Guild.ts"

/**
 * WebSocket class.
 */
export default class WebSocketManager extends EventEmitter {
    debug: boolean
    token: string; reconnect: boolean; heart: any
    socket: WebSocket | any
    sessionID: number
    sequenct: number
    client: Client

    constructor (reconnect: boolean, token: string, client: Client) {
        super()

        this.debug = false
        this.token = token
        this.reconnect = reconnect
        this.sequenct = 0
        this.sessionID = 0
        this.client = client

        try {
            this.socket = new WebSocket(Constants.GATEWAY)
        } catch (error) { error && console.log(error) }

        this.socket?.on('open', () => {
            this.debug && console.log(`WebSocket send OPEN`)
        })

        this.socket?.on('message', async (data: string) => {
            const packet = JSON.parse(data)
            const { op, s, t, d } = packet

            s ? this.sequenct = s : null

            switch (op) {

                case OPCODES.INVALID_SESSION:
                    throw new Error("[OPCODE: 9]: Gateway INVALID session.");
                    
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
            // this.module(EVENTS[t], d)

            switch (t) {

                case 'READY':
                    this.debug && console.log('Connected to gateway')
                    this.emit('READY')
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

    /**
     * @TODO need fixes !
     */
    // async module (name: string, d: any) {
    //     if (events)
    // }

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
}