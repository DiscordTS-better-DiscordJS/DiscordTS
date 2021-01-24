import Client from './Client.ts'
import User from './User.ts'
import Channel from './Channel.ts'
import { sendMessage } from '../fetch/Message.ts'
import Guild from './Guild.ts'
import Embed from './Embed.ts'
import Member from "./Member.ts"

export interface MessageArgsOptions {
    prefix?: string
    RegExp?: RegExp
}

/**
 * Class representing a Message.
 */
export default class Message {

    tts: boolean
    type: number
    author: User
    channel!: Channel
    id: string
    content: string
    guild: Guild
    attachments: any[]
    createdTimestamp: Date
    editedTimestamp: Date | null
    pinned: boolean
    member: Member
    // mentions: Mentions[]
    mentionEveryone: boolean

    /**
     * Create a Message.
     * @param {*} data - Data from Discord API.
     * @param {Client} client - Client.
     */
    constructor(data: any, client: Client) {

        this.type = data.type
        this.tts = data.tts
        this.author = new User(data.author)
        this.id = data.id
        this.content = data.content
        this.attachments = data.attachments
        this.createdTimestamp = data.timestamp
        this.editedTimestamp = data.editedTimestamp
        this.pinned = data.pinned
        this.mentionEveryone = data.mentionEveryone
        this.channel = client.cache.channels.get(data.channel_id)
        this.guild = client.cache.guilds.get(data.guild_id)
        this.member = new Member(data, client)
    
    }

    /**
     * Reply to message.
     * @param {string | Embed} content - Content of message.
     * @description Reply to member message.
     */
    reply(content: string | Embed) {
        let msg: any = {}

        if (typeof content == 'string') msg = { content: content }
        else msg = { embed: content }

        msg.message_reference = { message_id: this.id, channel_id: this.channel.id, guild_id: this.guild.id }
        sendMessage(msg, this.channel.id)
    }

    /**
     * Parse arguments from message.
     * @param {MessageArgsOptions} data - Data to split message content in to array of arguments.
     * @argument {string} prefix - If you use prefix it can return arg[0] slice prefix lenght.
     * @argument {RegExp} RegExp - RegExp to split message content, (not required, basic RegExp is: "/ +/gm" ).
     * @returns {string[]} Array with string elements from messag.content.
     */
    args(data?: MessageArgsOptions) {
        let args: string[] = []
        let content: string

        if (data?.prefix){
            content = this.content.slice(data.prefix.length)
        } else content = this.content

        data?.RegExp ? args = content.split(data.RegExp) : args = content.split(/ +/gm)
        return args
    }
    
}