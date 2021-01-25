import token from './tokens.ts';

import {
  Channel,
  Client,
  ClientOptions,
  Embed,
  Message,
  Permissions,
  Perms,
  Member,
  fMember,
  Role
} from '../src/index.ts';
import { moveSync } from "https://deno.land/std@0.84.0/fs/move.ts";

class bot extends Client {
  constructor(options?: ClientOptions) {
    super(options);

    this.connect(token);

    this.on('message', async (message: Message) => {
      const prefix: string = '!!';

      if (message.author?.bot) return;
      if (!message.content.startsWith(prefix)) return;

      const args = message.args({ prefix: prefix });

      switch (args[0]) {
        case 'test':

          message.guild.roles.forEach((r: Role) => {
            if (r.permissions.has('ADMINISTRATOR')){
              message.reply('yes')
            } else {
              message.channel.send('no')
            }
          })

          break;
      }
    });

    this.on('ready', async () => {
      /*const Slash = new SlashCommands()
            const all = await Slash.all()*/
      // const permissions = new Permissions([Perms.CONNECT]);
      // Delete all cached commands.
      // all.forEach((slash: any) => Slash.delete(slash.id))

      // Create new Slash command.
      // Slash.create({
      //     name: 'test',
      //     description: 'Test command'
      // })

      console.log('Bot is ready!');
    });

    this.on('interactionCreate', (e) => {
      e.name == 'test'
        ? e.channel.send('Detected interaction with slash command!')
        : undefined;
    });
  }
}

new bot({ appID: '', cache: { users: false } });
