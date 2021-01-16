import { options } from './Client'
import { SlashCommandType } from '../types/SlashCommand'
import { CreateSlashCommand, DeleteSlashCommands } from '../utils/fetch'

export default class SlashCommand {

    constructor() {
        if (!options.token) console.log('You must to login first. Client.connect(token: string)')
    }

    create(data: SlashCommandType) {
        CreateSlashCommand(data)
    }

    delete(id: string) {
        DeleteSlashCommands(id)
    }
}