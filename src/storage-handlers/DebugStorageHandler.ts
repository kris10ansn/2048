import constants from "../constants";
import type { GameState } from "../state";
import type { Point } from "../types/Point";
import type { IStorageHandler } from "./IStorageHandler";

export class DebugStorageHandler<T> implements IStorageHandler<T> {
    constructor(private data: T) {}

    public async save<K extends keyof T>(key: K, data: T[K]): Promise<void> {
        console.debug("SAVE", { key, data });
    }

    public async load<K extends keyof T>(key: K): Promise<T[K] | null> {
        console.debug("LOAD", key);
        return this.data[key];
    }
    public async remove<K extends keyof T>(key: K): Promise<void> {
        console.debug("REMOVE", key);
    }
}

export const createDummyGameStorage = (
    ...tiles: (Point & { value: number })[]
) => {
    const storage = new DebugStorageHandler<GameState>({
        board: Array.from({ length: constants.numbers.boardSize }, (_, y) =>
            Array.from(
                { length: constants.numbers.boardSize },
                (_, x) =>
                    tiles.find((tile) => tile.x === x && tile.y === y)?.value ??
                    null,
            ),
        ),
        score: 0,
        highScore: 0,
        isNewHighScore: false,
    });
    return storage;
};
