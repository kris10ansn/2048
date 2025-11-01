import type { Point } from "@/types/Point";

export interface IBoardHandler {
    addTile(point: Point, value: number): void;
    removeTile(point: Point): void;
    getTile(point: Point): number | null;
    mergeTile(point1: Point, point2: Point): void;
    moveTile(from: Point, to: Point): void;

    updateScore(score: number): void;
    updateHighScore(highScore: number): void;

    highlightNewHighScore(noAnimate?: boolean): void;
    unHighlightNewHighScore(): void;

    lose(): void;
    unLose(): void;
}
