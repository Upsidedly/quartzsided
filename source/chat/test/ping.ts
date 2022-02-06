import quartzsided, { Handler } from '../../handler/main.js';
import { Message, MessageEmbed } from 'discord.js';

quartzsided.newChatCommand({
    name: 'ping',
    description: 'Replies with the ms.',
    aliases: ['ms'],
    category: 'dev-only',
    run: (handler: Handler, message: Message, args: string[], name: string) => {
        const embed = new MessageEmbed()
            .setTitle('Pong 🏓')
            .addFields([
                { name: 'Latency', value: `\`${Date.now() - message.createdTimestamp}ms\``, inline: false },
                { name: 'API Latency', value: `\`${Math.round(handler.client.ws.ping)}ms\``}
            ])
        message.reply({ embeds: [embed] })
    }
})