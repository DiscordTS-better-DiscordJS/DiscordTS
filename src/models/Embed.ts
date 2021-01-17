import { EmbedOptions } from '../types/embed'

export default class Embed {

    private options: EmbedOptions = {}
    private embed: EmbedOptions = {}

    constructor(options: EmbedOptions) {

        this.options = options

        this.options.title ? this.embed.title = this.options.title : null
        this.options.title ? this.embed.type = this.options.type : null
        this.options.description ? this.embed.description = this.options.description : null
        this.options.url ? this.embed.url = this.options.url : null
        if (this.options.timestamp){
            if (typeof this.options.timestamp == 'boolean' && this.options.timestamp) this.embed.timestamp = new Date()
            else this.embed.timestamp = this.options.timestamp
        }
        this.options.color ? this.embed.color = this.options.color : null
        if (this.options.footer) {
            this.embed.footer = {}
            this.options.footer?.text ? this.embed.footer.text = this.options.footer?.text : null
        }

    }

}