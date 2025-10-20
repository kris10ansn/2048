import "./style.scss";
import constants from "./constants";
import { fillBackground, fillBox, fillBoxText } from "./canvas";

const createBoard = (size: number): number[][] => {
    return new Array(size).fill(null).map(() => new Array(size).fill(0));
};

const match = <K, V>(key: K, cases: [K[], V][]): V | null => {
    for (const [keys, value] of cases) {
        if (keys.includes(key)) {
            return value;
        }
    }

    return null;
};

const main = () => {
    const canvas = document.querySelector("canvas#game") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (ctx === null) {
        throw new Error("Canvas context is null!");
    }

    const board = createBoard(constants.boardSize);
    board[2][1] = 1;
    board[2][2] = 2;
    board[1][2] = 3;

    window.addEventListener("keydown", (event) => {
        const direction = match(event.key.toLowerCase(), [
            [constants.keyMap.left, "left"],
            [constants.keyMap.right, "right"],
            [constants.keyMap.up, "up"],
            [constants.keyMap.down, "down"],
        ]);

        if (direction == null) {
            return;
        }

        for (let i = 0; i < constants.boardSize; i++) {
            for (let j = 0; j < constants.boardSize; j++) {
                const y = match(direction, [
                    [["left", "right"], i],
                    [["up"], j],
                    [["down"], constants.boardSize - 1 - j],
                ])!;

                const x = match(direction, [
                    [["left"], j],
                    [["right"], constants.boardSize - 1 - j],
                    [["up", "down"], i],
                ])!;

                if (board[y][x] > 0) {
                    const limit = match(direction, [
                        [["left"], x],
                        [["right"], constants.boardSize - 1 - x],
                        [["up"], y],
                        [["down"], constants.boardSize - 1 - y],
                    ])!;

                    for (let k = 0; k < limit; k++) {
                        const yy = match(direction, [
                            [["left", "right"], y],
                            [["up"], k],
                            [["down"], constants.boardSize - 1 - k],
                        ])!;

                        const xx = match(direction, [
                            [["left"], k],
                            [["right"], constants.boardSize - 1 - k],
                            [["up", "down"], x],
                        ])!;

                        if (board[yy][xx] == 0) {
                            board[yy][xx] = board[y][x];
                            board[y][x] = 0;
                            break;
                        }
                    }
                }
            }
        }
    });

    const loop = (_time: DOMHighResTimeStamp) => {
        fillBackground(ctx, "#ccc");

        for (let y = 0; y < constants.boardSize; y++) {
            for (let x = 0; x < constants.boardSize; x++) {
                if (board[y][x] > 0) {
                    fillBox(ctx, x, y, "#eee");
                    fillBoxText(ctx, x, y, board[y][x].toString());
                } else {
                    fillBox(ctx, x, y, "#ddd");
                }

                // strokeBoxDebugLines(ctx, x, y);
            }
        }

        requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
};

main();
