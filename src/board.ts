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
            data: { x: point.x, y: point.y },
        });

        this.setTileElement(point, element);
        this.root.appendChild(element);
    }

    public getTile(point: Point) {
        const tile = this.getTileElement(point);
        return tile ? this.getTileValue(tile) : null;
    }

    public mergeTile(point1: Point, point2: Point): void {
        const tile1 = this.getTileElement(point1);
        const tile2 = this.getTileElement(point2);

        if (!tile1 || !tile2) {
            const json = JSON.stringify({ point1, point2, tile1, tile2 });
            throw new Error(`No tile found at position ` + json);
        }

        this.setTileValue(
            tile2,
            this.getTileValue(tile1) + this.getTileValue(tile2)
        );

        // Add merged class for animation
        tile2.classList.add("merged");

        // Move tile1 into tile2's position and remove it from the tracked tiles
        this.moveTile(point1, point2);
        this.removeTile(point1);

        // Remove the tile1 element after the merge animation is complete
        setTimeout(() => {
            tile1.remove();
            tile2.classList.remove("merged");
        }, import.meta.env.VITE_ANIMATION_MERGE_DURATION + 1);
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

    private setTileValue(tile: HTMLElement, value: number) {
        tile.textContent = value.toString();
    }

    private toIndex(point: Point) {
        return point.y * this.size + point.x;
    }
}
