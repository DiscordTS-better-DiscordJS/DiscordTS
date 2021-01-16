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

            if (message.content == '!test') message.channel.send('Test 123')
            message.channel.send(`${message.channel.id} ${this.cache.guilds.get(message.guild_id).channels}`)
        })


        this.on('ready', () => {
            /**
             * This code comes from official discord docs.
             * https://discord.com/developers/docs/interactions/slash-commands
             */
            new SlashCommand({
                "name": "permissions",
                "description": "Get or edit permissions for a user or a role",
                "options": [
                    {
                        "name": "user",
                        "description": "Get or edit permissions for a user",
                        "type": 2, // 2 is type SUB_COMMAND_GROUP
                        "options": [
                            {
                                "name": "get",
                                "description": "Get permissions for a user",
                                "type": 1 // 1 is type SUB_COMMAND
                            },
                            {
                                "name": "edit",
                                "description": "Edit permissions for a user",
                                "type": 1
                            }
                        ]
                    },
                    {
                        "name": "role",
                        "description": "Get or edit permissions for a role",
                        "type": 2,
                        "options": [
                            {
                                "name": "get",
                                "description": "Get permissions for a role",
                                "type": 1
                            },
                            {
                                "name": "edit",
                                "description": "Edit permissions for a role",
                                "type": 1
                            }
                        ]
                    }
                ]
            })
            console.log('Bot is ready!')
        })

    }

}

new bot({ appID: '728985551394570302' })