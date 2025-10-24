import type { IBoardHandler } from "../IBoardHandler";

export const runDemo = (board: IBoardHandler) => {
    board.addTile({ x: 2, y: 2 }, 2);
    board.addTile({ x: 2, y: 1 }, 4);
    board.addTile({ x: 1, y: 1 }, 2);
};
