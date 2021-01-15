import fetch from 'node-fetch'

export const fetchChannel = async (id: string, token: string) => {

    const channel: any = await fetch(`https://discord.com.api/v8/channels/${id}`, {



    }) 

}