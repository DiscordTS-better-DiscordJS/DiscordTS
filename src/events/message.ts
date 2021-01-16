import Message from '../models/Message'
import Client from '../models/Client'
import { fetchChannel } from '../utils/fetch'

export const _ = async (data: any, client: Client) => {

    const cache = client.cache.channels.get(data.channel_id)
    if (!cache) {
        const fetched = await fetchChannel(data.channel_id, client)
        if (fetched) client.cache.channels.set(fetched.id, fetched)
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