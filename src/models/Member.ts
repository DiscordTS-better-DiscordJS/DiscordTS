import { banMember, fetchMember, kickMember } from '../fetch/member.ts'
import Client from './Client.ts'
import User from "./User.ts"
import Permissions from './Permissions.ts'
import Role from './Role.ts'

export interface BanOptions {
    reason?: string
    del?: number
}

/**
 * Class representing a Guild member.
 */
export default class Member {
    nickname: string
    roles!: Array<Role>
    joinedAt: string
    mute: boolean
    deaf: boolean
    guildID: string
    id: string
    premiumSince!: string 
    passed!: boolean
    fetched: any
    user: User
    permissions: Permissions

    /**
     * Create a Member.
     * @param {*} data - Data from Discord API.
     * @param {Client} client - Client.
     */
    constructor (data: any, client: Client) {

        const isOwner_guild = client.cache.guilds.get(data.guild.id).ownerID == data.author.id ? true : false

        let roles: Array<Role> = client.cache.guilds.get(data.guild.id).roles
        roles.filter((r: Role) => data.member.roles.includes(r.id))

        /**
         * @TODO fetch nickname and createdAt from API.
         */
        console.log(data)
        this.nickname = ''
        this.roles = data.member.roles
        this.joinedAt = data.member.joined_at
        this.deaf = data.member.deaf
        this.mute = data.member.mute
        this.premiumSince = data.member.premiumSince
        this.passed = data.member.pending
        this.guildID = data.guild_id
        this.id = data.author.id
        this.user = client.cache.users.get(this.id)
        this.permissions = new Permissions(isOwner_guild, undefined, this.roles)
    }

    /**
     * Kick member.
     * @returns {Member} Member
     */
    async kick() {
        kickMember(this.guildID, this.id)
        return this
    }

    /**
     * Ban member.
     * @param {object} [param] - Options.
     * @param {string} [param.reason] - Reason.
     * @param {number} [param.del] - delete messages from last X days by that user.
     * @returns {Member} Member
     */
    async ban(options?: BanOptions) {
        banMember(this.guildID, this.id, options)
        return this
    }

    /**
     * @TODO
     * setNickname()
     */
}