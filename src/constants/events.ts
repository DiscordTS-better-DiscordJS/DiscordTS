export const EVENTS: any = {
    /**
     * Guild events
     */
	GUILD_CREATE: 'guildCreate',
	GUILD_UPDATE: 'guildUpdate',
	GUILD_DELETE: 'guildDelete',
	GUILD_ROLE_CREATE: 'roleCreate',
	GUILD_ROLE_UPDATE: 'roleUpdate',
	GUILD_ROLE_DELETE: 'roleDelete',
	GUILD_MEMBER_ADD: 'guildMemberAdd',
	GUILD_MEMBER_UPDATE: 'guildMemberUpdate',
	GUILD_MEMBER_REMOVE: 'guildMemberRemove',
	GUILD_BAN_ADD: 'guildBan',
	GUILD_BAN_REMOVE: 'guildUnban',
	GUILD_EMOJIS_UPDATE: 'emojiUpdate',
    GUILD_INTEGRATIONS_UPDATE: 'integrationsUpdate',
    /**
     * Webhook events
     */
    WEBHOOK_UPDATE: 'webhookUpdate',
    /**
     * Invite events
     */
	INVITE_CREATE: 'inviteCreate',
    INVITE_DELETE: 'inviteDelete',
    /**
     * Voice events
     */
    VOICE_STATE_UPDATE: 'voiceUpdate',
    /**
     * Presence events
     */
    PRESENCE_UPDATE: 'guildPresenceUpdate',
    /**
     * Messages events
     */
	MESSAGE_CREATE: 'message',
	MESSAGE_UPDATE: 'messageUpdate',
	MESSAGE_DELETE: 'messageDelete',
	MESSAGE_DELETE_BULK: 'messageBulkDelete',
	MESSAGE_REACTION_ADD: 'reactionAdd',
	MESSAGE_REACTOIN_REMOVE: 'reactionRemove',
	MESSAGE_REACTION_REMOVE_ALL: 'reactionRemoveAll',
	MESSAGE_REACTION_REMOVE_EMOJI: 'reactionRemoveEmoji',
    TYPING_START: 'typing',
    /**
     * Channels events
     */
	CHANNEL_CREATE: 'channelCreate',
	CHANNEL_UPDATE: 'channelUpdate',
	CHANNEL_DELETE: 'channelDelete',
    CHANNEL_PIN_UPDATE: 'channelPinUpdate',
    // ready event
	READY: 'ready',
}