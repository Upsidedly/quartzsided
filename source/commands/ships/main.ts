import quartzsided, { Handler } from '../../handler/main.js';
import { CommandInteraction } from 'discord.js';

quartzsided.newCommand('CHAT_INPUT', {
    name: 'ship',
    description: 'The main ship module',
    developmental: true,
    run: async (handler: Handler, inter: CommandInteraction) => {
        try {
            if (inter.options.getSubcommand()) {
                const { default: func } = await import(`./functions/${inter.options.getSubcommand()}.js`)
                if (!func) return inter.reply({ content: 'There was an issue.', ephemeral: true })
                func(handler, inter)
            }
        } catch {}
    },
    options: [
        {
            name: 'find',
            description: 'Lookup a ship in the database!',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'name',
                    description: 'The name of the ship you are attempting to find',
                    type: 'STRING',
                    required: true
                }
            ]
        },
        {
            name: 'person',
            description: 'List the ships of a person in the database',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'person',
                    description: 'The name of the person you are attempting to look up the ships for.',
                    type: 'STRING',
                    required: true
                }
            ]
        },
        {
            name: 'names',
            description: 'The list of every person in a ship',
            type: 'SUB_COMMAND',
        },
        {
            name: 'status',
            description: 'Lookup ships by status',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'status',
                    description: 'The name of the status you are looking up ships for',
                    type: 'STRING',
                    required: true
                }
            ]
        },
        {
            name: 'statuses',
            description: 'The list of statuses',
            type: 'SUB_COMMAND'
        }
    ]
})