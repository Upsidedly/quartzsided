import { Handler } from '../../../handler/main.js';
import ships from '../data/ships.js'
import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { ShipInfo } from '../../../handler/types.js';

const it = (inter: CommandInteraction, ship: ShipInfo) => {
    const searchName = inter.options.getString('person')!.trim().toLowerCase()
    return ship.ship.map(n => n.toLowerCase()).includes(searchName)
}

export default (handler: Handler, inter: CommandInteraction) => {
    try {
        const person_ships = ships.filter(ship => it(inter, ship)).sort()
        if (person_ships.length === 0) return inter.reply({ content: 'There are no ships found of this person!', ephemeral: true })

        const embed = new MessageEmbed()
        .setTitle(`Ships for ${inter.options.getString('person')}`)
        .setTimestamp()

        for (const ship of person_ships) {
            let string = `☑️ **Verified Names**: ${ship.verifiedNames.join(', ')}\n`
            if (ship.otherNames) string += `**Other Names**: ${ship.otherNames.join(', ')}\n`
            string += `**Ship**: ${ship.ship[0]} x ${ship.ship[1]}\n`
            string += `**Status**: ${ship.status}`

            embed.addField(ship.verifiedNames[0], string, true)
        }

        inter.reply({ embeds: [embed] })
    } catch {}
}