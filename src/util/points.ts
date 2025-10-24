import type { Point } from "../types/Point";

export const addPoints = (p1: Point, p2: Point): Point => ({
    x: p1.x + p2.x,
    y: p1.y + p2.y,
});
