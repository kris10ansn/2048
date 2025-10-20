import "./style.scss";
import constants, { type Direction } from "./constants";
import { fillBackground, fillBox, fillBoxText } from "./canvas";
import { range } from "./util/range";

const createBoard = (size: number): number[][] => {
    return new Array(size).fill(null).map(() => new Array(size).fill(0));
};

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

    if (ctx === null) {
        throw new Error("Canvas context is null!");
    }

    const board = createBoard(constants.boardSize);
    board[2][1] = 1;
    board[2][2] = 2;
    board[1][2] = 3;

    const reverseRange = range.bind(null, constants.boardSize - 1, 0, -1);
    const forwardRange = range.bind(null, 0, constants.boardSize - 1, 1);

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

        // Reverse iteration if right or down
        const reverse = ["right", "down"].includes(direction);
        const horizontal = ["right", "left"].includes(direction);

        const iterator = reverse ? reverseRange : forwardRange;

        for (const y of iterator()) {
            for (const x of iterator()) {
                if (board[y][x] === 0) continue;

                for (const i of iterator()) {
                    const xx = horizontal ? i : x;
                    const yy = horizontal ? y : i;

                    if (board[yy][xx] === 0) {
                        board[yy][xx] = board[y][x];
                        board[y][x] = 0;
                        break;
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
            }
        }

        requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
};

main();
