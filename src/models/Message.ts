import Client from '../models/Client'
import User from './User'
import Channel from './Channel'

export default class Message {

    // skonczyc jak bedzie cache: tj. guild, channel itd
    
    tts: boolean
    type: number
    // member: Member
    author: User
    channel: Channel
    id: number
    content: string
    // guild: Guild
    attachments: any[]
    createdTimestamp: Date
    editedTimestamp: Date | null
    pinned: boolean
    // mentions: Mentions[]
    mentionEveryone: boolean

    //for test
    guild_id: string

    constructor(data: any, client: Client) {

        this.type = data.type
        this.tts = data.tts
        this.author = new User(data.author)
        this.id = data.id
        this.content = data.content
        this.attachments = data.attachments
        this.createdTimestamp = data.createdTimestamp
        this.editedTimestamp = data.editedTimestamp
        this.pinned = data.pinned
        this.mentionEveryone = data.mentionEveryone
        const channel = new Channel(data.channel_id, client)
        if (!client.cache.channels.get(channel.id)) client.cache.channels.set(channel.id, channel)
        this.channel = channel
        //test
        this.guild_id = data.guild_id

    }

}