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
    constructor(channelID: any, client: Client) {
        const cache = client.cache.channels.get(channelID)

        this.id = cache.id
        this.type = cache ? cache.type : CHANNEL_TYPES[cache.type]
        this.guild_id = cache.guild_id
        this.position = cache.position
        this.name = cache.name
        this.topic = cache.topic
        this.nsfw = cache.nsfw
        this.bitrare = cache.bitrare
        this.icon = cache.icon
        this.parent_id = cache.parent_id
    }

    // soon support for embeds
    send(content: string) {
        const object = { content: content }
        sendMessage(object, this.id)
    }

}