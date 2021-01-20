import Collection from '../models/Collection'

export interface Cache {
    channels: Collection<string, any>
    messages: Collection<string, any>
    guilds: Collection<string, any>
}