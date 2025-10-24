import type { Direction } from "./types/Direction";

const constants = {
    boardSize: 4,

    keyMap: {
        left: ["a", "arrowleft", "h"],
        right: ["d", "arrowright", "l"],
        up: ["w", "arrowup", "k"],
        down: ["s", "arrowdown", "j"],
    } as Record<Direction, string[]>,
};

export default constants;
