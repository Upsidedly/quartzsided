import { CommandInteraction, MessageEmbed } from "discord.js";
import { Handler } from "../../../handler/main";

const stock = ['Kilo', 'Light', 'Quake']

export default (handler: Handler, inter: CommandInteraction) => {
    inter.reply({ embeds: [
        new MessageEmbed()
            .setTitle('Stock')
            .setDescription(stock.map(s => `${s} fruit`).join('\n'))
    ]})
}