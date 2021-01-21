import Client from './Client'
import User from './User'
import Channel from './Channel'
import { sendMessage } from '../fetch/Message'
import Guild from './Guild'

export interface MessageArgsOptions {
    prefix?: string
    RegExp?: RegExp
}

export default class Message {

    // skonczyc jak bedzie cache: tj. guild, channel itd
    
    tts: boolean
    type: number
    // member: Member
    author: User
    channel!: Channel
    id: string
    content: string
    guild: Guild
    attachments: any[]
    createdTimestamp: Date
    editedTimestamp: Date | null
    pinned: boolean
    // mentions: Mentions[]
    mentionEveryone: boolean

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

    }

    /**
    * @TODO add embed support.
    * @param {string | any} content
    * @return {void} nothing.
    * @description Reply to member message.
    */
    reply(content: string | any) {
        if (!content.data) content = { content: content }
        else content = { embed: content.data }
        content.message_reference = { message_id: this.id, channel_id: this.channel.id, guild_id: this.guild.id }
        sendMessage(content, this.channel.id)
    }

    /**
     * @param {MessageArgsOptions} data Data to split message content in to array of arguments 
     * @argument {string} prefix If you use prefix it can return arg[0] slice prefix lenght
     * @argument {RegExp} RegExp RegExp to split message content, (not required, basic RegExp is: "/ +/gm" )
     * @return {string[]} Array with string elements from messag.content
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