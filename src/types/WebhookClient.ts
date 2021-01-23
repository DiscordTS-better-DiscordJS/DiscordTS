import Embed from '../models/Embed.ts'

export interface WebhookClientOptions {
    url?: string
}

export interface WebhookClientSend {
    content?: string
    embed?: Embed 
}