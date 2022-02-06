import quartzsided, { Handler } from '../handler/main.js';
import { Message } from 'discord.js';
import config from '../handler/config.js';
import { isAlphaNum } from '../handler/misc.js';

quartzsided.newEvent(
    'messageCreate',
    (handler: Handler, message: Message, { client } = handler) => {
        if (!(message.content.startsWith(config.prefix) || message.content.startsWith('‼')) || message.author.bot) return

        const prefix = message.content.startsWith('‼') ? '‼' : config.prefix;    
        const args = message.content.split(/ +/);
        let name = args.shift()!.slice(prefix.length).trim().toLowerCase(); if (!isAlphaNum(name[0])) name = name.slice(1)

        const command = client.aliases.get(name) ? client.textCommands.get(client.aliases.get(name)!) : client.textCommands.get(name);
        if (!command) return

        try {
            command.run(handler, message, args, name);
        } catch(err: any) { message.reply({ content: `There was an error:\n\`\`\`js\n${err.message}\n\`\`\``,  })}
    }
)