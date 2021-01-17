import { EmbedOptions } from '../types/embed'

export default class Embed {

    private options: EmbedOptions = {}
    EmbedData: EmbedOptions = {}

    constructor(options: EmbedOptions) {

        this.options = options

        this.options.title ? this.EmbedData.title = this.options.title : null
        this.options.title ? this.EmbedData.type = this.options.type : null
        this.options.description ? this.EmbedData.description = this.options.description : null
        this.options.url ? this.EmbedData.url = this.options.url : null
        if (this.options.timestamp){
            if (typeof this.options.timestamp == 'boolean' && this.options.timestamp) this.EmbedData.timestamp = new Date()
            else this.EmbedData.timestamp = this.options.timestamp
        }
        this.options.color ? this.EmbedData.color = this.options.color : null
        if (this.options.footer) {
            this.EmbedData.footer = {}
            this.options.footer?.text ? this.EmbedData.footer.text = this.options.footer?.text : null
            this.options.footer?.icon ? this.EmbedData.footer.icon = this.options.footer?.icon : null
        }

    }

}