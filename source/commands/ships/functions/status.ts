import { Handler } from '../../../handler/main.js';
import ships from '../data/ships.js'
import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { ShipInfo } from '../../../handler/types.js';

const it = (inter: CommandInteraction, ship: ShipInfo) => {
    const list = ['one-sided', 'interesting', 'dead', 'stillborn', 'headcanon', 'canon'].map(s => s.toLowerCase())
    const searchName = inter.options.getString('status')!.trim().toLowerCase()
    if (list.includes(searchName) && searchName !== 'canon') {
        return ship.status.toLowerCase().includes(searchName)
    } else if (list.includes(searchName) && searchName === 'canon') {
        if (!ship.status.toLowerCase().includes('headcanon')) return ship.status.toLowerCase().includes(searchName); else return false; 
    } else if (!list.includes(searchName)) return ship.status.toLowerCase() === searchName
}

export default (handler: Handler, inter: CommandInteraction) => {
    try {
        const person_ships = ships.filter(ship => it(inter, ship)).sort()
        if (person_ships.length === 0) return inter.reply({ content: 'There are no ships found with this status!', ephemeral: true })

        const embed = new MessageEmbed()
            .setTitle(`${inter.options.getString('status')} ships`)
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