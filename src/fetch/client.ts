import fetch from '../utils/fetch'

export const fetchClientLeave = async (id: string) => {

    return await fetch({
        url: `/users/@me/guilds/${id}`,
        method: 'DELETE'
    })

}