import Message from '../models/Message.ts'
import Client from '../models/Client.ts'
import { fetchChannel } from '../fetch/Channel.ts'
import Channel from '../models/Channel.ts'
import User from '../models/User.ts'

export const _ = async (data: any, client: Client): Promise<Message> => {
    if (client.options?.cache?.channels) {
        const fromFetch = await fetchChannel(data.channel_id)
        const channel = new Channel(data.channel_id, client, fromFetch)
        if (channel) client.cache.channels.set(data.channel_id, channel)
    }
    
    if (client.options?.cache?.users) {
        const author = new User(data.author)
        client.cache.users.set(author.id, author)
    }

    const message: Message = new Message(data, client)

    if (client.options?.cache?.messages){
        let message_to_cache = message
        message_to_cache.author = message.author
        message_to_cache.channel = message.channel
        client?.cache?.messages.set(data.id, message_to_cache)
    }

    return message
}