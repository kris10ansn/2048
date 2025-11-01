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
import { ObfuscatedStorageHandler } from "./storage-handlers/ObfuscatedStorageHandler";

const main = () => {
    const root = document.querySelector("div#board");
    const buttonNewGame = document.querySelector("#new-game-button");

    if (root === null || buttonNewGame === null) {
        const elements = { root, buttonNewGame };
        throw new Error("Missing elements! " + JSON.stringify(elements));
    }

    const board = new HTMLBoardHandler(root, constants.numbers.boardSize);

    const game = new Game(board, constants.numbers.boardSize);
    const gameStorage = new ObfuscatedStorageHandler<GameState>(
        ChromeStorageHandler.isAvailable()
            ? new ChromeStorageHandler<Record<string, string>>("sync")
            : new LocalStorageHandler<Record<string, string>>(),
        {
            obfuscate: (data) => btoa(data),
            deObfuscate: (data) => atob(data),
        },
    );

    loadGameState(game, gameStorage);

    game.events.addEventListener("did-slide", () => {
        saveGameState(game, gameStorage);
    });

    game.events.addEventListener("did-lose", async () => {
        removeBoardState(gameStorage);
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
