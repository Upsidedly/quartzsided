import quartzsided, { Handler } from '../../handler/main.js';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import config from '../../handler/config.js';
import moment from 'moment';

quartzsided.newCommand('CHAT_INPUT', {
    name: 'snipe',
    description: 'Snipe the recently deleted message in the channel.',
    developmental: true,
    run: (handler: Handler, inter: CommandInteraction) => {
        if (!inter.channel) inter.reply({ content: 'This command only works in guild channels.', ephemeral: true })

        const messageInfo = handler.client.specials.snipes.get(inter.channel!.id)
        if (!messageInfo) return inter.reply({ content: 'There is no message to snipe!', ephemeral: true })

        const embed = new MessageEmbed()
            .setAuthor({
                 iconURL: handler.client.users.cache.get(messageInfo.author)?.avatarURL({ dynamic: true })!,
                 name: handler.client.users.cache.get(messageInfo.author)?.tag!
            })
            .setDescription(messageInfo.content)
            .setFooter({ text: moment(messageInfo.timestamp).fromNow() })
        
        if (messageInfo.image) embed.setImage(messageInfo.image)

        inter.reply({ embeds: [embed] })
    }
})