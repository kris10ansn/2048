import {
    createBoardIterator,
    iterateFrom,
    isHorizontal,
} from "./util/boardIterators";
import type { IBoardHandler } from "./board-handlers/IBoardHandler";
import type { Point } from "./types/Point";
import type { Direction } from "./types/Direction";
import { addPoints, directionVectors, multPoint } from "./util/points";

export class Game {
    public constructor(
        private boardHandler: IBoardHandler,
        private size: number
    ) {}

    public start() {
        this.addRandomTile();
        this.addRandomTile();
    }

    public slide(direction: Direction) {
        // Shift tiles, merge and shift again
        this.shiftTiles(direction);
        this.doMerges(direction);
        this.shiftTiles(direction);

        // Add a new random tile
        this.addRandomTile();
    }

    private addRandomTile() {
        const emptyTiles: Point[] = [];

        const iterator = createBoardIterator(this.size, "right");
        for (const { x, y } of iterator()) {
            if (this.boardHandler.getTile({ x, y }) === null) {
                emptyTiles.push({ x, y });
            }
        }

        if (emptyTiles.length === 0) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * emptyTiles.length);
        const value = Math.random() < 0.9 ? 2 : 4;

        this.boardHandler.addTile(emptyTiles[randomIndex], value);
    }

    private shiftTiles(direction: Direction) {
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

    private doMerges(direction: Direction) {
        const iterator = createBoardIterator(this.size, direction);

        for (const { x, y } of iterator()) {
            const point = { x, y };
            const nextPoint = addPoints(
                point,
                multPoint(directionVectors[direction], -1)
            );

            const value = this.boardHandler.getTile(point);
            const nextValue = this.boardHandler.getTile(nextPoint);

            if (value === null || value !== nextValue) {
                continue;
            }

            this.boardHandler.mergeTile(nextPoint, point);
        }
    }
}
