import type { Direction } from "./constants";
import constants from "./constants";
import { range } from "./util/range";

export const createBoard = (size: number): number[][] => {
    return new Array(size).fill(null).map(() => new Array(size).fill(0));
};

const reverseRange = range.bind(null, constants.boardSize - 1, 0, -1);
const forwardRange = range.bind(null, 0, constants.boardSize - 1, 1);

export const slide = (board: number[][], direction: Direction) => {
    // Reverse iteration if right or down
    const reverse = ["right", "down"].includes(direction);
    const horizontal = ["right", "left"].includes(direction);
    const iterator = reverse ? reverseRange : forwardRange;

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
};

export const merge = (board: number[][], direction: Direction) => {
    // Reverse iteration if right or down
    const reverse = ["right", "down"].includes(direction);
    const iterator = reverse ? reverseRange : forwardRange;

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
            const [xx, yy] = [x + dx, y + dy];

            if (board[y][x] === board[yy][xx]) {
                board[y][x] += board[yy][xx];
                board[yy][xx] = 0;
            }
        }
    }
};
