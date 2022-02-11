import { Handler } from '../../../handler/main.js';
import ships from '../data/ships.js'
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { ShipInfo } from '../../../handler/types.js';

const it = (inter: CommandInteraction, ship: ShipInfo) => {
    const searchName = inter.options.getString('name')!.trim().toLowerCase()
    return (
        ship.otherNames?.map(name => name.toLowerCase()).includes(searchName) ||
        ship.verifiedNames.map(name => name.toLowerCase()).includes(searchName)
    )
}

export default (handler: Handler, inter: CommandInteraction) => {
    try {
        const ship = ships.find(ship => it(inter, ship))

        if (!ship) return inter.reply({ content: 'No ships found!', ephemeral: true })

        const embed = new MessageEmbed()

        if (ship.verifiedNames.length > 0) embed.addField('<:Verified:908892466353172560> Verified Names', ship.verifiedNames.join(', '), false);
        if (ship.otherNames && ship.otherNames?.length > 0) embed.addField('Other Names', ship.otherNames.join(', '), false);
        embed.addField('Ship', `${ship.ship[0]} x ${ship.ship[1]}`, false);
        embed.addField('Status', ship.status, false)
        if (ship.icon) embed.setThumbnail(ship.icon);

        inter.reply({ embeds: [embed] })
    } catch {}
}