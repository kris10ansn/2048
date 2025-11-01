import type { IStorageHandler } from "./IStorageHandler";

// https://developer.chrome.com/docs/extensions/reference/api/storage
export type ChromeStorageAreaName = "local" | "sync" | "managed" | "session";

export class ChromeStorageHandler<T> implements IStorageHandler<T> {
    constructor(private readonly area: ChromeStorageAreaName) {}

    public async save<K extends keyof T>(key: K, data: T[K]): Promise<void> {
        // Casting to Partial<T> as TypeScript doesn't realize that they match
        const update = { [key]: data } as unknown as Partial<T>;
        return this.getStorageArea().set<T>(update);
    }

    public async load<K extends keyof T>(key: K): Promise<T[K] | null> {
        return this.getStorageArea()
            .get<T>([key])
            .then((data) => data[key]);
    }

    public async remove<K extends keyof T>(key: K): Promise<void> {
        return this.getStorageArea().remove<T>([key]);
    }

    private getStorageArea() {
        return chrome.storage[this.area];
    }

    public static isAvailable(): boolean {
        return "chrome" in globalThis && "storage" in chrome;
    }
}
