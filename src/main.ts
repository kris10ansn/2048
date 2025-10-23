import { createHtmlElement, setDataAttributes } from "./dom";
import "./style.scss";

type Point = { x: number; y: number };

class Board {
    private static SIZE = 4;

    private tiles: Element[] = new Array(Board.SIZE);

    public constructor(private root: Node) {
        this.addTile({ x: 2, y: 2 }, 2);
        this.addTile({ x: 1, y: 1 }, 2);

        setTimeout(() => {
            this.moveTile({ x: 2, y: 2 }, { x: 0, y: 2 });
        }, 1000);
        setTimeout(() => {
            this.addTile({ x: 3, y: 3 }, 5);
        }, 2000);
    }

    private toIndex(point: Point) {
        return point.y * Board.SIZE + point.x;
    }

    private removeTile(point: Point) {
        delete this.tiles[this.toIndex(point)];
    }

    private addTile(point: Point, value: number) {
        const element = createHtmlElement("div", {
            className: "tile",
            textContent: value.toString(),
            data: { x: point.x, y: point.x },
        });

        this.tiles[this.toIndex(point)] = element;
        this.root.appendChild(element);
    }

    private getTile(point: Point) {
        return this.tiles[this.toIndex(point)];
    }

    private moveTile(from: Point, to: Point) {
        const tile = this.getTile(from);
        setDataAttributes(tile, { ...to });

        this.removeTile(from);
        this.tiles[this.toIndex(to)] = tile;
    }
}

const main = () => {
    const root = document.querySelector("div#board");

    if (root === null) {
        throw new Error("Root element not found!");
    }

    const board = new Board(root);
};

main();
