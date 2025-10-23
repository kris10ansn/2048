import { createHtmlElement, setDataAttributes } from "./dom";

export type Point = { x: number; y: number };

export interface BoardHandler {
    addTile(point: Point, value: number): void;
    getTile(point: Point): number | null;
    mergeTile(point1: Point, point2: Point): void;
    moveTile(from: Point, to: Point): void;
}

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
        const tile = this.getTileElement(point);
        return tile ? this.getTileValue(tile) : null;
    }

    public mergeTile(point1: Point, point2: Point): void {
        throw new Error("Method not implemented.");
    }

    public moveTile(from: Point, to: Point) {
        const tile = this.getTileElement(from);

        if (!tile) {
            throw new Error(`No tile found at position (${from.x}, ${from.y})`);
        }

        setDataAttributes(tile, { ...to });

        this.removeTile(from);
        this.setTileElement(to, tile);
    }

    private removeTile(point: Point) {
        delete this.tiles[this.toIndex(point)];
    }

    private getTileElement(point: Point): HTMLElement | undefined {
        return this.tiles[this.toIndex(point)];
    }

    private setTileElement(point: Point, element: HTMLElement) {
        this.tiles[this.toIndex(point)] = element;
    }

    private getTileValue(tile: HTMLElement): number {
        const value = parseInt(tile.textContent);

        if (isNaN(value)) {
            throw new Error(`Tile content is not a number ${tile.textContent}`);
        }

        return value;
    }

    private toIndex(point: Point) {
        return point.y * this.size + point.x;
    }
}
