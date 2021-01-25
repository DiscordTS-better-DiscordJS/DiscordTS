import { PermissionFlags, Perms, PermissionsType, BitFieldResolvable } from '../types/PermissionsTypes.ts'
import Role from './Role.ts'

export default class PermissionsBitField {

    flags: { [name: string]: number } = {}
    #temp: number = 0
    bitfield: number

    constructor(bit: number, flags: { [name: string]: number }) {
        
        this.flags = flags
        this.bitfield = PermissionsBitField.resolve(bit, this.flags)
        
    }

    hasByBit(bit: BitFieldResolvable, ...args: any[]): boolean {
        if (Array.isArray(bit)) return bit.every((p) => this.hasByBit(p))
        return (this.bitfield & PermissionsBitField.resolve(bit, this.flags)) === bit
      }

    static resolve (bit: BitFieldResolvable = 0, flags: any): number {
        if (typeof bit === 'string' && !isNaN(parseInt(bit))) return parseInt(bit)
        if (typeof bit === 'number' && bit >= 0) return bit
        if (bit instanceof PermissionsBitField) return bit.bitfield
        if (Array.isArray(bit)) return bit.map((p) => this.resolve(p, flags)).reduce((prev, p) => prev | p, 0)
        if (typeof bit  === 'string' && typeof flags[bit] !== 'undefined') return flags[bit]
        else throw new RangeError("Invalid BitFidl")
        
    }
}
