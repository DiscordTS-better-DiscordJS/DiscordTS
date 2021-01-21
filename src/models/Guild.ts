import Channel from './Channel'
import Role from './Role'
import { fetchClientLeave } from '../fetch/client'

export interface guildHashes {
    version: number,
    roles: any,
    metadata: any
    channels: any
}

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
    roles: Map<string, Role>
    channels: string[]
    ownerID: number
    banner: any
    afkChannelID: string | null
    aplicationID: string | null
    members: Map<string, any> // soon members model
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

    constructor(data: any) {

        this.description = data.description
        this.discoverySplash = data.discovery_splash
        this.afkChannelID = data.afk_channel_id
        this.unavailable = data.unavailable
        this.systemChannelFlag = data.system_channel_flags
        this.guildHashes = data.guild_hashes
        this.features = data.features
        this.members = data.members
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
        this.roles = new Map()
        data.roles.forEach((r: any) => {
            let newRole = new Role(r)
            if (!this.roles.get(r.id)) this.roles.set(r.id, newRole)
        })

    }

    /**
     * @return {void} nothing
     * @description If you want to leave from guild your client, use this.
     */
    async leave() {
        await fetchClientLeave(this.id)
    }

}