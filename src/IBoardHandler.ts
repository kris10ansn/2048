import type { Point } from "./board";

export interface IBoardHandler {
    addTile(point: Point, value: number): void;
    getTile(point: Point): number | null;
    mergeTile(point1: Point, point2: Point): void;
    moveTile(from: Point, to: Point): void;
}
