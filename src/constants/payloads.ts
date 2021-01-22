import { OPCODES } from './opcodes.ts'

export const Heartbeat = {
	op: OPCODES.HEARTBEAT,
	d: null,
	s: 0,
	t: 'GATEWAY_EVENT_NAME',
}

export const Identify = {
	op: OPCODES.IDENTIFY,
	d: {
		token: '',
		intents: 513,
		properties: {
			$os: 'linux',
			$browser: 'discord.ts',
			$device: 'discord.ts',
		},
	},
}