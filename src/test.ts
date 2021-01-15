const token: string = require('../token.json').token

import Message from 'models/Message'
import { Client } from './index'

class bot extends Client {

    constructor(){

        super()

        this.connect(token)


        this.on('message', async (message: Message) => {

            if (message.author.bot) return

            console.log(this.cache, this.options)

            message.channel.send(':ok:')

        })

    }

}

new bot()