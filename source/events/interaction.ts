import quartzsided, { Handler } from '../handler/main.js';
import { CommandInteraction, Interaction, MessageContextMenuInteraction, UserContextMenuInteraction } from 'discord.js';
import config from '../handler/config.js';

quartzsided.newEvent(
    'interactionCreate',
    (handler: Handler, inter: Interaction, { client } = handler) => {
        try {
            if (inter.isCommand() || inter.isMessageContextMenu() || inter.isUserContextMenu()) {
                const command = client.nonTextCommands.get(inter.commandName);
                if (!command) return inter.reply({ content: 'There was an error', ephemeral: true })
                command.run(handler, inter as CommandInteraction & UserContextMenuInteraction & MessageContextMenuInteraction)
            }
        } catch {}
    }
)