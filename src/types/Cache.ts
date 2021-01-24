import Collection from '../models/Collection.ts'

export interface Cache {
    channels: Collection<string, any>
    messages: Collection<string, any>
    guilds: Collection<string, any>
    users: Collection<string, any>
}