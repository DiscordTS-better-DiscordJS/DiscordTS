const token: string = require('../token.json').token

import Message from './models/Message'
import { Client, SlashCommands, Collection, Embed } from './index'
import { ClientOptions } from './types/ClientOptions'

class bot extends Client {

    constructor(options?: ClientOptions){

        super(options)

        this.connect(token)

        this.on('message', async (message: Message) => {

            const prefix: string = '!! '

            if (message.author?.bot) return
            if (!message.content.startsWith(prefix)) return

            const args = message.args({ prefix: prefix })
            
            if (args[0] == 'test') {

                const embed = new Embed({
                    description: 'Some description i think. And more stupis words!',
                    field: { name: 'Args', value: `${args}` }
                })

                args[1] == '1' ? embed.title('1') : null
                args[1] == '2' ? embed.title('2') : null

                await message.channel.send(embed)

            }

        })


        this.on('ready', async() => {
            const Slash = new SlashCommands()
            const all = await Slash.all()

            // Delete all cached commands.
            // all.forEach((slash: any) => Slash.delete(slash.id))

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