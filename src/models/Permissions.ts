import PermissionsBitField from './PermissionsBitField.ts'
import { PermissionFlags } from '../types/PermissionsTypes.ts'

export type PermissionResolvable = string | number | Permissions | PermissionResolvable[]

export default class Permissions extends PermissionsBitField {

    static DEFAULT = 104324673
    static ALL = Object.values(PermissionFlags).reduce((all, p) => all | p, 0)

    constructor(bits: any) {

        super(bits, PermissionFlags)

    }

    /**
     * Check permissions
     * @param {PermissionResolvable} permission 
     * @param {boolean} checkAdmin 
     * @returns {boolean} boolean
     * @description Check permissions for role or member
     */
    has(permission: PermissionResolvable, checkAdmin = true): boolean {
        return ( (checkAdmin && this.hasByBit(this.flags.ADMINISTRATOR)) ||  this.hasByBit(permission as any) )
    }

    kickable(checkAdmin = false): boolean {
        return !( (checkAdmin && this.hasByBit(this.flags.KICK_MEMBERS)) || this.has('KICK_MEMBERS') )
    }

    bannable(checkAdmin = false): boolean {
        return !( (checkAdmin && this.hasByBit(this.flags.BAN_MEMBERS)) || this.has('BAN_MEMBERS') )
    }

}