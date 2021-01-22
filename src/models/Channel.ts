import Client from '../models/Client.ts'
import { sendMessage, fetchMessage } from '../fetch/Message.ts'
import Message from '../models/Message.ts'
import Embed from './Embed.ts'

export const CHANNEL_TYPES: any = {
    '0': 'GUILD_TEXT',
    '1': "DM",
    '2': "GUILD_VOICE",
    '3': "GROUP_DM",
    '4': "GUILD_CATEGORY",
    '5': "GUILD_NEWS",
    '6': "GUILD_STORE"
}

/**
 * Class representing a Channel.
 */
export default class Channel {

    id: string
    type: string
    guildID: string
    position: number
    // permission_overwrites: Array<overwritePermissions>
    name: string
    topic: string
    nsfw: boolean
    bitrare: number
    icon: string
    parentID: string
    test: any
    #client: Client

    /**
     * Create a Channel
     * @param {string} channelID - Channel ID.
     * @param {Client} client - Client.
     * @param {any} [fromFetch]
     */
    constructor(channelID: string, client: Client, fromFetch?: any) {

        this.#client = client

        const cache = client.cache.channels.get(channelID)
        const data = cache ? cache : fromFetch

        this.id = data.id
        this.type = CHANNEL_TYPES[data.type]
        this.guildID = data.guild_id
        this.position = data.position
        this.name = data.name
        this.topic = data.topic
        this.nsfw = data.nsfw
        this.bitrare = data.bitrare
        this.icon = data.icon
        this.parentID = data.parent_id

    }

    /**
     * Send message to channel.
     * @param {string | Embed} content - Content of message.
     * @description Send message to channel.
     */
    send(content: string | Embed) {
        let msg = {}

        if (typeof content == 'string') msg = { content: content }
        else msg = { embed: content }

        sendMessage(msg, this.id)
    }

    /**
     * Fetch message from Discord API.
     * @param {string} id
     * @returns {Message} Message object
     * @description Fetch message from channel. 
     */
    async fetchMessage(id: string) {
        const message = await fetchMessage(this.id, id)
        return new Message(message, this.#client)
    }

}