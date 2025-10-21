import "./style.scss";

class Board {
    private static SIZE = 4;
    private boxes: Node[][];

    private addTile(x: number, y: number, value: number) {
        const box = this.boxes[y][x];

        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.textContent = value.toString();

        box.appendChild(tile);
    }

    public constructor(private root: Node) {
        this.boxes = [];

        for (let y = 0; y < Board.SIZE; y++) {
            this.boxes[y] = [];

            const row = document.createElement("div");
            row.classList.add("row");

            for (let x = 0; x < Board.SIZE; x++) {
                const box = document.createElement("div");
                box.classList.add("box");

                this.boxes[y][x] = box;
                row.appendChild(box);
            }

            this.root.appendChild(row);
        }

        this.addTile(2, 2, 2);
        this.addTile(1, 1, 2);
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
