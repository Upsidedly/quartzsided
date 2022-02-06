import quartzsided, { Handler } from '../handler/main.js';
import { Message } from 'discord.js';

quartzsided.newEvent(
    'messageDelete',
    (handler: Handler, message: Message) => {
        if (message.author.bot) return
        handler.client.specials.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author.id,
            image: message.attachments.first() ? message.attachments.first()?.proxyURL : null,
            timestamp: message.createdTimestamp
        })
    }
)