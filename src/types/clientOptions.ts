export interface clientOptions {

    bot?: boolean
    cache?: {
        messages?: boolean,
        channels?: boolean,
        guilds?: boolean
    }

}

export interface Cache {

    channels: Map<string, any>,
    messages: Map<string, any>,
    guilds: Map<string, any>

}