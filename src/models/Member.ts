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
     */
    constructor (data: any, client: Client) {

        const guild: Guild = client.cache.guilds.get(data.guild_id)

        /**
         * @TODO fetch nickname and createdAt from API.
         */
        this.nickname = ''
        this.joinedAt = data.member.joined_at || data.joined_at
        this.deaf = data.member.deaf || data.deaf
        this.mute = data.member.mute || data.mute
        this.premiumSince = data.member.premiumSince || data.premiumSince
        this.passed = data.member.pending || data.pending
        this.guildID = data.guild_id
        this.id = data.author.id || data.user.id
        this.user = client.cache.users.get(this.id) || new User(data.user)
        this.roles = new MemberRolesManager(this, guild, data.member.roles)
        if (guild.ownerID === data.author.id) this.permissions = new Permissions(Permissions.ALL)
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