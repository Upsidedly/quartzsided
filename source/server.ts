import quartzsided from './handler/main.js';
import mongoose from 'mongoose';
import fastify from 'fastify';
import { Intents } from 'discord.js';
import { QuartzClient } from './handler/classes.js';
import config from './handler/config.js';

const app = fastify({ logger: true }), PORT = 3000;

const client = new QuartzClient({ intents: new Intents(32767)});

const mURI = `mongodb+srv://${config.mongo.user}:${config.mongo.pass}@cluster0.uooe5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(mURI, async () => {
    try { await app.listen(PORT) } catch (err) { app.log.error(err); process.exit(1) }
})

await quartzsided.init({ client: client, auto: 'all', servers: ['935957851430592592'], extras: { mongo: mongoose, app: app } })