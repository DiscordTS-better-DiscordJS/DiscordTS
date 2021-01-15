const token: string = require('../token.json').token

import Message from 'models/Message'
import { Client } from './index'

class bot extends Client {

    constructor(){

        super()

        this.connect(token)


        this.on('message', async (message: Message) => {

            console.log(this.cache, this.options)

        })

    }

}

new bot()