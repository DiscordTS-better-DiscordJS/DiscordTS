import Client from '../models/Client'
import { fetchChannel } from '../utils/fetchChannel'
import { sendMessage } from '../utils/fatchSendMessage'

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
    // permission_everwrites: Array<overwritePermissions>
    name: string
    topic: string
    nsfw: boolean
    bitrare: number
    icon: string
    parent_id: string

    constructor(channelID: any, client: Client) {

        const cache = client.cache.channels.get(channelID) || undefined

        const data = cache ? cache : fetchChannel(channelID, client)

        this.id = data.id
        this.type = cache ? data.type : CHANNEL_TYPES[data.type]
        this.guild_id = data.guild_id
        this.position = data.position
        this.name = data.name
        this.topic = data.topic
        this.nsfw = data.nsfw
        this.bitrare = data.bitrare
        this.icon = data.icon
        this.parent_id = data.parent_id


    }

    // soon support for embeds
    send(content: string) {

        sendMessage(content, this.id)

    }

}