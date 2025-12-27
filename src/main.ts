import "./style.scss";

import { HTMLBoardHandler } from "@/board-handlers/HTMLBoardHandler";
import constants from "@/constants";
import { Game } from "@/Game";
import type { Direction } from "@/types/Direction";
import { updateBrowserIcon } from "@/util/generateTileImage";
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
    const boardSizeSelect = document.querySelector(
        "#board-size-select",
    ) as HTMLSelectElement;

    if (root === null || buttonNewGame === null || boardSizeSelect === null) {
        const elements = { root, buttonNewGame, boardSizeSelect };
        throw new Error("Missing elements! " + JSON.stringify(elements));
    }

    const board = new HTMLBoardHandler(root, constants.numbers.boardSize);
    const game = new Game(board);

    const gameStorage = new ObfuscatedStorageHandler<GameState>(
        ChromeStorageHandler.isAvailable()
            ? new ChromeStorageHandler<Record<string, string>>("local")
            : new LocalStorageHandler<Record<string, string>>(),
        {
            obfuscate: (data) => btoa(data),
            deObfuscate: (data) => atob(data),
        },
    );

    loadGameState(game, gameStorage);

    gameStorage
        .load("boardSize")
        .then((size) => (boardSizeSelect.value = (size ?? 4).toString()));

    game.events.addEventListener("did-slide", () => {
        saveGameState(game, gameStorage);
        updateBrowserIcon(game);
    });

    game.events.addEventListener("did-lose", async () => {
        removeBoardState(gameStorage);
    });

    buttonNewGame.addEventListener("click", () => {
        game.clear();
        game.boardHandler.setSize(parseInt(boardSizeSelect.value));
        game.setup();

        saveGameState(game, gameStorage);
        updateBrowserIcon(game);
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
