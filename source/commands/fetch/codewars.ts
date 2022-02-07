import quartzsided, { Handler } from '../../handler/main.js';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import axios from 'axios';

quartzsided.newCommand('CHAT_INPUT', {
    name: 'codewars',
    description: 'Get the info of a codewars user!',
    developmental: true,
    run: async (handler: Handler, inter: CommandInteraction) => {
        if (inter.options.getSubcommand()) {
            const { default: func } = await import(`./codewars/${inter.options.getSubcommand()}.js`)
            func(handler, inter)
        } else {
            inter.reply({ content: 'There was an issue', ephemeral: true })
        }
    },
    options: [
        {
            name: 'user',
            description: 'Get information of a codewars user',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'name',
                    description: 'The name of the codewars user',
                    type: 'STRING',
                    required: true
                }
            ]
        },
        {
            name: 'level',
            description: 'A list of the levels in codewars',
            type: 'SUB_COMMAND'
        },
        {
            name: 'challenge',
            description: 'Get information about a challenge',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'challenge',
                    description: 'The name of the challenge',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'id',
                    description: 'The id of the challenge, if you want to use that instead.',
                    type: 'STRING',
                    required: false
                }
            ]
        }
    ]
})