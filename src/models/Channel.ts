import Client from '../models/Client'
import { sendMessage } from '../utils/fetch'

export const CHANNEL_TYPES: any = {
    '0': 'GUILD_TEXT',
    '1': "DM",
    '2': "GUILD_VOICE",
    '3': "GROUP_DM",
    '4': "GUILD_CATEGORY",
    '5': "GUILD_NEWS",
    '6': "GUILD_STORE"
}

export default class Channel {

    id: string
    type: string
    guild_id: string
    position: number
    // permission_overwrites: Array<overwritePermissions>
    name: string
    topic: string
    nsfw: boolean
    bitrare: number
    icon: string
    parent_id: string
    
    test: any

    constructor(channelID: any, client: Client, fromFetch?: any) {

        const cache = client.cache.channels.get(channelID)
        const data = cache ? cache : fromFetch

        this.id = data.id
        this.type = CHANNEL_TYPES[data.type]
        this.guild_id = data.guild_id
        this.position = data.position
        this.name = data.name
        this.topic = data.topic
        this.nsfw = data.nsfw
        this.bitrare = data.bitrare
        this.icon = data.icon
        this.parent_id = data.parent_id

    }

    /**
     * @TODO add embed support.
     * @param {string | any} content
     * @return {void} nothing.
     * @description Send message to channel.
     */
    send(content: string | any) {
        content = { content: content }
        sendMessage(content, this.id)
    }

}