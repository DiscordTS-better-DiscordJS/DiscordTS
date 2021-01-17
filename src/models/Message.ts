import Client from './Client'
import User from './User'
import Channel from './Channel'
import { sendMessage } from '../utils/fetch'
import Guild from './Guild'

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
        content = { content: content, message_reference: { message_id: this.id, channel_id: this.channel.id, guild_id: this.guild.id } }
        sendMessage(content, this.channel.id)
    }

}