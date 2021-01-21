import FETCH, { RequestInit } from 'node-fetch'
import { options } from '../models/Client'
import { Constants } from '../constants/constants'
const API = Constants.API

export interface fetchUtil {
    url: string
    body?: {}
    ContentType?: string
    method: string
}

const fetch = async (data: fetchUtil) => {

    const token = options.bot ? `Bot ${options.token}` : options.token

    const HEADER: RequestInit['headers'] = {
        'Authorization': token,
        'Content-Type': `${data.ContentType}`
    }

    data.ContentType ? null : delete HEADER['Content-Type']

    const res = await FETCH(`${API}${data.url}`, {
        method: data.method,
        headers: HEADER,
        body: JSON.stringify(data.body)
    })

    return await res.json()

}

export default fetch