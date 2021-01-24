export interface ClientOptions {
    bot?: boolean
    cache?: {
        messages?: boolean
        channels?: boolean
        guilds?: boolean
        users?: boolean
    }
    appID?: string
}