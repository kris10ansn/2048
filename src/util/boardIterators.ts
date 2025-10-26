import type { Direction } from "@/types/Direction";
import { range } from "@/util/range";

export const shouldReverseIterate = (direction: Direction) =>
    direction === "right" || direction === "down";

export const isHorizontal = (direction: Direction) =>
    direction === "left" || direction === "right";

export function* iterate2d(iterator: () => Generator<number>) {
    for (const y of iterator()) {
        for (const x of iterator()) {
            yield { x, y };
        }
    }
}

export const createBoardIterator = (size: number, direction: Direction) => {
    const iterator = shouldReverseIterate(direction)
        ? range.bind(null, size - 1, 0, -1)
        : range.bind(null, 0, size - 1, 1);

    return iterate2d.bind(null, iterator);
};

export const iterateFrom = (
    x: number,
    y: number,
    direction: Direction,
    size: number
) => {
    const reverse = shouldReverseIterate(direction);

    const delta = reverse ? 1 : -1;
    const from = (isHorizontal(direction) ? x : y) + delta;
    const to = reverse ? size - 1 : 0;

    return range(from, to, delta);
};
