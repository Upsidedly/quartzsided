import quartzsided, { Handler } from '../../handler/main.js';
import { ApplicationCommandOptionChoice, CommandInteraction } from 'discord.js';
import config from '../../handler/config.js';
import ships from './data/ships.js'

let fullnamelist: string[] = [];

for (const ship of ships) {
    fullnamelist.concat([ship.ship[0], ship.ship[1]])
}

fullnamelist = [...new Set(fullnamelist)];

const cm = (s: string) => { return { name: s, value: s} }
const choicify = (n: string[]) => n.map(s => cm(s))

quartzsided.newCommand('CHAT_INPUT', {
    name: 'ship',
    description: 'The main ship module',
    developmental: true,
    rolesOnly: ['940077078261420064'],
    run: async (handler: Handler, inter: CommandInteraction) => {
        if (inter.options.getSubcommand()) {
            const { default: func } = await import(`./functions/${inter.options.getSubcommand()}.js`)
            if (!func) return inter.reply({ content: 'There was an issue.', ephemeral: true })
            func(handler, inter)
        }
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
                    choices: choicify(fullnamelist),
                    required: true
                }
            ]
        }
    ]
})