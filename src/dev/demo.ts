import type { IBoardHandler } from "@/board-handlers/IBoardHandler";
import type { Game } from "@/Game";

export const runDemo = (board: IBoardHandler, game: Game) => {
    game.setup();
};
