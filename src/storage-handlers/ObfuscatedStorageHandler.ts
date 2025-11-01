import type { IStorageHandler } from "./IStorageHandler";

export type ObfuscationOptions = {
    obfuscate(data: string): string;
    deObfuscate(data: string): string;
};

export class ObfuscatedStorageHandler<T> implements IStorageHandler<T> {
    public constructor(
        private readonly handler: IStorageHandler<Record<string, string>>,
        private readonly options: ObfuscationOptions,
    ) {}

    public save<K extends keyof T>(key: K, data: T[K]): Promise<void> {
        return this.handler.save(
            this.options.obfuscate(key.toString()),
            this.options.obfuscate(JSON.stringify(data)),
        );
    }

    public load<K extends keyof T>(key: K): Promise<T[K] | null> {
        return this.handler
            .load(this.options.obfuscate(key.toString()))
            .then((value) =>
                value !== null
                    ? JSON.parse(this.options.deObfuscate(value))
                    : null,
            );
    }
    public remove<K extends keyof T>(key: K): Promise<void> {
        return this.handler.remove(this.options.obfuscate(key.toString()));
    }
}
