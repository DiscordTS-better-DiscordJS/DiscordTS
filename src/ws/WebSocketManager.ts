import WebSocket from 'ws'
import { EventEmitter } from 'events'
import { existsSync } from 'fs'
import { OPCODES } from '../constants/opcodes'
import { Constants } from '../constants/constants'
import { EVENTS } from '../constants/events'
import { Heartbeat, Identify } from '../constants/payloads'
import { time } from 'console'

export default class WebSocketManager extends EventEmitter {

    debug: boolean

    token: string; reconnect: boolean; heart: any
    socket: WebSocket | undefined
    sessionID: number
    sequence: number

    constructor (reconnect: boolean, token: string) {

        super()

        this.debug = true

        this.token = token
        this.reconnect = reconnect
        this.sessionID = 0
        this.sequence = 0
        
        try {
            this.socket = new WebSocket(Constants.GATEWAY)
        } catch {}

        this.socket?.on('open', () => {
            this.debug && console.log('WebSocket send OPEN')
        })

        this.socket?.on('message', async (data: string) => {

            const packet = JSON.parse(data)
            const { op, s, t, d } = packet

            switch (op) {

                case OPCODES.HELLO:

                    this.debug && console.log(`WebSocket send HELLO`)
                    this.debug && console.log(packet)

                    this.heartbeat(d.heartbeat_interval, s, d)

                    this.socket?.on('close', () => {
                        clearInterval(this.heart)
                        new WebSocketManager(false, this.token)
                    })

                    this.socket?.on('error', (e: any) => {
                        this.debug && console.log(e)
                    })

                    this.identify(this.token)

                    break

            }

            this.emit('raw', packet)

            switch (t) {

                case "READY":
                    this.emit('ready')
                    this.debug && console.log(`Connected to gateway!`)
                    break

            }

        })

    }

    async module (name: string, d: any) {

        const exist = await existsSync(`${__dirname}/../events/${name}.js`)
        if (exist) require(`../events/${name}`)._(name, d, this)

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
                    "op": 6,
                    "d": {
                        "token": token,
                        "session_id": this.sessionID
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