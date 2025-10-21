import "./style.scss";

type Point = { x: number; y: number };

const setData = (element: HTMLElement, data: Record<string, any>) => {
    for (const [key, value] of Object.entries(data)) {
        element.setAttribute(`data-${key}`, value.toString());
    }
};

const createElement = <T extends keyof HTMLElementTagNameMap>(
    tag: T,
    attributes: Partial<HTMLElementTagNameMap[T]> & {
        data?: Record<string, any>;
    }
) => {
    const element = document.createElement(tag);
    const { data } = attributes;
    delete attributes.data;

    Object.assign(element, attributes);
    if (data) setData(element, data);

    return element;
};

class Board {
    private static SIZE = 4;

    private tiles: HTMLElement[] = new Array(Board.SIZE);

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
        const element = createElement("div", {
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
        setData(tile, { ...to });

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
