import PermissionsBitField from './PermissionsBitField.ts'
import { PermissionFlags } from '../types/PermissionsTypes.ts'

export default class Permissions extends PermissionsBitField {

    #DEFAULT = 104324673
    #ALL = Object.values(PermissionFlags).reduce((all, p) => all | p, 0)

    constructor(bits: any) {

        super(bits, PermissionFlags)

        console.log(this.bitfield)

    }

}