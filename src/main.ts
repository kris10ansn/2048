import "./style.scss";

import { HTMLBoardHandler } from "@/board-handlers/HTMLBoardHandler";
import constants from "@/constants";
import { Game } from "@/Game";
import type { Direction } from "@/types/Direction";
import { match } from "@/util/match";
import { loadState, saveState, type GameState } from "./state";
import { LocalStorageHandler } from "./storage-handlers/LocalStorageHandler";

const main = () => {
    const root = document.querySelector("div#board");

    if (root === null) {
        throw new Error("Root element not found!");
    }

    const board = new HTMLBoardHandler(root, constants.boardSize);

    const game = new Game(board, constants.boardSize);
    const gameStorage = new LocalStorageHandler<GameState>();

    loadState(game, gameStorage);

    game.events.addEventListener("did-slide", () => {
        saveState(game, gameStorage);
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
