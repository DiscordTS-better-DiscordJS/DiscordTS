import { options } from './Client'
import { SlashCommandType } from '../types/SlashCommand'
import { CreateSlashCommand, DeleteSlashCommand, ListAllSlashCommands } from '../fetch/SlashCommand'

export default class SlashCommands {

    constructor() {
        if (!options.token) console.log('You must to login first. Client.connect(token: string)')
    }

    create(data: SlashCommandType) {
        return CreateSlashCommand(data)
    }

    delete(id: string, guildID?: string) {
        return DeleteSlashCommand(id, guildID)
    }

    /**
     * @TODO Add reply function to slash command.
     * @param id 
     * @param message 
     */
    /*reply(id: string, message: string) {
        return ReplySlashCommand(id)
    }*/

    all() {
        return ListAllSlashCommands()
    }
}