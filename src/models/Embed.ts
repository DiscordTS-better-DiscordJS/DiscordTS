import { EmbedOptions } from '../types/embed'

type footerArray = [text: string, icon: string]

export default class Embed {

    #options: EmbedOptions = {}
    data: EmbedOptions = {}

    constructor(embedConfig: EmbedOptions) {

        this.#options = embedConfig

        if (this.#options.field || this.#options.fields) {
            this.data.fields = []
        }
        this.#options.title ? this.data.title = this.#options.title : null
        this.#options.type ? this.data.type = this.#options.type : null
        this.#options.description ? this.data.description = this.#options.description : null
        this.#options.url ? this.data.url = this.#options.url : null
        if (this.#options.timestamp){
            if (typeof this.#options.timestamp == 'boolean' && this.#options.timestamp) this.data.timestamp = new Date()
            else this.data.timestamp = this.#options.timestamp
        }
        this.#options.color ? this.data.color = this.#options.color : null
        if (this.#options.footer) {
            this.data.footer = {}
            this.#options.footer?.text ? this.data.footer.text = this.#options.footer?.text : null
            this.#options.footer?.icon ? this.data.footer.icon = this.#options.footer?.icon : null
        }
        if (this.#options.image) {
            this.data.image = {}
            this.#options.image?.url ? this.data.image.url = this.#options.image.url : null
            this.#options.image?.proxyUrl ? this.data.image.proxyUrl = this.#options.image.proxyUrl : null
            this.#options.image?.height ? this.data.image.height = this.#options.image.height : null
            this.#options.image?.width ? this.data.image.width = this.#options.image.width : null
        }
        if (this.#options.thumbnail) {
            this.data.thumbnail = {}
            this.#options.thumbnail?.url ? this.data.thumbnail.url = this.#options.thumbnail.url : null
            this.#options.thumbnail?.proxyUrl ? this.data.thumbnail.proxyUrl = this.#options.thumbnail.proxyUrl : null
            this.#options.thumbnail?.height ? this.data.thumbnail.height = this.#options.thumbnail.height : null
            this.#options.thumbnail?.width ? this.data.thumbnail.width = this.#options.thumbnail.width : null
        }
        if (this.#options.video) {
            this.data.video = {}
            this.#options.video?.url ? this.data.video.url = this.#options.video.url : null
            this.#options.video?.height ? this.data.video.height = this.#options.video.height : null
            this.#options.video?.width ? this.data.video.width = this.#options.video.width : null 
        }
        if (this.#options.provider) {
            this.data.provider = {}
            this.#options.provider?.name ? this.data.provider.name = this.#options.provider.name : null
            this.#options.provider?.url ? this.data.provider.url = this.#options.provider.url : null
        }
        if (this.#options.author) {
            this.data.author = {}
            this.#options.author?.name ? this.data.author.name = this.#options.author.name : null
            this.#options.author?.url ? this.data.author.url = this.#options.author.url : null
            this.#options.author?.iconUrl ? this.data.author.iconUrl = this.#options.author.iconUrl : null
            this.#options.author?.proxyIconUrl ? this.data.author.proxyIconUrl = this.#options.author.proxyIconUrl : null
        }
        if (this.#options.field) {
            this.data.fields?.push(this.#options.field)
        }
        if (this.#options.fields) {
            this.#options.fields.forEach(field => {
                this.data.fields?.push(field)
            })
        }

    }

    title (title: string) {
        this.data.title = title
    }
    
    type (type: string) {
        this.data.type = type
    }

    description (description: string) {
        this.data.description = description
    }

    url (url: string) {
        this.data.url = url
    }

    timestamp (timestamp: Date | boolean) {
        if (typeof timestamp == 'boolean' && timestamp) this.data.timestamp = new Date()
        else this.data.timestamp = timestamp
    }

    color (color: string | number) {
        this.data.color = color
    }

    footer(footer: EmbedOptions['footer']) {
        this.data.footer ? null : this.data.footer = {}
        if (footer?.icon) this.data.footer.icon = footer.icon
        if (footer?.text) this.data.footer.text = footer.text
        if (footer?.proxyIcon) this.data.footer.proxyIcon = footer.proxyIcon
    }

}