export enum PermissionsEnum {

}

export type PermissionsType = Array<PermissionsEnum>

export default class Permissions {
    permissions: PermissionsType

    constructor(permissions: PermissionsType) {
        this.permissions = permissions
    }

    /**
     * @TODO Check if permissions equals this.permissions
     * @param {PermissionsType} permissions 
     */
    check(permissions: PermissionsType) {

    }
}
