import { createHtmlElement, setDataAttributes } from "../dom";
import { Matrix } from "../util/Matrix";
import type { IBoardHandler } from "./IBoardHandler";
import type { Point } from "../types/Point";

export class HTMLBoardHandler implements IBoardHandler {
    private tiles: Matrix<HTMLElement>;
    private mergingTiles: Matrix<HTMLElement>;

    public constructor(private root: Node, size: number) {
        this.tiles = new Matrix<HTMLElement>(size);
        this.mergingTiles = new Matrix<HTMLElement>(size);
    }

    public addTile(point: Point, value: number) {
        const element = createHtmlElement("div", {
            className: "tile",
            textContent: value.toString(),
            data: { x: point.x, y: point.y },
        });

        this.tiles.set(point, element);
        this.root.appendChild(element);
    }

    public getTile(point: Point) {
        const tile = this.tiles.get(point);
        return tile ? this.getTileValue(tile) : null;
    }

    public mergeTile(point1: Point, point2: Point): void {
        const tile1 = this.tiles.get(point1);
        const tile2 = this.tiles.get(point2);

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

        // Remove tile1 from internal state and move its element into point2
        this.tiles.delete(point1);
        this.repositionTile(tile1, point2);
        this.mergingTiles.set(point2, tile1);

        // Remove the tile1 element after the merge animation is complete
        setTimeout(() => {
            const mergingTilesIndex = this.mergingTiles.data.findIndex(
                (tile) => tile === tile1
            );
            this.mergingTiles.deleteIndex(mergingTilesIndex);

            tile1.remove();
            tile2.classList.remove("merged");
        }, Number(import.meta.env.VITE_ANIMATION_MERGE_DURATION) + 1);
    }

    public moveTile(from: Point, to: Point) {
        const tile = this.tiles.get(from);

        if (!tile) {
            throw new Error(`No tile found at position (${from.x}, ${from.y})`);
        }

        this.repositionTile(tile, to);
        this.tiles.delete(from);
        this.tiles.set(to, tile);

        // If there is a tile being merged into this tile, move it as well
        const mergingTile = this.mergingTiles.get(from);
        if (mergingTile) this.repositionTile(mergingTile, to);
    }

    private repositionTile(tile: HTMLElement, to: Point) {
        setDataAttributes(tile, { ...to });
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
}
