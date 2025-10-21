import "./style.scss";

class Board {
    private static SIZE = 4;
    private boxes: Node[][];

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

        const box = this.boxes[2][2];
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.textContent = "2";
        box.appendChild(tile);
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
