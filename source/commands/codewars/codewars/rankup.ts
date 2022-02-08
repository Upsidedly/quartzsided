import { CommandInteraction, MessageEmbed } from "discord.js";
import { Handler } from "../../../handler/main";
import axios from 'axios';
import { CodewarsUserAPI } from "../api/gettypes";

const scoreTable = {
    '8 kyu': 0,
}

const order = ['8 kyu', '7 kyu', '6 kyu', '5 kyu', '4 kyu', '3 kyu', '2 kyu', '1 kyu']

export default async (handler: Handler, inter: CommandInteraction) => {
    let res; try { res = await axios.get(`https://www.codewars.com/api/v1/users/${inter.options.getString('user')!}`) } catch (err) {
        return inter.reply({ content: 'User not found.', ephemeral: true })
    }
    res = res.data as CodewarsUserAPI

    const embed = new MessageEmbed()
        .setTitle(res.username)
        

}