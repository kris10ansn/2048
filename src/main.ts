import "./style.scss";
import constants, { type Direction } from "./constants";
import { fillBackground, fillBox, fillBoxText } from "./canvas";
import { createBoard, merge, slide } from "./board";

const match = <K, V>(key: K, cases: [K[], V][]): V | null => {
    for (const [keys, value] of cases) {
        if (keys.includes(key)) {
            return value;
        }
    }
    return null;
};

const main = () => {
    const canvas = document.querySelector("canvas#game") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (ctx == null) {
        throw new Error("Canvas context is null!");
    }

    const board = createBoard(constants.boardSize);
    board[2][1] = 1;
    board[2][2] = 2;
    board[1][0] = 3;
    board[1][3] = 3;
    board[0][0] = 5;
    board[0][1] = 5;
    board[0][2] = 5;
    board[0][3] = 5;

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
                if (board[y][x] > 0) {
                    fillBox(ctx, x, y, "#eee");
                    fillBoxText(ctx, x, y, board[y][x].toString());
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
