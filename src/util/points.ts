import type { Direction } from "../types/Direction";
import type { Point } from "../types/Point";

export const directionVectors: Record<Direction, Point> = {
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
};

export const addPoints = (p1: Point, p2: Point): Point => ({
    x: p1.x + p2.x,
    y: p1.y + p2.y,
});

export const multPoint = (point: Point, scalar: number): Point => ({
    x: point.x * scalar,
    y: point.y * scalar,
});
