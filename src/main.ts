import "./style.scss";

import constants from "./constants";
import { HTMLBoardHandler } from "./board-handlers/HTMLBoardHandler";
import { Game } from "./Game";
import { match } from "./util/match";
import type { Direction } from "./types/Direction";

const main = () => {
    const root = document.querySelector("div#board");

    if (root === null) {
        throw new Error("Root element not found!");
    }

    const board = new HTMLBoardHandler(root, constants.boardSize);

    if (import.meta.env.DEV) {
        import("./dev/demo").then((module) => module.runDemo(board));
    }

    const game = new Game(board, constants.boardSize);

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
        game.merge(direction);
        game.slide(direction);
    });
};

main();
