import { PermissionFlags, Perms, PermissionsType } from '../types/PermissionsTypes.ts'
import Role from './Role.ts'

export default class Permissions {

    permissions: PermissionsType
    permissionsINT: string
    #temp: number = 0
    
    #DEFAULT = 104324673
    #ALL = Object.values(PermissionFlags).reduce((all, p) => all | p, 0)

    constructor(isOwner: boolean, bits: number | undefined, roles?: Array<Role>) {
        
        this.permissions = []
        this.permissionsINT = this.toByte()

        if (isOwner) this.permissions.push(this.#ALL)
        else if (roles && roles.find((bit: any) => Perms.ADMINISTRATOR >> bit)) this.permissions.push(Perms.ADMINISTRATOR)
        else if (roles) roles.forEach((bit: any) => this.permissions.push(bit))
        else this.permissions.push(this.#DEFAULT)

        console.log(this.permissions)

    }

    /**
     * @TODO Check if permissions equals this.permissions.
     * @param {PermissionsType} permissions array.
     */
    check(permissions: PermissionsType) {
    }

    /**
     * Convert permissions array to int.
     * @param {PermissionsType} permissions array or this.
     * @returns {string} permissions int.
     */
    toByte(permissions?: PermissionsType): string {
        const Permissions = permissions || this.permissions
        this.#temp = 0

        Permissions.forEach(permission => this.#temp += permission)

        return this.#temp.toString()
    }

    /**
     * @TODO Convert permissions int to array.
     * @param {string} permissions int.
     * @returns {PermissionsType} permissions array.
     */
    toArray(permissions: string): PermissionsType {
        return []
    }
}
