import Message from '../models/Message'
import Client from '../models/Client'
import { fetchChannel } from '../utils/fetch'
import Channel from '../models/Channel'

export const _ = async (data: any, client: Client) => {

    if (client.options?.cache?.channels){
        if(!client.cache.channels.get(data.channel_id)){
            const fromFetch = await fetchChannel(data.channel_id)
            const channel = new Channel(data.channel_id, client, fromFetch)
            client.cache.channels.set(data.channel_id, channel)
        }
    }

    const message: Message = new Message(data, client)

    if (client.options?.cache?.messages){
        let message_to_cache = message
        message_to_cache.author = data.author.id
        message_to_cache.channel = data.channel_id
        client?.cache?.messages.set(data.id, message_to_cache)
    }


    return message

}