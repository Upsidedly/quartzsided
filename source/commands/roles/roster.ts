import quartzsided, { Handler } from '../../handler/main.js';
import { CommandInteraction, GuildMember, Role } from 'discord.js';
import config from '../../handler/config.js';

const ids = {
    rl: ['937721456194879540', '937721388989550654', '937723294256365578'],
    fn: ['935957851480936558', '935957851430592601', '937723377211293706']
}

async function ifNotRoleAdd(member: GuildMember, ids: string[]): Promise<any> {
    for (const id of ids) {
        if (!member.roles.cache.has('937724404685766788')) await member.roles.add(member.guild.roles.cache.get(id)!); 
    }
}
    

quartzsided.newCommand('CHAT_INPUT', {
    name: 'roster',
    description: 'Add a role for a genesis member!',
    rolesOnly: ['935957851480936565'],
    developmental: true,
    run: async (handler: Handler, inter: CommandInteraction) => {
        inter.deferReply({ ephemeral: true })

        if(!inter.memberPermissions?.has('MANAGE_ROLES')) return inter.reply({
            content: 'You do not have the permission to run this command!', ephemeral: true
        })

        for (const roles of Object.values(ids)) {
            for (const role of roles) {
                if (!inter.guild?.roles.cache.get(role)!.editable) {
                    return inter.editReply({ content: 'I do not have the permission to do this.' })
                }
            }
        }

        const roleChosen = inter.options.getRole('role')!;
        const userChosen = inter.options.getMember('user') as GuildMember;

        if (ids.rl.includes(roleChosen.id)) {
            await ifNotRoleAdd(userChosen, [roleChosen.id, '937721288926068796', '937724404685766788'])
            return inter.editReply({ content: 'Done.' })
        } else if (ids.fn.includes(roleChosen.id)) {
            await ifNotRoleAdd(userChosen, [roleChosen.id, '935957851480936559', '937724404685766788'])
            return inter.editReply({ content: 'Done.' })
        }
    },
    options: [
        {
            name: 'role',
            description: 'The genesis member role you want to add!',
            type: 'ROLE',
            required: true
        },

        {
            name: 'user',
            description: 'The genesis member you want to give the role to.',
            type: 'USER',
            required: true
        }
    ]
})