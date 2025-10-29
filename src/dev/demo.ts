import type { IBoardHandler } from "@/board-handlers/IBoardHandler";
import { loadState, type Game, type GameState } from "@/Game";
import type { IStorageHandler } from "../storage-handlers/IStorageHandler";

class DummyStorageHandler implements IStorageHandler<GameState> {
    private dummyState: GameState = {
        board: [
            [2048, 2048, 4096, null],
            [null, 4, null, null],
            [null, null, 4, null],
            [null, null, null, null],
        ],
        score: 50000,
        highScore: 59,
    };

    load<K extends keyof GameState>(key: K): Promise<GameState[K] | null> {
        return Promise.resolve(this.dummyState[key]);
    }
    remove<K extends keyof GameState>(key: K): Promise<void> {
        throw new Error("Method not implemented.");
    }
    save<K extends keyof GameState>(key: K, data: GameState[K]): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export const runDemo = (_board: IBoardHandler, game: Game) => {
    loadState(game, new DummyStorageHandler());
};
