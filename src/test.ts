const token: string = require('../token.json').token

import Message from './models/Message'
import { Client, SlashCommands, Collection } from './index'
import { ClientOptions } from './types/ClientOptions'

class bot extends Client {

    constructor(options?: ClientOptions){

        super(options)

        this.connect(token)

        this.on('message', async (message: Message) => {

            if (message.author?.bot) return

            if (message.content == '!test') {
                const x = new Collection()
                x.set('a', 'b')
                const y = x.find(key => key == 'a')
                message.reply(y)
            }

        })


        this.on('ready', async() => {
            const Slash = new SlashCommands()
            const all = await Slash.all()

            // Delete all cached commands.
            all.forEach((slash: any) => Slash.delete(slash.id))

            // Create new Slash command.
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