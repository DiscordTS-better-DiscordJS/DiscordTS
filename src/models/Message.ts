import User from './User'

export default class Message {

    tts: boolean
    // member: Member
    author: User
    // channel: Channel
    id: number
    content: string
    // guild: Guild
    attachments: any[]
    createdTimestamp: Date
    editedTimestamp: Date | null
    pinned: boolean
    // mentions: Mentions[]

    constructor(data: any) {

        this.tts = data.tts
        this.author = new User(data.author)
        this.id = data.id
        this.content = data.content
        this.attachments = data.attachments
        this.createdTimestamp = data.createdTimestamp
        this.editedTimestamp = data.editedTimestamp
        this.pinned = data.pinned

    }

}