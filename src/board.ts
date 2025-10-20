import type { Direction } from "./constants";
import constants from "./constants";
import { range } from "./util/range";

export const createBoard = (size: number): number[][] => {
    return new Array(size).fill(null).map(() => new Array(size).fill(0));
};

export const isHorizontal = (direction: Direction) =>
    direction === "right" || direction === "left";

const shouldReverseIterate = (direction: Direction) =>
    direction === "right" || direction === "down";

const iterate = (direction: Direction) =>
    shouldReverseIterate(direction)
        ? range(constants.boardSize - 1, 0, -1)
        : range(0, constants.boardSize - 1, 1);

const iterateFrom = (x: number, y: number, direction: Direction) => {
    const reverse = shouldReverseIterate(direction);

    const delta = reverse ? 1 : -1;
    const from = (isHorizontal(direction) ? x : y) + delta;
    const to = reverse ? constants.boardSize - 1 : 0;

    return range(from, to, delta);
};

export const slide = (board: number[][], direction: Direction) => {
    for (const y of iterate(direction)) {
        for (const x of iterate(direction)) {
            if (board[y][x] === 0) continue;

            let [toX, toY] = [x, y];

            // Find furthest 0 with no numbers inbetween
            for (const i of iterateFrom(x, y, direction)) {
                const [xx, yy] = isHorizontal(direction) ? [i, y] : [x, i];

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

const deltas: Record<Direction, [number, number]> = {
    left: [1, 0],
    right: [-1, 0],
    up: [0, 1],
    down: [0, -1],
};

export const merge = (board: number[][], direction: Direction) => {
    const [dx, dy] = deltas[direction];

    for (const y of iterate(direction)) {
        for (const x of iterate(direction)) {
            if (board[y][x] === 0) continue;
            const [xx, yy] = [x + dx, y + dy];

            if (board[y][x] === board[yy][xx]) {
                board[y][x] += board[yy][xx];
                board[yy][xx] = 0;
            }
        }
    }
};
