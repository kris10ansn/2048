import type { Point } from "../types/Point";

export class Matrix<T> {
    public readonly data: T[];

    public constructor(private size: number) {
        this.data = new Array(size * size);
    }

    public get(point: Point): T | undefined {
        return this.getIndex(this.toIndex(point));
    }

    public set(point: Point, value: T) {
        this.setIndex(this.toIndex(point), value);
    }

    public delete(point: Point) {
        this.deleteIndex(this.toIndex(point));
    }

    public getIndex(index: number): T | undefined {
        return this.data[index];
    }

    public setIndex(index: number, value: T) {
        this.data[index] = value;
    }

    public deleteIndex(index: number) {
        delete this.data[index];
    }

    private toIndex(point: Point) {
        if (
            point.x < 0 ||
            point.x >= this.size ||
            point.y < 0 ||
            point.y >= this.size
        ) {
            throw new Error(`Point out of bounds: ${JSON.stringify(point)}`);
        }

        return point.y * this.size + point.x;
    }
}
