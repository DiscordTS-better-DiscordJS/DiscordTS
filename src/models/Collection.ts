

export default class Collection<K, V> extends Map<K ,V> {
    constructor (options?: any) {
        super()
    }
    
    /**
     * Find key in Collection.
     * @param {Function} Function to test with.
     * @param {*} Value to use.
     * @returns {*}
     * @example new Collection().find(a => a.name === 'hello')
     */
    find(method: (key: K, value: V, collection: this) => boolean): V | any {
        for (let [k, v] of this){
            if (method(k, v, this)) return v
        }
    }


}