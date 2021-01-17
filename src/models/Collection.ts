

export default class Collection<K, V> extends Map<K ,V> {

    // maybe in future some options?
    constructor (options?: any) {
        super()
    }
    
    find(method: (value: V, key: K, collection: this) => boolean): V | any {
        for (let [k, v] of this){
            if (method(v, k, this)) return v
        }
    }


}