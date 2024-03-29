import User from '../models/User.ts'
import Channel from '../models/Channel.ts'
import Client from '../models/Client.ts'
import { fetchChannel } from '../fetch/Channel.ts'

export const _ = async (data: any, client: Client): Promise<any> => {
    const object = { name: '', guild: {}, user: {}, roles: [], interaction: {}, channel: {} }

    object.name = data.data.name
    object.channel = new Channel(data.channel_id, client, await fetchChannel(data.channel_id))
    object.user = new User(data.member.user)
    object.roles = data.member.roles // add roles model 
    object.guild = data.guild // add guild from cache
    object.interaction = data.data

    return object
}
