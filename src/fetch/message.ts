import fetch from '../utils/fetch.ts'

export const sendMessage = async (content: any, channelID: string) => {

    content.tss = false

    return await fetch({
        url: `/channels/${channelID}/messages`,
        method: 'POST',
        ContentType: 'application/json',
        body: content
    })

}

export const fetchMessage = async (channelID: string, messageID: string) => {

    return await fetch({
        url: `/channels/${channelID}/messages/${messageID}`,
        method: 'GET',
    })

}