import { options } from '../models/Client.ts'
import { Constants } from '../constants/constants.ts'

export interface fetchUtil {
    url: string
    body?: {}
    ContentType?: string
    method: string
}

const API = Constants.API

const Fetch = async (data: fetchUtil) => {

    const token = options.bot ? `Bot ${options.token}` : options.token
    const HEADER: any = {
        'Authorization': token,
        'Content-Type': `${data.ContentType}`
    }

    data.ContentType ? null : delete HEADER['Content-Type']

    const res = await fetch(`${API}${data.url}`, {
        method: data.method,
        headers: HEADER,
        body: JSON.stringify(data.body)
    })

    return await res.json()

}

export default Fetch