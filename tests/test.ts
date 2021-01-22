import token from '../tokens.ts'

import { 
    Client, ClientOptions, Embed, Message, Permissions, Perms
} from '../src/index.ts'


class bot extends Client {

    constructor (options: ClientOptions) {

        super(options)

        this.connect(token)

        this.on('message', async (message: Message) => {
            const prefix: string = '!!'
            console.log(message)

            //if (message.author?.bot) return
            //if (!message.guild.id) return
            // if (!message.content.startsWith(prefix)) return

            const args = message.args({ prefix: prefix })
            console.log(args)
            switch (args[0]){

                case 'test':
                    // console.log('here!')
                    // const oldMessageID: string = '802245287783038996'
                    // const oldMessage: Message = await message.channel.fetchMessage(oldMessageID)
                    // message.reply(new Embed({
                    //     description: `${oldMessage.content} - ${oldMessage.author.tag}`
                    // }))
                    message.channel.send('Hello!')
                    message.reply('hellov2')

                    break

            }

        })

        this.on('ready', async () => {
            /*const Slash = new SlashCommands()
            const all = await Slash.all()*/
            const permissions = new Permissions([Perms.CONNECT])
            // Delete all cached commands.
            // all.forEach((slash: any) => Slash.delete(slash.id))

            // Create new Slash command.
            // Slash.create({
            //     name: "test",
            //     description: "Test command"
            // })

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