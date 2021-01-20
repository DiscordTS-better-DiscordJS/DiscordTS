import fetch from 'node-fetch'
import { options } from '../models/Client'
import { Constants } from '../constants/constants'

const API = Constants.API

export const sendMessage = async (content: any, channelID: string) => {

    const token = options.bot ? `Bot ${options.token}` : options.token

    content.tss = false

    const res = await fetch(`${API}/channels/${channelID}/messages`, {

        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json',
            'Authorization': token
        },
        body: JSON.stringify(content)

    })

    console.log(await res.json())
    return await res.json()

}

export const fetchMessage = async (channelID: string, messageID: string) => {

    const token = options.bot ? `Bot ${options.token}` : options.token

    const res = await fetch(`${API}/channels/${channelID}/messages/${messageID}`, {

        method: 'GET',
        headers: {
            'Authorization': token
        },

    })

    return await res.json()

}