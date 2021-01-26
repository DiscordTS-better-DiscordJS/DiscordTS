import Role from './Role.ts'
import { fetchClientLeave } from '../fetch/Client.ts'
import Collection from './Collection.ts'
import Member from './Member.ts'
import Client from './Client.ts'

export interface guildHashes {
    version: number,
    roles: any,
    metadata: any
    channels: any
}

/**
 * Class representing a Guild.
 */
export default class Guild {

    description: string | null
    guildHashes: guildHashes
    maxMembers: number
    publicUpdatesChannelID: string | null
    voiceStates: any[]
    emojis: Map<string, any> // soon emoji model
    systemChannelFlag: number
    defaultMessageNotifications: number
    splash: any
    features: any[]
    rulesChannelID: string | null
    afkTimeout: number | undefined | null
    name: string
    premiumSubscriptions: number
    premiumTier: number
    mfaLevel: number
    discoverySplash: any
    unavailable: boolean
    explicitContentFilter: number
    roles: Collection<string, Role>
    channels: string[]
    ownerID: number
    banner: any
    afkChannelID: string | null
    aplicationID: string | null
    members: Collection<string, Member>
    large: boolean
    memberCount: number
    joinedAt: string
    lazy: boolean
    maxVideoChannelUsers: number
    icon: string | null
    threads: any[]
    preferredLocale: string
    region: string
    id: string
    vanityUrlCode: any
    presences: any[]
    systemChannelID: string
    verificationLevel: number
    me: Member | undefined

    /**
     * Create a Guild.
     * @param {*} data - Data from Discord API.
     */
    constructor(data: any, client: Client) {

        this.description = data.description
        this.discoverySplash = data.discovery_splash
        this.afkChannelID = data.afk_channel_id
        this.unavailable = data.unavailable
        this.systemChannelFlag = data.system_channel_flags
        this.guildHashes = data.guild_hashes
        this.features = data.features
        this.members = new Collection()
        data.members.forEach((m: any) => {
            let member: Member = new Member(m, client)
            if (client.user.id == member.user.id) this.me = member
            console.log(`${member.user.id}`)
            if (!this.members.get(member.user.id)) this.members.set(m.user.id, member)
        })
        this.voiceStates = data.voice_states
        this.emojis = data.emojis
        this.aplicationID = data.application_id
        this.mfaLevel = data.mfa_level
        this.presences = data.presences
        this.systemChannelID = data.system_channel_id
        this.rulesChannelID = data.rules_channel_id
        this.premiumSubscriptions = data.premium_subscription_count
        this.splash = data.splash
        this.large = data.large
        this.name = data.name
        this.region = data.region
        this.verificationLevel = data.verification_level
        this.banner = data.banner
        this.ownerID = data.owner_id
        this.maxMembers = data.max_members
        this.memberCount = data.member_count
        this.joinedAt = data.joined_at
        this.afkTimeout = data.afk_timeout
        this.lazy = data.lazdy
        this.publicUpdatesChannelID = data.public_updated_channel_id
        this.defaultMessageNotifications = data.default_message_notifications
        this.channels = data.channels
        this.maxVideoChannelUsers = data.max_video_channel_users
        this.explicitContentFilter = data.explicit_content_filter
        this.icon = data.icon
        this.premiumTier = data.premium_tier
        this.preferredLocale = data.preferred_locale
        this.id = data.id
        this.vanityUrlCode = data.vanity_url_code
        this.threads = data.threads
        this.roles = new Collection<string, Role>()
        data.roles.forEach((r: Role) => {
            let newRole = new Role(r)
            if (!this.roles.get(r.id)) this.roles.set(r.id, newRole)
        })

    }

    /**
     * Leave guild.
     * @async
     * @description Use this method to leave guild.
     * @example message.guild.leave()
     */
    async leave() {
        await fetchClientLeave(this.id)
    }

}