import "./style.scss";

import { HTMLBoardHandler } from "@/board-handlers/HTMLBoardHandler";
import constants from "@/constants";
import type { GameState } from "@/Game";
import { Game, loadState, saveState } from "@/Game";
import type { Direction } from "@/types/Direction";
import { match } from "@/util/match";
import { DebugStorageHandler } from "./storage-handlers/DebugStorageHandler";
import { LocalStorageHandler } from "./storage-handlers/LocalStorageHandler";

const main = () => {
    const root = document.querySelector("div#board");

    if (root === null) {
        throw new Error("Root element not found!");
    }

    const board = new HTMLBoardHandler(root, constants.boardSize);

    const game = new Game(board, constants.boardSize);
    const gameStorage = new LocalStorageHandler<GameState>();
    const debugStorage = new DebugStorageHandler<GameState>();

    loadState(game, gameStorage);

    game.events.addEventListener("did-slide", () => {
        saveState(game, debugStorage);
    });

    window.addEventListener("keydown", (event) => {
        const direction = match<string, Direction>(event.key.toLowerCase(), [
            [constants.keyMap.left, "left"],
            [constants.keyMap.right, "right"],
            [constants.keyMap.up, "up"],
            [constants.keyMap.down, "down"],
        ]);

        if (direction === null) {
            return;
        }

        game.slide(direction);
    });
};

main();
