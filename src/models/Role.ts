import Permissions from './Permissions.ts'

/**
 * Class representing a Role.
 */
export default class Role {

    position: number
    permissions: Permissions
    name: string
    mentionable: boolean
    managed: boolean
    id: string
    hoist: string
    color: number
    hexColor: string
    mention: string
    
    /**
     * Create a Role.
     * @param {*} data - Data from Discord API.
     */
    constructor(data: any){

        this.position = data.position
        this.permissions = new Permissions(data.permissions)
        this.name = data.name
        this.mention = `@${data.name}`
        this.mentionable = data.mentionable
        this.managed = data.managed
        this.id = data.id
        this.hoist = data.hoist
        this.color = data.color
        this.hexColor = this.toHex(this.color)

    }

    // futures - to repair
    private toHex(color: number){
        let hex: string = `#${color.toString()}`
        return hex
    }

}