import quartzsided, { Handler } from '../../handler/main.js';
import { Message, MessageEmbed } from 'discord.js';

quartzsided.newChatCommand({
    name: 'collector',
    description: 'offgrid',
    aliases: [],
    category: 'dev-only',
    run: async (handler: Handler, message: Message, args: string[], name: string) => {
        let stage = 1

        message.reply('enter your username:')

        const collector = message.channel.createMessageCollector({ 
            filter: (m: Message) => m.author.id === message.author.id,
            max: 9,
            time: 1000 * 20
        })

        collector.on('collect', message => {
            console.log(message.content)
        })

        collector.on('end', collected => {
            if (collected.size === 0) {
                message.reply('Message timeout: You did not say anything!')
            } else {
                message.reply({ content: `**Collected**:\n${collected.map(m => m.content).join(', ')}`})
            }
        })
    }
})