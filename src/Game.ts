import type { IBoardHandler } from "@/board-handlers/IBoardHandler";
import type { Direction } from "@/types/Direction";
import type { Point } from "@/types/Point";
import {
    createBoardIterator,
    isHorizontal,
    iterateFrom,
} from "@/util/boardIterators";
import { Matrix } from "@/util/Matrix";
import { addPoints, directionVectors, multPoint } from "@/util/points";

export class Game {
    private score = 0;
    private highScore = 0;

    public constructor(
        private boardHandler: IBoardHandler,
        private size: number,
    ) {}

    public setup() {
        this.addRandomTile();
        this.addRandomTile();
    }

    public slide(direction: Direction) {
        const didShift = this.shiftTiles(direction);
        const didMerge = this.doMerges(direction);

        if (!didShift && !didMerge) {
            return;
        }

        if (didMerge) {
            this.shiftTiles(direction);
        }

        // Add a new random tile
        this.addRandomTile();
    }

    private addRandomTile() {
        const emptyTiles: Point[] = [];

        const iterator = createBoardIterator(this.size);
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

    private shiftTiles(direction: Direction): boolean {
        const iterator = createBoardIterator(this.size, direction);

        let didShift = false;

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
                didShift = true;
            }
        }

        return didShift;
    }

    private doMerges(direction: Direction): boolean {
        const iterator = createBoardIterator(this.size, direction);

        let didMerge = false;

        for (const { x, y } of iterator()) {
            const point = { x, y };
            const nextPoint = addPoints(
                point,
                multPoint(directionVectors[direction], -1),
            );

            if (!Matrix.pointInBounds(nextPoint, this.size)) {
                continue;
            }

            const value = this.boardHandler.getTile(point);
            const nextValue = this.boardHandler.getTile(nextPoint);

            if (value === null || value !== nextValue) {
                continue;
            }

            this.boardHandler.mergeTile(nextPoint, point);
            didMerge = true;
            this.addScore(value + nextValue);
        }

        return didMerge;
    }

    public getScore(): number {
        return this.score;
    }

    public setScore(score: number): void {
        this.score = score;
        this.boardHandler.updateScore(score);

        if (this.score > this.highScore) {
            this.highScore = score;
            this.boardHandler.updateHighScore(this.highScore);
        }
    }

    public addScore(amount: number): void {
        this.setScore(this.getScore() + amount);
    }
}
