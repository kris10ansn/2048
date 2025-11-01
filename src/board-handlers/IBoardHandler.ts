import type { Point } from "@/types/Point";

export type HighlightNewHighScoreOptions = Partial<{
    noAnimate: boolean;
}>;

export const defaultHNHSOptions: HighlightNewHighScoreOptions = {
    noAnimate: false,
};

export interface IBoardHandler {
    addTile(point: Point, value: number): void;
    removeTile(point: Point): void;
    getTile(point: Point): number | null;
    mergeTile(point1: Point, point2: Point): void;
    moveTile(from: Point, to: Point): void;

    updateScore(score: number): void;
    updateHighScore(highScore: number): void;

    highlightNewHighScore(options?: HighlightNewHighScoreOptions): void;
    unHighlightNewHighScore(): void;

    lose(): void;
    unLose(): void;
}
