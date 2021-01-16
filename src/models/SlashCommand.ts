import Client from './Client'
import { SlashCommandType } from '../types/SlashCommand'
import { CreateSlashCommand } from '../utils/fetch'

export default class SlashCommand {
    constructor(data: SlashCommandType, client: Client) {
        if (!client.token) console.log('You must to login first. Client.connect(token: string)')
        else CreateSlashCommand(data, client)
    }
}