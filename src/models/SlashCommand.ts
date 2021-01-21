import { options } from './Client'
import { SlashCommandType } from '../types/SlashCommand'
import { CreateSlashCommand, DeleteSlashCommand, ListAllSlashCommands } from '../fetch/SlashCommand'

/**
 * Class representing a slash command.
 */
export default class SlashCommand {
    data: SlashCommandType | undefined
    /**
     * Create a slash command.
     * @param {SlashCommandType} data - Slash command data.
     */
    constructor(data: SlashCommandType) {
        if (!options.token) console.log('You must to login first. Client.connect(token: string)')
        if (!data) console.log('Please provide valid data from SlashCommand')
        else this.data = data
    }

    /**
     * Post slash command to Discord API.
     */
    create() {
        if (this.data) return CreateSlashCommand(this.data)
    }
}