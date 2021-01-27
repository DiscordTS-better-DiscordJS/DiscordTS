import { banMember, fetchMember, kickMember } from '../fetch/member.ts'
import Client from './Client.ts'
import User from "./User.ts"
import Permissions from './Permissions.ts'
import Role from './Role.ts'
import Guild from './Guild.ts'
import MemberRolesManager from '../utils/GuildMemberRolesUtil.ts'

export interface BanOptions {
    reason?: string
    del?: number
}

/**
 * Class representing a Guild member.
 */
export default class Member {
    nickname: string
    roles!: MemberRolesManager
    joinedAt: string
    mute: boolean
    deaf: boolean
    guildID: string
    id: string
    premiumSince!: string 
    passed!: boolean
    fetched: any
    user: User
    permissions?: Permissions

    /**
     * Create a Member.
     * @param {*} data - Data from Discord API.
     * @param {Client} client - Client.
     * @param {Array<Role>} - Array of member guild roles
     */
    constructor (data: any, client: Client, roles: Array<Role>, memberGuildOwnrID?: number | string) {

        data.member ? null : data.member = data

        /**
         * @TODO fetch nickname and createdAt from API.
         */
        this.nickname = ''
        this.joinedAt = data.member.joined_at
        this.deaf = data.member.deaf
        this.mute = data.member.mute 
        this.premiumSince = data.member.premiumSince
        this.passed = data.member.pending
        this.guildID = data.guild_id
        this.id = data.user.id || data.author.id
        this.user = client.cache.users.get(this.id) || new User(data.user)
        this.roles = new MemberRolesManager(this, roles, data.member.roles)
        if (memberGuildOwnrID === this.id) this.permissions = new Permissions(Permissions.ALL)
        else if (this.roles.toArrayAll().length >= 1) this.permissions = new Permissions(this.roles.toArrayAll().map((r: Role) => r.permissions.bitfield))
        else this.permissions = new Permissions(Permissions.DEFAULT)

    }

    /**
     * Kick member.
     * @async
     * @returns {Member} Member
     */
    async kick() {
        kickMember(this.guildID, this.id)
        return this
    }

    /**
     * Ban member.
     * @async
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