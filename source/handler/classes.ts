import discord, { Collection, ClientOptions } from 'discord.js'
import { HandlerOptions, MessageCommand, SlashCommand, SnipeInfo, TextCommand, UserCommand } from './types.js';

export class QuartzClient extends discord.Client {
    public nonTextCommands = new Collection<string, SlashCommand | UserCommand | MessageCommand>()
    public textCommands = new Collection<string, TextCommand>()
    public aliases = new Collection<string, string>()

    public specials = { snipes: new Collection<string, SnipeInfo>() }

    constructor(options: ClientOptions) {
        super(options)
    }
}