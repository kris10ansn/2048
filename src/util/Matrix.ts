import type { Point } from "../types/Point";

export class Matrix<T> {
    private data: T[];

    public constructor(private size: number) {
        this.data = new Array(size * size);
    }

    public get(point: Point): T | undefined {
        return this.data[this.toIndex(point)];
    }

    public set(point: Point, value: T) {
        this.data[this.toIndex(point)] = value;
    }

    public delete(point: Point) {
        delete this.data[this.toIndex(point)];
    }

    private toIndex(point: Point) {
        return point.y * this.size + point.x;
    }
}
