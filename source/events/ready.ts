import quartzsided, { Handler } from '../handler/main.js';
import chalk from 'chalk';

quartzsided.newEvent(
    'ready',
    async (handler: Handler) => {
        const { client } = handler;

        await client.user!.setPresence({
            activities: [
                { name: 'over Sided Studios', type: 'WATCHING'}
            ]
        })

        const guilds = client.guilds.cache;
        console.log(chalk.bold(`${client.user?.tag} is online in ${guilds.size === 0 || guilds.size > 1 ? `${guilds.size} servers` : '1 server'}!`))
    }
)