/**
 * Class representing a User.
 */
export default class User {

    username: string
    discriminator: string
    tag: string
    avatar: string
    avatarURL: string
    id: string
    bot: boolean

    /**
     * Create a User.
     * @param {*} data - Data from Discord API.
     */
    constructor (data: any) {
        
        this.username = data.username
        this.discriminator = data.discriminator
        this.id = data.id
        this.tag = `${data.username}#${data.discriminator}`
        this.avatar = data.avatar
        this.avatarURL = data.avatar
        this.bot = data?.bot ? true : false

    }
    /**
     * @TODO
     * send()
     */
}