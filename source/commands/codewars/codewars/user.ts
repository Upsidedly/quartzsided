import { CommandInteraction, MessageEmbed } from "discord.js";
import { Handler } from "../../../handler/main";
import axios from 'axios';

export default async (handler: Handler, inter: CommandInteraction) => {
    let req
    try { req = await axios.get(`https://www.codewars.com/api/v1/users/${inter.options.getString('name')}`) } catch (err) {
        return inter.reply({ content: 'Codewars user not found.\n**TIP**: Users are case sensitive.', ephemeral: true });
    }

    if (req === undefined || req.data.success !== undefined) {
        return inter.reply({ content: 'Codewars user not found.\n**TIP**: Users are case sensitive.', ephemeral: true });
    } else {
        const embed = new MessageEmbed()
            .addFields([
                { name: 'Honor', value: req.data.honor.toString(), inline: true },
                { name: 'Rank', value: `${req.data.ranks.overall.name}\nScore: ${req.data.ranks.overall.score}`, inline: true},
                { name: 'Challenges Completed', value: req.data.codeChallenges.totalCompleted.toString(), inline: true},
                { name: 'Challenges Authored', value: req.data.codeChallenges.totalAuthored.toString(), inline: true},
                { name: 'Leaderboard Rank', value: req.data.leaderboardPosition ? req.data.leaderboardPosition.toString() : 'Unplaced', inline: true},
                { name: 'Clan', value: req.data.clan || 'None', inline: true }
            ])
            
        switch (req.data.ranks.overall.name) {
            case '8 kyu':
                embed.setTitle('<:8kyu:940294455217520700> ' + req.data.username)
                break;
            case '7 kyu':
                embed.setTitle('<:7kyu:940294454873567273> ' + req.data.username)
                break;
            case '6 kyu':
                embed.setTitle('<:6kyu:940294454865178674> ' + req.data.username)
                break;
            case '5 kyu':
                embed.setTitle('<:5kyu:940294454764515408> ' + req.data.username)
                break;
            case '4 kyu':
                embed.setTitle('<:4kyu:940294454886166618> ' + req.data.username)
                break;
            case '3 kyu':
                embed.setTitle('<:3kyu:940294454747729980> ' + req.data.username)
                break;
            case '2 kyu':
                embed.setTitle('<:2kyu:940294454789693450> ' + req.data.username)
                break;
            case '1 kyu':
                embed.setTitle('<:1kyu:940294454793871380> ' + req.data.username)
                break;
            default:
                embed.setTitle(req.data.username)
                break;
        }
        
        embed.setColor(req.data.ranks.overall.color.toUpperCase())
        inter.reply({ embeds: [embed] })
    }
}