import quartzsided, { Handler } from '../../handler/main.js';
import { CommandInteraction } from 'discord.js';
import config from '../../handler/config.js';

quartzsided.newCommand('CHAT_INPUT', {
    name: 'blox',
    description: 'Blox fruit',
    ownerOnly: true,
    developmental: true,
    run: async (handler: Handler, inter: CommandInteraction) => {
        if (inter.options.getSubcommand()) {
            const { default: func } = await import(`./bloxfruits/${inter.options.getSubcommand()}.js`)
        }
    },
    options: [
        {
            name: 'stock',
            description: 'Blox fruit stock',
            type: 'SUB_COMMAND',
        }
    ]
})