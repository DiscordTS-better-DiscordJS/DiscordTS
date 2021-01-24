import { BanOptions } from '../models/Member.ts'
import fetch from '../utils/fetch.ts'

export const fetchMember = async (guildID: string, ID: string) => {
    return await fetch({
        url: `/guilds/${guildID}/members/${ID}`,
        method: 'GET'
    })
}

export const kickMember = async (guildID: string, ID: string) => {
    return await fetch({
        url: `/guilds/${guildID}/members/${ID}`,
        method: 'DELETE'
    })
}

export const banMember = async (guildID: string, ID: string, options?: BanOptions) => {
    const opts = Object.assign(
        { delete_message_days: 0, reason: ''}, 
        { delete_message_days: options?.del, reason: options?.reason }
    )
    
    return await fetch({
        url: `/guilds/${guildID}/bans/${ID}`,
        method: 'PUT',
        ContentType: 'application/json',
        body: opts
    })
}