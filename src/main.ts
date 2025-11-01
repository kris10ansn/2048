import "./style.scss";

import { HTMLBoardHandler } from "@/board-handlers/HTMLBoardHandler";
import constants from "@/constants";
import { Game } from "@/Game";
import type { Direction } from "@/types/Direction";
import { match } from "@/util/match";
import {
    type GameState,
    loadGameState,
    removeBoardState,
    saveGameState,
} from "./state";
import { ChromeStorageHandler } from "./storage-handlers/ChromeStorageHandler";
import { LocalStorageHandler } from "./storage-handlers/LocalStorageHandler";
import { wait } from "./util/wait";

const main = () => {
    const root = document.querySelector("div#board");
    const buttonNewGame = document.querySelector("#new-game-button");

    if (root === null || buttonNewGame === null) {
        const elements = { root, buttonNewGame };
        throw new Error("Missing elements! " + JSON.stringify(elements));
    }

    const board = new HTMLBoardHandler(root, constants.numbers.boardSize);

    const game = new Game(board, constants.numbers.boardSize);
    const gameStorage = ChromeStorageHandler.isAvailable()
        ? new ChromeStorageHandler<GameState>("sync")
        : new LocalStorageHandler<GameState>();

    loadGameState(game, gameStorage);

    game.events.addEventListener("did-slide", () => {
        saveGameState(game, gameStorage);
    });

    game.events.addEventListener("did-lose", async () => {
        await wait(constants.numbers.tileTransitionDuration);

        removeBoardState(gameStorage);
        alert("Game over!");
    });

    buttonNewGame.addEventListener("click", () => {
        game.reset();
        saveGameState(game, gameStorage);
    });

    window.addEventListener("keydown", (event) => {
        const direction = match<string, Direction>(event.key.toLowerCase(), [
            [constants.keyMap.left, "left"],
            [constants.keyMap.right, "right"],
            [constants.keyMap.up, "up"],
            [constants.keyMap.down, "down"],
        ]);

        if (direction === null) {
            return;
        }

        game.slide(direction);
    });
};

main();
