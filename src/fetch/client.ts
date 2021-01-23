import fetch from '../utils/fetch.ts'

export const fetchClientLeave = async (id: string) => {

    return await fetch({
        url: `/users/@me/guilds/${id}`,
        method: 'DELETE'
    })

}

export const changeClientAvatar = async (avatarURL: string) => {
    // avatarURL = makeURI(avatarURL)

    return await fetch({
        url: `/users/@me`,
        method: 'PATCH',
        body: JSON.stringify({
            avatar: avatarURL
        })
    })

}