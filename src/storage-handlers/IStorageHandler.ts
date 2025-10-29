export interface IStorageHandler<T> {
    save<K extends keyof T>(key: K, data: T[K]): Promise<void>;
    load<K extends keyof T>(key: K): Promise<T[K] | null>;
    remove<K extends keyof T>(key: K): Promise<void>;
}
