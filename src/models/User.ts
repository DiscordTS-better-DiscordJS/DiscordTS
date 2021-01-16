export default class User {

    username: string
    discriminator: string
    tag: string
    avatar: string
    avatarURL: string
    id: string
    //bot: boolean

    constructor (data: any) {
        
        this.username = data.username
        this.discriminator = data.discriminator
        this.id = data.id
        this.tag = `${data.username}#${data.discriminator}`
        this.avatar = data.avatar
        this.avatarURL = data.avatar

        /**
         * @TODO
         * Check if user is bot. (it's not returned from discord's api)
         * this.bot = data.bot ? true : false
         */
    }

}