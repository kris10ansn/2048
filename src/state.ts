import type { Game } from "./Game";
import type { IStorageHandler } from "./storage-handlers/IStorageHandler";
import { createBoardIterator } from "./util/boardIterators";
import { logError } from "./util/logError";

export type GameState = {
    score: number;
    highScore: number;
    isNewHighScore: boolean;
    board: (number | null)[][];
};

export const loadGameState = async (
    game: Game,
    storageHandler: IStorageHandler<GameState>,
) => {
    const [score, highScore, board, isNewHighScore] = await Promise.all([
        storageHandler.load("score").catch(logError),
        storageHandler.load("highScore").catch(logError),
        storageHandler.load("board").catch(logError),
        storageHandler.load("isNewHighScore").catch(logError),
    ]);

    if (highScore !== null) {
        game.setHighScore(highScore);
    }

    if (isNewHighScore !== null) {
        game.setIsNewHighScore(isNewHighScore, { noAnimate: true });
    }

    if (score === null || board === null) {
        game.setup();
    } else {
        game.setScore(score);

        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board.length; x++) {
                const value = board[y][x];

                if (value !== null) {
                    game.boardHandler.addTile({ x, y }, value);
                }
            }
        }
    }
};

export const saveGameState = (
    game: Game,
    storageHandler: IStorageHandler<GameState>,
) => {
    storageHandler.save("score", game.getScore());
    storageHandler.save("highScore", game.getHighScore());
    storageHandler.save("isNewHighScore", game.getIsNewHighScore());

    const board: (number | null)[][] = [];

    for (const { x, y } of createBoardIterator(game.size)()) {
        if (!(y in board)) {
            board[y] = [];
        }

        board[y][x] = game.boardHandler.getTile({ x, y });
    }

    storageHandler.save("board", board);
};

export const removeBoardState = (
    storageHandler: IStorageHandler<GameState>,
) => {
    storageHandler.remove("score");
    storageHandler.remove("isNewHighScore");
    storageHandler.remove("board");
};
