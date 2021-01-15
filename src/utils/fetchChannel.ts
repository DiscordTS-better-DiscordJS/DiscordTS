import fetch from 'node-fetch'
import Client from '../models/Client'

export const fetchChannel = async (id: string, client: Client) => {

    let token = client.options?.bot ? `Bot ${client.token}` : client.token

    const channel = await fetch(`https://discord.com/api/channels/${id}`, {

        method: "GET",
        headers: {
            'Authorization': token
        }

    }) 

    return await channel.json()

}