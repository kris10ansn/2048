import type { IBoardHandler, Point } from "./board";
import {
    createBoardIterator,
    iterateFrom,
    isHorizontal,
} from "./boardIterators";
import type { Direction } from "./constants";

export class Game {
    public constructor(
        private boardHandler: IBoardHandler,
        private size: number
    ) {}

    public slide(direction: Direction) {
        const iterator = createBoardIterator(this.size, direction);

        for (const { x, y } of iterator()) {
            if (this.boardHandler.getTile({ x, y }) === null) {
                continue;
            }

            const destination: Point = { x, y };

            // Find furthest 0 with no numbers inbetween
            for (const i of iterateFrom(x, y, direction, this.size)) {
                const point = isHorizontal(direction)
                    ? { x: i, y }
                    : { x, y: i };

                if (this.boardHandler.getTile(point) !== null) {
                    break;
                }

                [destination.x, destination.y] = [point.x, point.y];
            }

            // Move to new location if open tile was found
            if (x !== destination.x || y !== destination.y) {
                this.boardHandler.moveTile({ x, y }, destination);
            }
        }
    }
}
