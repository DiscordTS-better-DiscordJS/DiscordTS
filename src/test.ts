const token: string = require('../token.json').token

import Message from './models/Message'
import { Client, SlashCommands, Collection, Embed } from './index'
import { ClientOptions } from './types/ClientOptions'

class bot extends Client {

    constructor(options?: ClientOptions){

        super(options)

        this.connect(token)

        this.on('message', async (message: Message) => {

            if (message.author?.bot) return

            if (message.content == '!test') {

                const embed = new Embed({
                    title: message.author.tag,
                    description: 'Some description i think. And more stupis words!',
                    timestamp: true,
                    footer: {
                        text: `For ${message.author.id}`,
                        icon: 'https://cdn.discordapp.com/emojis/794668680905752616.gif?v=1'
                    },
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/emojis/794668680905752616.gif?v=1'
                    },
                    author: {
                        name: message.channel.name,
                        iconUrl: 'https://cdn.discordapp.com/emojis/794668680905752616.gif?v=1'
                    },
                    field: { name: 'test', inline: false, value: '1' },
                    fields: [
                        { name: 'test2', value: '2', inline: true },
                        { name: 'test3', value: '3', inline: true },
                        { name: 'test4', value: '4', inline: true },
                    ]
                })
                message.channel.send(embed)

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