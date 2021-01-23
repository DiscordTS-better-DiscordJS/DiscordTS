import { WebhookClientOptions } from '../types/WebhookClient.ts'

export default class WebhookClient {

    url: WebhookClientOptions['url']

    constructor (options: WebhookClientOptions) {
        this.url = options.url
    }

    /**
     * 
     */
    async send() {

    }

}