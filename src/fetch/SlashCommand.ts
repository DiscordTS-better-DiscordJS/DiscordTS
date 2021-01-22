import fetch from '../utils/fetch.ts'
import { options } from '../models/Client.ts'
import { Constants } from '../constants/constants.ts'

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
    if (options.appID == '') return

                             // ↓↓↓↓                                                                        ↓↓↓↓
    const url = guildID ? `${API}/v8/applications/${options.appID}/guilds/${guildID}/commands/${id}` : `${API}/applications/${options.appID}/commands/${id}`

    const res = await fetch({
        url: url,
        method: 'DELETE',
        ContentType: 'application/json'
    })

    try {
        return await res.json()
    } catch {
        return undefined
    }
}