import type { BoardHandler } from "../board";

export const runDemo = (board: BoardHandler) => {
    board.addTile({ x: 2, y: 2 }, 2);
    board.addTile({ x: 2, y: 1 }, 5);
    board.addTile({ x: 1, y: 1 }, 2);

    setTimeout(() => {
        board.mergeTile({ x: 1, y: 1 }, { x: 2, y: 1 });
    }, 2000);
};
