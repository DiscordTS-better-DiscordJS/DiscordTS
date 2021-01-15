import Message from '../models/Message'

export const _ = (data: any) => {

    const message: Message = new Message(data)
    return message

}