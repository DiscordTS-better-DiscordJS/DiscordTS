export enum PermissionsEnum {

}

export type PermissionsType = Array<PermissionsEnum>

export default class Permissions {
    permissions: PermissionsType

    constructor(permissions: PermissionsType) {
        this.permissions = permissions
    }

    /**
     * @TODO Check if permissions equals this.permissions.
     * @param {PermissionsType} permissions array.
     */
    check(permissions: PermissionsType) {

    }

    /**
     * @TODO Convert permissions array to int.
     * @param {PermissionsType} permissions array or this.
     * @returns {string} permissions int.
     */
    toByte(permissions?: PermissionsType): string {
        return ''
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
