import { Handler } from '../../../handler/main.js';
import ships from '../data/ships.js'
import { CommandInteraction, MessageEmbed } from 'discord.js';

const fullnamelist: string[] = [];

for (const ship of ships) {
    fullnamelist.push(ship.ship[0])
    fullnamelist.push(ship.ship[1])
}

export default (handler: Handler, inter: CommandInteraction) => {
    const embed = new MessageEmbed()
        .setAuthor({ name: 'every person with a ship' })
        .setDescription([...new Set(fullnamelist)].map(member => `- ${member}\n`).join(''));

    inter.reply({ embeds: [embed] })
}