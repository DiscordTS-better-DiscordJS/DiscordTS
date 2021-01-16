import fetch from 'node-fetch'
import { Constants } from '../constants/constants'
import Client from '../models/Client'

const { token, bot } = require('../models/Client')

export const sendMessage = async (content: any, channel_id: string) => {

    let TOKEN = bot ? `Bot ${token}` : token

    content.tts = false

    const res = await fetch(`${Constants.API}/channels/${channel_id}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': TOKEN
        },
        body: JSON.stringify(content)
    })
    return await res.json()
}

export const fetchChannel = async (id: string) => {

    let TOKEN = bot ? `Bot ${token}` : token
    const channel = await fetch(`${Constants.API}/channels/${id}`, {

        method: "GET",
        headers: {
            'Authorization': TOKEN
        }

    }) 

    return await channel.json()
}