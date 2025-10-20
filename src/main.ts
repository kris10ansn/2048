import "./style.scss";
import constants from "./constants";
import { fillBackground, fillBox, fillBoxText } from "./canvas";

const createBoard = (size: number): number[][] => {
    return new Array(size).fill(null).map(() => new Array(size).fill(0));
};

const main = () => {
    const canvas = document.querySelector("canvas#game") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (ctx === null) {
        throw new Error("Canvas context is null!");
    }

    const board = createBoard(constants.boardSize);
    board[1][1] = 2;
    board[1][2] = 2;

    window.addEventListener("keydown", (event) => {
        const left = constants.keyMap.left.includes(event.key.toLowerCase());
        const right = constants.keyMap.right.includes(event.key.toLowerCase());
        const up = constants.keyMap.up.includes(event.key.toLowerCase());
        const down = constants.keyMap.down.includes(event.key.toLowerCase());

        if (left) {
            for (let y = 0; y < constants.boardSize; y++) {
                for (let x = 1; x < constants.boardSize; x++) {
                    if (board[y][x] > 0) {
                        for (let i = 0; i < x; i++) {
                            if (board[y][i] == 0) {
                                board[y][i] = board[y][x];
                                board[y][x] = 0;
                                break;
                            }
                        }
                    }
                }
            }
        }
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

                // strokeBoxDebugLines(ctx, x, y);
            }
        }

        requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
};

main();
