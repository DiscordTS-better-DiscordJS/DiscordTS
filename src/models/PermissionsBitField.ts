import { PermissionFlags, Perms, PermissionsType, BitFieldResolvable } from '../types/PermissionsTypes.ts'
import Role from './Role.ts'

export default class PermissionsBitField {

    flags: { [name: string]: number } = {}
    // permissionsINT: string
    #temp: number = 0
    bitfield: number

    constructor(bit: number, flags: { [name: string]: number }) {
        
        this.flags = flags
        this.bitfield = PermissionsBitField.resolve(bit, this.flags)
        
        // this.permissionsINT = this.toByte()
    }

    /**
     * @TODO Check if permissions equals this.permissions.
     * @param {PermissionsType} permissions array.
     */
    // check(permissions: PermissionsType) {
    // }

    /**
     * Convert permissions array to int.
     * @param {PermissionsType} permissions array or this.
     * @returns {string} permissions int.
     */
    // toByte(permissions?: PermissionsType): string {
    //     const Permissions = permissions || this.flags   
    //     this.#temp = 0

    //     Permissions.forEach(permission => this.#temp += permission)

    //     return this.#temp.toString()
    // }

    /**
     * @TODO Convert permissions int to array.
     * @param {string} permissions int.
     * @returns {PermissionsType} permissions array.
     */
    // toArray(permissions: string): PermissionsType {
    //     return []
    // }

    static resolve (bit: BitFieldResolvable = 0, flags: any): number {
        if (typeof bit === 'string' && !isNaN(parseInt(bit))) return parseInt(bit)
        if (typeof bit === 'number' && bit >= 0) return bit
        if (bit instanceof PermissionsBitField) return bit.bitfield
        if (Array.isArray(bit)) return bit.map((p) => this.resolve(p, flags)).reduce((prev, p) => prev | p, 0)
        if (typeof bit  === 'string' && typeof flags[bit] !== 'undefined') return flags[bit]
        else throw new RangeError("Invalid BitFidl")
        
    }
}
