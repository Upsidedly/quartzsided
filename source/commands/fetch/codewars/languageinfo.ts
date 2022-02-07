import { CommandInteraction, MessageEmbed } from "discord.js";
import { Handler } from "../../../handler/main";
import axios from 'axios';

export default async (handler: Handler, inter: CommandInteraction) => {
    let req
    try { req = await axios.get(`https://www.codewars.com/api/v1/users/${inter.options.getString('name')}`) } catch (err) {

    }

    if (req === undefined || req.data.success !== undefined) {
        return inter.reply({ content: 'Codewars user not found.\n**TIP**: Users are case sensitive.', ephemeral: true });
    } else {
        if (!req.data.ranks.languages[inter.options.getString('language')?.toLowerCase()!]) return inter.reply({ content: 'User does not have this language', ephemeral: true })
        const embed = new MessageEmbed()
            .setAuthor({ name: req.data.username })
            .addFields([
                { name: 'Rank', value: `${req.data.ranks.languages[inter.options.getString('language')?.toLowerCase()!].name}`, inline: true},
                { name: 'Score', value: `${req.data.ranks.languages[inter.options.getString('language')?.toLowerCase()!].score}`, inline: true},
            ])
            
        switch (req.data.ranks.overall.name) {
            case '8 kyu':
                embed.setTitle('<:8kyu:940294455217520700> ' + inter.options.getString('language')?.toLowerCase()!)
                break;
            case '7 kyu':
                embed.setTitle('<:7kyu:940294454873567273> ' + inter.options.getString('language')?.toLowerCase()!)
                break;
            case '6 kyu':
                embed.setTitle('<:6kyu:940294454865178674> ' + inter.options.getString('language')?.toLowerCase()!)
                break;
            case '5 kyu':
                embed.setTitle('<:5kyu:940294454764515408> ' + inter.options.getString('language')?.toLowerCase()!)
                break;
            case '4 kyu':
                embed.setTitle('<:4kyu:940294454886166618> ' + inter.options.getString('language')?.toLowerCase()!)
                break;
            case '3 kyu':
                embed.setTitle('<:3kyu:940294454747729980> ' + inter.options.getString('language')?.toLowerCase()!)
                break;
            case '2 kyu':
                embed.setTitle('<:2kyu:940294454789693450> ' + inter.options.getString('language')?.toLowerCase()!)
                break;
            case '1 kyu':
                embed.setTitle('<:1kyu:940294454793871380> ' + inter.options.getString('language')?.toLowerCase()!)
                break;
            default:
                embed.setTitle(inter.options.getString('language')?.toLowerCase()!)
                break;
            }
        
        embed.setColor(req.data.ranks[inter.options.getString('language')?.toLowerCase()!].color.toUpperCase())
        inter.reply({ embeds: [embed] })
    }
}