import quartzsided, { Handler } from '../../handler/main.js';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import img from 'images-scraper';

const google = new img({
    puppeteer: {
        headless: true
    },
    safe: true
})

quartzsided.newCommand('CHAT_INPUT', {
    name: 'show',
    description: 'Show an image from google!',
    developmental: true,
    run: async (handler: Handler, inter: CommandInteraction) => {
            const query = inter.options.getString('query');

            const results = await google.scrape(query!, 1)

            const embed = new MessageEmbed()
                .setTitle(query!)
                .setImage(results.url)
            
            await inter.reply({ content: 'hi'})
            await inter.reply({ embeds: [embed] })
    },
    options: [
        {
            name: 'query',
            description: 'What you want to show an image of!',
            type: 'STRING',
            required: true
        }
    ]
})