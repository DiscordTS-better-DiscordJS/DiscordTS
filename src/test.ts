const token: string = require('../token.json').token

import Message from './models/Message'
import { Client, SlashCommand } from './index'

class bot extends Client {

    constructor(){

        super()

        this.connect(token)

        this.on('message', async (message: Message) => {

            //if (message.author.bot) return
            
            //console.log(this.cache, this.options)
            
            //message.channel.send(':ok:')
            
        })
        
        // To use SlashCommands you must login before.
        new SlashCommand({ 
            name: 'Hello', 
            description: 'hello!', 
            type: 1, // SUB_COMMAND
            options: [
                { 
                    name: '1',
                    description:'2', 
                    type: 3, // STRING
                    required: false,
                    options: [
                        {
                            name: '3',
                            description: '4',
                            type: 4, // INTEGER
                            required: true
                        }
                    ]
                }
            ]
        }, this)
    }
}

new bot()