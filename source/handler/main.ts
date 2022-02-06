import { QuartzClient } from "./classes.js";
import { HandlerOptions, MessageCommand, SlashCommand, TextCommand, UserCommand, TextCommandInfo } from "./types.js";
import { Collection, ApplicationCommandData, ApplicationCommandPermissionData, Guild } from "discord.js";
import { readdir } from 'fs/promises';
import config from './config.js'

export class Handler {
    public client!: QuartzClient;

    public readonly globalCommands: ApplicationCommandData[] = [];
    public readonly devCommands: ApplicationCommandData[] = [];

    public readonly categories = new Collection<string, TextCommandInfo[]>();
    public devServers!: string[] | undefined;

    commandsLoadable = 0;
    chatCommandsLoadable = 0;

    commandsLoaded = 0;
    chatCommandsLoaded = 0;

    async init(options: HandlerOptions) {
        this.client = options.client;
        this.devServers = options.servers;

        if (options.auto === 'all') {
            await this.start()
            await this.boot()
        } else {
            if (options.auto?.start) await this.start()
            if (options.auto?.boot) await this.boot()
        }
    }

    async start() {
        // Setting numbers

        for (const dir of await readdir('./dist/commands/')) {
            this.commandsLoadable += (await readdir(`./dist/commands/${dir}/`)).filter(f => f.endsWith('.js')).length
        }

        for (const dir of await readdir('./dist/chat/')) {
            this.chatCommandsLoadable += (await readdir(`./dist/chat/${dir}/`)).filter(f => f.endsWith('.js')).length
        }

        // Events

        for (const event of (await readdir('./dist/events/')).filter(f => f.endsWith('.js'))) {
            await import(`../events/${event}`);
        }
        
        // Commands

        for (const dir of await readdir('./dist/commands/')) {
            for (const file of (await readdir(`./dist/commands/${dir}`)).filter(f => f.endsWith('.js'))) {
                await import(`../commands/${dir}/${file}`)
            }
        }

        // Chat Commands

        for (const dir of await readdir('./dist/chat')) {
            for (const file of (await readdir(`./dist/chat/${dir}`))) {
                await import(`../chat/${dir}/${file}`)
            }
        }
    }

    async newCommand(type: 'CHAT_INPUT' | 'MESSAGE' | 'USER', info: SlashCommand | UserCommand | MessageCommand): Promise<any> {
        const formatting: ApplicationCommandData = info.options ? {
            name: info.name,
            description: info.description,
            type: type,
            defaultPermission: (info.ownerOnly === false) && (info.usersOnly === undefined) && (info.rolesOnly === undefined),
            options: info.options
        } : {
            name: info.name,
            description: info.description,
            type: type,
            defaultPermission: (info.ownerOnly === undefined) && (info.usersOnly === undefined) && (info.rolesOnly === undefined),
        }

        if (info.developmental) {
            this.devCommands.push(formatting) 
        } else {
            this.globalCommands.push(formatting)
        }

        this.client.nonTextCommands.set(info.name, info)

        this.commandsLoaded += 1
        console.log(`Commands :: ${info.name} loaded. ${this.commandsLoaded}/${this.commandsLoadable}`)
    }

    async newChatCommand(info: TextCommand) {
        this.client.textCommands.set(info.name, info)

        if (!(info.category.toLowerCase() === 'none')) {
            if (!this.categories.get(info.category)) {
                this.categories.set(info.category, []);
                this.categories.get(info.category)!.push({
                    name: info.name,
                    description: info.description,
                    aliases: info.aliases
                })
            } else {
                this.categories.get(info.category)!.push({
                    name: info.name,
                    description: info.description,
                    aliases: info.aliases
                })
            }
        }

        for (const alias of info.aliases) {
            this.client.aliases.set(alias, info.name)
        }

        this.chatCommandsLoaded += 1
        console.log(`Chat Commands :: ${info.name} loaded. ${this.chatCommandsLoaded}/${this.chatCommandsLoadable}`)
    }

    async newEvent(name: string, event: Function) {
        this.client.on(name, event.bind(null, this));
    }

    async registerCommands() {
        if (this.devServers) {
            for (const guildId of this.devServers) {
                if (!this.client.guilds.cache.has(guildId)) continue
                await this.client.guilds.cache.get(guildId)!.commands.set(this.devCommands)
    
                for (const command of this.client.guilds.cache.get(guildId)!.commands.cache.values()) {
                    const commandInfo = this.client.nonTextCommands.get(command.name)
                    if (!commandInfo) continue
    
                    if (commandInfo!.ownerOnly) {
                        await command.permissions.add({ permissions: [{ id: '935932557013426176', type: 2, permission: true}]})
                    }

                    if (commandInfo.rolesOnly) {
                        const rolePermInfo: ApplicationCommandPermissionData[] = [];
                        for (const role of commandInfo.rolesOnly) {
                            rolePermInfo.push({ id: role, type: 1, permission: true })
                        }
                        await command.permissions.add({ permissions: rolePermInfo })
                    }

                    if (commandInfo.usersOnly) {
                        const userPermInfo: ApplicationCommandPermissionData[] = [];
                        for (const user of commandInfo.usersOnly) {
                            if (this.client.users.cache.get(user)) {
                                userPermInfo.push({ id: user, type: 2, permission: true })
                            }
                        }
                        await command.permissions.add({ permissions: userPermInfo })
                    }
    
                    if (commandInfo!.permissions) {
                        await command.permissions.add({ permissions: commandInfo.permissions })
                    }
                }
            }
        }

        await this.client.application?.commands.set(this.globalCommands);
            
        for (const command of this.client.application!.commands.cache.values()) {
            const commandInfo = this.client.nonTextCommands.get(command.name)
                if (!commandInfo) continue

                for (const guild of this.client.guilds.cache.values()) {
                    if (commandInfo!.ownerOnly) {
                        await command.permissions.add({ permissions: [{ id: '935932557013426176', type: 2, permission: true}], guild: guild})
                    }

                    if (commandInfo.rolesOnly) {
                        const rolePermInfo: ApplicationCommandPermissionData[] = [];
                        for (const role of commandInfo.rolesOnly) {
                            rolePermInfo.push({ id: role, type: 1, permission: true })
                        }
                        await command.permissions.add({ permissions: rolePermInfo, guild: guild })
                    }

                    if (commandInfo.usersOnly) {
                        const userPermInfo: ApplicationCommandPermissionData[] = [];
                        for (const user of commandInfo.usersOnly) {
                            if (this.client.users.cache.get(user)) {
                                    userPermInfo.push({ id: user, type: 2, permission: true })
                            }
                        }
                        await command.permissions.add({ permissions: userPermInfo, guild: guild })
                    }

                    if (commandInfo.permissions) {
                        await command.permissions.add({ permissions: commandInfo.permissions, guild: guild})
                    }
                }
        }
    }

    async boot() {
        await this.client.login(config.info.token);
        await this.registerCommands();
    }
}

export default new Handler()