# DiscordTS
![Stars](https://img.shields.io/github/stars/DiscordTS-better-DiscordJS/DiscordTS)
![licence](https://img.shields.io/github/license/DiscordTS-better-DiscordJS/DiscordTS)
___
#### Deno library for interaction with Discord API.
Example:
```js
import {
  Client,
  ClientOptions,
  Message,
} from "../src/index.ts";

class Bot extends Client {
    constructor(token: string, options?: ClientOptions) {
      super(options);
      this.connect(token);

      this.on("message", async (message: Message) => {
          const args = message.args({ prefix: '!' })
          
          if (args[0] == 'ping') {
              message.channel.send('hello')
          }
      })

      this.on("ready", () => console.log("Bot is ready"))
    }
}

new Bot("token")
```
