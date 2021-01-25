import Member from '../models/Member.ts'
import Guild from '../models/Guild.ts'
import Role from '../models/Role.ts'
import Collection from '../models/Collection.ts'

export default class MemberRolesManager {
    guild: Guild
    member: Member

    constructor(member: Member, guild: Guild) {
        this.guild = guild
        this.member = member

        const roles: Collection<string, Role> = this.guild.roles

        roles.forEach((r: Role) => {
            console.log(r.permissions.flags)
        })

    }

}