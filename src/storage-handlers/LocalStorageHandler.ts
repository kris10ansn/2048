import type { IStorageHandler } from "./IStorageHandler";

export class LocalStorageHandler<T> implements IStorageHandler<T> {
    public async save<K extends keyof T>(key: K, data: T[K]): Promise<void> {
        localStorage.setItem(String(key), JSON.stringify(data));
    }

    public async load<K extends keyof T>(key: K): Promise<T[K] | null> {
        const data = localStorage.getItem(String(key));
        return data ? (JSON.parse(data) as T[K]) : null;
    }

    public async remove<K extends keyof T>(key: K): Promise<void> {
        localStorage.removeItem(String(key));
    }
}
