import { HTMLBoardHandler } from "./board";
import "./style.scss";

const main = () => {
    const root = document.querySelector("div#board");

    if (root === null) {
        throw new Error("Root element not found!");
    }

    const board = new HTMLBoardHandler(root, 4);

    board.addTile({ x: 2, y: 2 }, 2);
    board.addTile({ x: 1, y: 1 }, 2);
};

main();
