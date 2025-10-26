import "./style.scss";

import { HTMLBoardHandler } from "@/board-handlers/HTMLBoardHandler";
import constants from "@/constants";
import { Game } from "@/Game";
import type { Direction } from "@/types/Direction";
import { match } from "@/util/match";

const main = () => {
    const root = document.querySelector("div#board");

    if (root === null) {
        throw new Error("Root element not found!");
    }

    const board = new HTMLBoardHandler(root, constants.boardSize);

    const game = new Game(board, constants.boardSize);

    if (import.meta.env.DEV) {
        import("./dev/demo").then((module) => module.runDemo(board, game));
    } else {
        game.setup();
    }

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
