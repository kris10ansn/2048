import type { IBoardHandler } from "@/board-handlers/IBoardHandler";
import type { Point } from "@/types/Point";
import { createHtmlElement, setDataAttributes } from "@/util/dom";
import { Matrix } from "@/util/Matrix";
import constants from "../constants";

export class HTMLBoardHandler implements IBoardHandler {
    private tiles: Matrix<HTMLElement>;
    private mergingTiles: Matrix<HTMLElement>;

    public constructor(
        private root: Element,
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

        element.animate(...constants.animations.appear);
    }

    public removeTile(point: Point): void {
        const tile = this.tiles.get(point);

        if (!tile) {
            return;
        }

        this.tiles.delete(point);
        tile.animate(...constants.animations.disappear).finished.then(() => {
            tile.remove();
        });
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

        this.tiles.delete(from);
        this.repositionTile(subject, to);
        this.mergingTiles.set(to, subject);

        target.style.zIndex = "10";
        subject.style.zIndex = "1";

        target.animate(...constants.animations.bounce).finished.then(() => {
            this.mergingTiles.deleteIndex(
                this.mergingTiles.data.findIndex((tile) => tile === subject),
            );

            subject.remove();
            target.style.zIndex = "";
        });
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

    public lose() {
        this.root.classList.add("game-over");
    }

    public unLose() {
        this.root.classList.remove("game-over");
    }

    public updateScore(score: number): void {
        const element = document.getElementById("score")!;
        element.textContent = score.toString();

        element.animate(...constants.animations.bounce);
    }

    public updateHighScore(highScore: number): void {
        const element = document.getElementById("high-score")!;
        element.textContent = highScore.toString();

        element.animate(...constants.animations.bounce);
    }

    public highlightNewHighScore(noAnimate?: boolean) {
        const element = document.getElementById("scores")!;

        if (noAnimate) element.classList.add("no-animate");

        element.classList.add("new-highscore");
    }

    public unHighlightNewHighScore(): void {
        const element = document.getElementById("scores")!;
        element.classList.remove("new-highscore");
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
