import "./style.scss";
import constants, { type Direction } from "./constants";
import { fillBackground, fillBox, fillBoxText } from "./canvas";
import { addTile, createBoard, merge, slide } from "./board";
import { match } from "./util/match";

const main = () => {
    const canvas = document.querySelector("canvas#game") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (ctx == null) {
        throw new Error("Canvas context is null!");
    }

    const board = createBoard(constants.boardSize);

    addTile(board, 2, 1, 1);
    addTile(board, 2, 2, 2);
    addTile(board, 1, 0, 3);
    addTile(board, 1, 3, 3);
    addTile(board, 0, 0, 5);
    addTile(board, 0, 1, 5);
    addTile(board, 0, 2, 5);
    addTile(board, 0, 3, 5);

    window.addEventListener("keydown", (event) => {
        const direction = match<string, Direction>(event.key.toLowerCase(), [
            [constants.keyMap.left, "left"],
            [constants.keyMap.right, "right"],
            [constants.keyMap.up, "up"],
            [constants.keyMap.down, "down"],
        ]);

        if (direction == null) {
            return;
        }

        slide(board, direction);
        merge(board, direction);
        slide(board, direction);
    });

    const loop = (_time: DOMHighResTimeStamp) => {
        fillBackground(ctx, "#ccc");

        for (let y = 0; y < constants.boardSize; y++) {
            for (let x = 0; x < constants.boardSize; x++) {
                const tile = board[y][x];

                if (tile !== null) {
                    fillBox(ctx, x, y, "#eee");
                    fillBoxText(ctx, x, y, tile.value.toString());
                } else {
                    fillBox(ctx, x, y, "#ddd");
                }
            }
        }

        requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
};

main();
