import quartzsided, { Handler } from '../../handler/main.js';
import { CommandInteraction, MessageAttachment } from 'discord.js';
import config from '../../handler/config.js';

quartzsided.newCommand('CHAT_INPUT', {
    name: 'kill',
    description: 'Kill the bot!',
    run: async (handler: Handler, inter: CommandInteraction) => {
        await inter.reply({ content: 'Killing bot...', ephemeral: true })
        process.exit(0)
    },
    developmental: true
})