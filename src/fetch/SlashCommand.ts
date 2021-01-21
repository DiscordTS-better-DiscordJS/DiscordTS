import fetch from '../utils/fetch'
import { options } from '../models/Client'
import { Constants } from '../constants/constants'

import nodeFetch from 'node-fetch'

const API = Constants.API

export const CreateSlashCommand = async (data: any) => {

    if (options.appID == '') return

    try {
        const res = await fetch({
            url: `/applications/${options.appID}/commands`,
            method: 'POST',
            ContentType: 'application/json',
            body: data
        })

        return res
    } catch {
        return undefined
    }

}

export const ListAllSlashCommands = async () => {

    if (options.appID == '') return

    try {
        const res = await fetch({
            url: `/applications/${options.appID}/commands`,
            method: 'GET',
            ContentType: 'application/json'
        })

        return res
    } catch {
        return undefined
    }

}

export const DeleteSlashCommand = async (id: string, guildID?: string) => {

    
    const token = options.bot ? `Bot ${options.token}` : options.token

    if (options.appID == '') return
    
                             // ↓↓↓↓                                                                        ↓↓↓↓
    const url = guildID ? `${API}/v8/applications/${options.appID}/guilds/${guildID}/commands/${id}` : `${API}/applications/${options.appID}/commands/${id}`

    const res = await nodeFetch(url, {

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