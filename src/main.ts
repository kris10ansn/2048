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
    board[1][0] = 3;
    board[1][3] = 3;
    board[0][0] = 5;
    board[0][1] = 5;
    board[0][2] = 5;
    board[0][3] = 5;

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

        // Slide
        for (const y of iterator()) {
            for (const x of iterator()) {
                if (board[y][x] === 0) continue;

                // Loop from the current x/y to the edge of the board
                const delta = reverse ? 1 : -1;
                const from = (horizontal ? x : y) + delta;
                const to = reverse ? constants.boardSize - 1 : 0;

                let [toX, toY] = [x, y];

                // Find furthest 0 with no numbers inbetween
                for (const i of range(from, to, delta)) {
                    const [xx, yy] = horizontal ? [i, y] : [x, i];

                    if (board[yy][xx] === 0) {
                        [toX, toY] = [xx, yy];
                    } else {
                        break;
                    }
                }

                // Move to new location if open tile was found
                if (x !== toX || y !== toY) {
                    board[toY][toX] = board[y][x];
                    board[y][x] = 0;
                }
            }
        }

        // Merge
        const [dx, dy] = {
            left: [1, 0],
            right: [-1, 0],
            up: [0, 1],
            down: [0, -1],
        }[direction];

        for (const y of iterator()) {
            for (const x of iterator()) {
                if (board[y][x] === 0) continue;

                const xx = x + dx;
                const yy = y + dy;

                if (board[y][x] === board[yy][xx]) {
                    board[y][x] += board[yy][xx];
                    board[yy][xx] = 0;
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
