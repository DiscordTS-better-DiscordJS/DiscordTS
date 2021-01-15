import fetch from "node-fetch";

const { token, bot } = require('../models/Client')

export const sendMessage = async (content: any, channel_id: string) => {

    !content.embed ? content.content = content : null
    let TOKEN = bot ? `Bot ${token}` : token

    content.tss = false

    const res = await fetch(`https://discord.com/api/channels/${channel_id}/messages`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorizatio': TOKEN
        },
        body: JSON.stringify(content)
    })

    return await res.json()

}