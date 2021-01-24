import { banMember, fetchMember, kickMember } from '../fetch/member.ts'
import Client from './Client.ts'
import User from "./User.ts"

export interface BanOptions {
    reason?: string
    del?: number
}

/**
 * Class representing a Guild member.
 */
export default class Member {
    nickname: string
    roles!: string[]
    joinedAt: string
    mute: boolean
    deaf: boolean
    guildID: string
    id: string
    premiumSince!: string 
    passed!: boolean
    fetched: any
    user: User

    /**
     * Create a Member.
     * @param {*} data - Data from Discord API.
     * @param {Client} client - Client.
     */
    constructor (data: any, client: Client) {
        /**
         * @TODO fetch nickname and createdAt from API.
         */
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
     * @param {object} [param]
     * @param {string} [param.reason]
     * @param {number} [param.del]
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