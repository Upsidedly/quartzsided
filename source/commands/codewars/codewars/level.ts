import { CommandInteraction, MessageEmbed } from "discord.js";
import { Handler } from "../../../handler/main";
import axios from 'axios';

export default async (handler: Handler, inter: CommandInteraction) => {
    const embed = new MessageEmbed()
        .setTitle('Codewars Leveling')
        .setImage('https://raw.githubusercontent.com/danghh-1998/codewars/master/screenshots/levels.png')
    
    inter.reply({ embeds: [embed] })
}