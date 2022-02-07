import quartzsided, { Handler } from '../../handler/main.js';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import akinator from 'discord.js-akinator';

quartzsided.newCommand('CHAT_INPUT', {
    name: 'snipe',
    description: 'Snipe the recently deleted message in the channel.',
    developmental: true,
    run: (handler: Handler, inter: CommandInteraction) => {
        akinator(inter, { language: 'en', useButtons: 'true', embedColor: 'BLACK' })
    }
})