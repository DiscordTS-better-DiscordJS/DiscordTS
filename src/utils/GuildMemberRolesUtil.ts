import Member from '../models/Member.ts'
import Role from '../models/Role.ts'
import Collection from '../models/Collection.ts'

export default class MemberRolesManager {
    member: Member
    roles: Collection<string, Role>

    constructor(member: Member, guildRoles: Array<Role>, dataRoles: string[]) {
        this.member = member

        this.roles = new Collection()
        guildRoles.forEach((r: Role) => {
            if (dataRoles.includes(r.id)) this.roles.set(r.id, r)
        })

    }

    toArrayAll() {
        let total: Array<Role> = []
        this.roles.forEach((r: Role) => total.push(r))
        return total
    }

}