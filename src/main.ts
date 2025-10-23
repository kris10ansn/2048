import constants, { type Direction } from "./constants";
import { HTMLBoardHandler } from "./board";
import { Game } from "./Game";
import { match } from "./util/match";
import "./style.scss";

const main = () => {
    const root = document.querySelector("div#board");

    if (root === null) {
        throw new Error("Root element not found!");
    }

    const board = new HTMLBoardHandler(root, constants.boardSize);

    board.addTile({ x: 2, y: 2 }, 2);
    board.addTile({ x: 1, y: 1 }, 2);

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
    });
};

main();
