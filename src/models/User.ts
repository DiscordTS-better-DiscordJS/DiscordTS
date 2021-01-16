export default class User {

    username: string
    discriminator: string
    tag: string
    avatar: string
    avatarURL: string
    id: string
    bot: boolean | undefined

    constructor (data: any) {
        
        this.username = data.username
        this.discriminator = data.discriminator
        this.id = data.id
        this.tag = `${data.username}#${data.discriminator}`
        this.avatar = data.avatar
        this.avatarURL = data.avatar
        this.bot = data?.bot ? true : false


    }

}