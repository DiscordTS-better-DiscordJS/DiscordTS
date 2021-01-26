/**
 * Class representing a Collection.
 * @extends Map
 */
export default class Collection<K, V> extends Map<K ,V> {
    constructor () {
        super()
    }
    
    /**
     * Find key in Collection.
     * @param {Function} function - Function to test with.
     * @param {*} value - Value to use.
     * @example new Collection().find(a => a.name === 'hello')
     */
    find(method: (key: K, value: V, collection: this) => boolean): V | any {
        for (let [k, v] of this){
            if (method(k, v, this)) return v
        }
    }

    getOne(value: K): V | undefined {
        return this.get(value)
    }

}