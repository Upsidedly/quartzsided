import { Handler } from '../../../handler/main.js';
import ships from '../data/ships.js'
import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { ShipInfo } from '../../../handler/types.js';

export default (handler: Handler, inter: CommandInteraction) => {
    return inter.reply({
        embeds: [
            new MessageEmbed()
                .setTitle('Statuses')
                .setDescription(ships.map(s => `- **${s.status}**`).join('\n'))
        ]
    })
}