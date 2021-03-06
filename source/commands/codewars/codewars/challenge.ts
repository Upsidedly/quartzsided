import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { Handler } from "../../../handler/main";
import axios from 'axios';
import { substringCount, CodewarsSlug } from "../../../handler/misc.js";

export default async (handler: Handler, inter: CommandInteraction) => {
    const slug = CodewarsSlug(inter.options.getString('challenge')!);

    let res; try {
        if (inter.options.getString('id')) {
            res = await axios.get(`https://www.codewars.com/api/v1/code-challenges/${inter.options.getString('id')}`)
        } else {
            res = await axios.get(`https://www.codewars.com/api/v1/code-challenges/${slug}`)
        }
    } catch(err) {
        return inter.reply({ content: 'Challenge not found.', ephemeral: true })
    }

    await inter.deferReply({ ephemeral: false })

    res = res.data

    const languages = res.languages.length > 5 ? 
        `${res.languages.slice(0, 5).map((l: string) => `\`${l}\``).join(' ')} ...and **${res.languages.length - 5}** more` :
        res.languages.slice(0, 5).map((l : string) => `\`${l}\``).join(' ');

    const tags = res.tags.length > 5 ?
        `${res.tags.slice(0, 5).map((l: string) => `\`${l}\``).join(' ')} ...and **${res.tags.length - 5}** more` :
        res.tags.slice(0, 5).map((l : string) => `\`${l}\``).join(' ');

    const description = res.description.length > 2000 ? 
    substringCount(res.description.substring(0, res.description.length - 2000), '`', false) % 3 !== 0 ?
    res.description.substring(0, res.description.length - 2000) + '`'.repeat(substringCount(res.description.substring(0, res.description.length - 2000), '`', false) % 3 - 1) + '...' :
    `${res.description.substring(0, res.description.length - 2000)}...` : 
    res.description
    
    const embed = new MessageEmbed()
        .setURL(res.url)
        .setDescription(description)
        .setFooter(res.id)
        .addFields([
            { name: 'Tags', value: tags !== '' ? tags : 'None', inline: true},
            { name: 'Languages', value: languages !== '' ? languages : 'None', inline: true },
            { name: 'Rank', value: res.rank.name !== '' ? res.rank.name : 'None', inline: true },
            { name: 'Slug', value: res.slug !== '' ? res.slug : 'None', inline: true}
        ])
        .setColor(res.rank.color.toUpperCase())
        .setTimestamp()
    

    const row = new MessageActionRow()
        .addComponents([
            new MessageButton()
                .setStyle('LINK')
                .setURL(res.url)
                .setLabel('View Kata')
        ])
    
        switch (res.rank.name) {
            case '8 kyu':
                embed.setTitle('<:8kyu:940294455217520700> ' + res.name)
                break;
            case '7 kyu':
                embed.setTitle('<:7kyu:940294454873567273> ' + res.name)
                break;
            case '6 kyu':
                embed.setTitle('<:6kyu:940294454865178674> ' + res.name)
                break;
            case '5 kyu':
                embed.setTitle('<:5kyu:940294454764515408> ' + res.name)
                break;
            case '4 kyu':
                embed.setTitle('<:4kyu:940294454886166618> ' + res.name)
                break;
            case '3 kyu':
                embed.setTitle('<:3kyu:940294454747729980> ' + res.name)
                break;
            case '2 kyu':
                embed.setTitle('<:2kyu:940294454789693450> ' + res.name)
                break;
            case '1 kyu':
                embed.setTitle('<:1kyu:940294454793871380> ' + res.name)
                break;
            default:
                embed.setTitle(res.name)
                break;
        }
    
    await inter.editReply({ embeds: [embed] })
}