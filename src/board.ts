import { createHtmlElement, setDataAttributes } from "./dom";

export interface BoardHandler {
    addTile(point: Point, value: number): void;
    getTile(point: Point): number;
    mergeTile(point1: Point, point2: Point): void;
}

export type Point = { x: number; y: number };

export class HTMLBoardHandler implements BoardHandler {
    private tiles: HTMLElement[];

    public constructor(private root: Node, private size: number) {
        this.tiles = new Array(size * size);
    }

    public addTile(point: Point, value: number) {
        const element = createHtmlElement("div", {
            className: "tile",
            textContent: value.toString(),
            data: { x: point.x, y: point.x },
        });

        this.setTileElement(point, element);
        this.root.appendChild(element);
    }

    public getTile(point: Point) {
        return parseInt(this.getTileElement(point).textContent);
    }

    public mergeTile(point1: Point, point2: Point): void {
        throw new Error("Method not implemented.");
    }

    public moveTile(from: Point, to: Point) {
        const tile = this.getTileElement(from);
        setDataAttributes(tile, { ...to });

        this.removeTile(from);
        this.setTileElement(to, tile);
    }

    private removeTile(point: Point) {
        delete this.tiles[this.toIndex(point)];
    }

    private getTileElement(point: Point) {
        return this.tiles[this.toIndex(point)];
    }
    private setTileElement(point: Point, element: HTMLElement) {
        this.tiles[this.toIndex(point)] = element;
    }

    private toIndex(point: Point) {
        return point.y * this.size + point.x;
    }
}
