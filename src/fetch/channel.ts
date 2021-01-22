import fetch from '../utils/fetch.ts'

export const fetchChannel = async (id: string) => {

    return await fetch({
        url: `/channels/${id}`,
        method: 'GET',
    })

}