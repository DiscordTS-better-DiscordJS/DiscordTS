import fetch from 'node-fetch'
import { options } from '../models/Client'
import { Constants } from '../constants/constants'

const API = Constants.API

export const fetchChannel = async (id: string) => {

    const token = options.bot ? `Bot ${options.token}` : options.token
    const channel = await fetch(`${API}/channels/${id}`, {

        method: "GET",
        headers: {
            'Authorization': token
        }

    }) 

    return await channel.json()

}

