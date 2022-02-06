import { 
    ApplicationCommandPermissionData,
    ApplicationCommandOptionData,
    CommandInteraction,
    MessageContextMenuInteraction,
    UserContextMenuInteraction,
    Message
} from 'discord.js';
import { Handler } from './main.js';
import { QuartzClient } from './classes.js';

export interface SlashCommand {
    name: string,
    description: string,
    ownerOnly?: boolean,
    developmental?: boolean,
    permissions?: ApplicationCommandPermissionData[],
    rolesOnly?: string[],
    usersOnly?: string[]
    options?: ApplicationCommandOptionData[],
    run: (handler: Handler, inter: CommandInteraction) => any
}

export interface UserCommand {
    name: string,
    description: string,
    ownerOnly?: boolean,
    developmental?: boolean,
    permissions?: ApplicationCommandPermissionData[],
    rolesOnly?: string[],
    usersOnly?: string[]
    options?: ApplicationCommandOptionData[],
    run: (handler: Handler, inter: UserContextMenuInteraction) => any
}


export interface MessageCommand {
    name: string,
    description: string,
    ownerOnly?: boolean,
    developmental?: boolean,
    permissions?: ApplicationCommandPermissionData[],
    rolesOnly?: string[],
    usersOnly?: string[]
    options?: ApplicationCommandOptionData[],
    run: (handler: Handler, inter: MessageContextMenuInteraction) => any
}

export interface HandlerOptions {
    client: QuartzClient,
    servers?: string[],
    auto?: { start?: boolean, boot?: boolean } | 'all'
}

export interface TextCommand {
    name: string,
    description: string,
    aliases: string[],
    category: string,
    ownerOnly?: boolean,
    rolesOnly?: string[],
    usersOnly?: string[]
    run: (handler: Handler, message: Message, args: string[], alias: string) => any
}

export interface TextCommandInfo {
    name: string,
    description: string,
    aliases: string[]
}

export interface SnipeInfo {
    content: string,
    author: string,
    image: string | null | undefined,
    timestamp: number
}