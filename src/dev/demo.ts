import type { IBoardHandler } from "../board-handlers/IBoardHandler";
import type { Game } from "../Game";

export const runDemo = (board: IBoardHandler, game: Game) => {
    board.addTile({ x: 0, y: 3 }, 2);
    board.addTile({ x: 1, y: 3 }, 2);
    board.addTile({ x: 2, y: 3 }, 2);
    board.addTile({ x: 3, y: 3 }, 2);
};
