import quartzsided from './handler/main.js';
import { Intents } from 'discord.js';
import { QuartzClient } from './handler/classes.js';

const client = new QuartzClient({ intents: new Intents(32767)})

await quartzsided.init({ client: client, auto: 'all', servers: ['935957851430592592'] })