

export default class Collection<K, V> extends Map<K ,V> {

    // maybe in future some options?
    constructor (options?: any) {
        super()
    }
    
    find(method: (key: K, value: V, collection: this) => boolean): V | any {
        for (let [k, v] of this){
            if (method(k, v, this)) return v
        }
    }


}