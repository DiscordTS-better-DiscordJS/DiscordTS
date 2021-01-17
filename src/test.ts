const token: string = require('../token.json').token

import Message from './models/Message'
import { Client, SlashCommand } from './index'
import { ClientOptions } from './types/ClientOptions'

class bot extends Client {

    constructor(options?: ClientOptions){

        super(options)

        this.connect(token)

        this.on('message', async (message: Message) => {

            if (message.author?.bot) return

            if (message.content == '!test') message.reply(':ok:')
            console.log(message.guild)
        })


        this.on('ready', async() => {
            const Slash = new SlashCommand()

            // Create slash command
            Slash.create({
                name: "test",
                description: "Test command"
            })

            console.log('Bot is ready!')
        })

        this.on('interactionCreate', e => {
            e.name == 'test' ? 
                e.channel.send('Detected interaction with slash command!') 
                : undefined
        })

    }

}

new bot({ appID: '728985551394570302' })