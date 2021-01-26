import Member from '../models/Member.ts'
import Guild from '../models/Guild.ts'
import Role from '../models/Role.ts'
import Collection from '../models/Collection.ts'

export default class MemberRolesManager {
    guild: Guild
    member: Member
    roles: Collection<string, Role>

    constructor(member: Member, guild: Guild, dataRoles: string[]) {
        this.guild = guild
        this.member = member

        console.log(this.guild)
        const roles: Collection<string, Role> = this.guild.roles

        this.roles = new Collection()
        roles.forEach((r: Role) => {
            if (dataRoles.includes(r.id)) this.roles.set(r.id, r)
        })

    }

    toArrayAll() {
        let total: Array<Role> = []
        this.roles.forEach((r: Role) => total.push(r))
        return total
    }

}