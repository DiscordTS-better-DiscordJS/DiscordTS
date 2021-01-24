import { WebhookClientOptions } from '../types/WebhookClient.ts'
import Embed from './Embed.ts'

export default class WebhookClient {

    url: WebhookClientOptions['url']

    constructor (options: WebhookClientOptions) {
        this.url = options.url
    }

    /**
     * Send message via Webhook.
     * @param {string | Embed} content - Content of message.
     * @async
     */
    async send(content: string | Embed) {

    }

}