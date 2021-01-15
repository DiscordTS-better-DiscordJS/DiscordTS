const token: string = require('../token.json').token

import Message from 'models/Message'
import { Client } from './index'

class bot extends Client {

    constructor(){

        super()

        this.connect(token)


        this.on('message', async (message: Message) => {

            console.log(message.content)
            console.log(this.cache.get(message.guild_id).channels)

        })

    }

}

new bot()