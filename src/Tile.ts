import type { Point } from "./util/Point";

export class Tile {
    private previous: Point | null = null;

    public constructor(private position: Point, public value: number) {}

    public move(to: Point) {
        if (this.previous == null) {
            this.previous = this.position;
        }
        this.position = to;
    }

    public get x() {
        return this.position.x;
    }
    public get y() {
        return this.position.y;
    }
}
