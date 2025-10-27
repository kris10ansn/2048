import type { IBoardHandler } from "@/board-handlers/IBoardHandler";
import type { Point } from "@/types/Point";
import { createHtmlElement, setDataAttributes } from "@/util/dom";
import { Matrix } from "@/util/Matrix";

export class HTMLBoardHandler implements IBoardHandler {
    private tiles: Matrix<HTMLElement>;
    private mergingTiles: Matrix<HTMLElement>;

    public constructor(
        private root: Node,
        size: number,
    ) {
        this.tiles = new Matrix<HTMLElement>(size);
        this.mergingTiles = new Matrix<HTMLElement>(size);
    }

    public addTile(point: Point, value: number) {
        const element = createHtmlElement("div", {
            className: "tile",
            textContent: value.toString(),
            data: { x: point.x, y: point.y, value },
        });

        this.tiles.set(point, element);
        this.root.appendChild(element);
    }

    public getTile(point: Point) {
        const tile = this.tiles.get(point);
        return tile ? this.getTileValue(tile) : null;
    }

    public mergeTile(from: Point, to: Point): void {
        const subject = this.tiles.get(from);
        const target = this.tiles.get(to);

        if (!subject || !target) {
            const json = JSON.stringify({ from, to, subject, target });
            throw new Error(`No tile found at position ` + json);
        }

        const sum = this.getTileValue(subject) + this.getTileValue(target);
        this.setTileValue(target, sum);

        target.classList.add("merge-target");

        this.tiles.delete(from);
        this.repositionTile(subject, to);
        this.mergingTiles.set(to, subject);
        subject.classList.add("merge-subject");

        const cleanup = () => {
            this.mergingTiles.deleteIndex(
                this.mergingTiles.data.findIndex((tile) => tile === subject),
            );

            subject.remove();
            target.classList.remove("merge-target");
        };

        setTimeout(
            cleanup,
            Number(import.meta.env.VITE_ANIMATION_MERGE_DURATION) + 1,
        );
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
        const value = parseInt(tile.getAttribute("data-value") ?? "-");

        if (isNaN(value)) {
            throw new Error(`Tile content is not a number ${tile.textContent}`);
        }

        return value;
    }

    private setTileValue(tile: HTMLElement, value: number) {
        tile.textContent = value.toString();
        setDataAttributes(tile, { value });
    }
}
