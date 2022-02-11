import quartzsided, { Handler } from '../../handler/main.js';
import { CommandInteraction } from 'discord.js';
import config from '../../handler/config.js';

quartzsided.newCommand('CHAT_INPUT', {
    name: 'invite',
    description: 'Invite the bot!',
    ownerOnly: true,
    run: (handler: Handler, inter: CommandInteraction) => {
        try {
            inter.reply({ content: `You can invite the bot [here](${config.invite})`, ephemeral: true })
        } catch {}
    },
    developmental: true
})