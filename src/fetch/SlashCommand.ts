import fetch from 'node-fetch'
import { options } from '../models/Client'
import { Constants } from '../constants/constants'

const API = Constants.API

export const CreateSlashCommand = async (data: any) => {

    const token = options.bot ? `Bot ${options.token}` : options.token
    
    if (options.appID == '') return

    const res = await fetch(`${API}/applications/${options.appID}/commands`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)

    })

    try {
        return await res.json()
    } catch {
        return undefined
    }

}

export const ListAllSlashCommands = async () => {

    const token = options.bot ? `Bot ${options.token}` : options.token
    
    if (options.appID == '') return

    const res = await fetch(`${API}/applications/${options.appID}/commands`, {

        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },

    })

    try {
        return await res.json()
    } catch {
        return undefined
    }

}

export const DeleteSlashCommand = async (id: string, guildID?: string) => {

    const token = options.bot ? `Bot ${options.token}` : options.token

    if (options.appID == '') return
    
    const url = guildID ? `${API}/v8/applications/${options.appID}/guilds/${guildID}/commands/${id}` : `${API}/applications/${options.appID}/commands/${id}`

    const res = await fetch(url, {

        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },

    })

    try {
        return await res.json()
    } catch {
        return undefined
    }

}