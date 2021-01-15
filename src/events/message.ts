import Message from '../models/Message'
import Client from '../models/Client'

export const _ = (data: any, client: Client) => {

    const message: Message = new Message(data, client)

    if (client.options?.cache?.messages){

        let message_to_cache = message
        message_to_cache.author = data.author.id
        message_to_cache.channel = data.channel_id

        client?.cache?.messages.set(data.id, message_to_cache)
    }

    return message

}