import { Handler } from '../../../handler/main.js';
import ships from '../data/ships.js'
import { CommandInteraction, MessageEmbed } from 'discord.js';

const fullnamelist: string[] = [];

for (const ship of ships) {
    console.log(ship.ship[0], ship.ship[1])
    fullnamelist.push(ship.ship[0])
    fullnamelist.push(ship.ship[1])
}

console.log()

export default (handler: Handler, inter: CommandInteraction) => {
    let final = '';
    
    const embed = new MessageEmbed()
        .setAuthor({ name: 'every person with a ship' })
        .setDescription([...new Set(fullnamelist)].map(member => `- ${member}\n`).join(''));

    inter.reply({ embeds: [embed] })
}