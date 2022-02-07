import quartzsided from './handler/main.js';
import mongoose from 'mongoose';
import fastify from 'fastify';
import { Intents } from 'discord.js';
import { QuartzClient } from './handler/classes.js';
import config from './handler/config.js';

const app = fastify(), PORT = 3000;

const client = new QuartzClient({ intents: new Intents(32767)});

const mURI = `mongodb+srv://${config.mongo.user}:${config.mongo.pass}@cluster0.uooe5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(mURI, async () => {
    console.log(`Mongo :: Connected.`);
    try { await app.listen(PORT); console.log('Fastify :: Connected.') } catch (err) { app.log.error(err); process.exit(1) };
    await quartzsided.init({ client: client, auto: 'all', servers: ['935957851430592592', '939634442933243954'], extras: { mongo: mongoose, app: app } });
});