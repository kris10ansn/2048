import type { IStorageHandler } from "./IStorageHandler";

export class DebugStorageHandler<T> implements IStorageHandler<T> {
    public async save<K extends keyof T>(key: K, data: T[K]): Promise<void> {
        console.debug("SAVE", { key, data });
    }

    public async load<K extends keyof T>(key: K): Promise<T[K] | null> {
        console.debug("LOAD", key);
        return null;
    }
    public async remove<K extends keyof T>(key: K): Promise<void> {
        console.debug("REMOVE", key);
    }
}
