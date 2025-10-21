export type Direction = "up" | "right" | "left" | "down";

const constants = {
    boardSize: 4,
    canvasSize: 960,

    keyMap: {
        left: ["a", "arrowleft", "h"],
        right: ["d", "arrowright", "l"],
        up: ["w", "arrowup", "k"],
        down: ["s", "arrowdown", "j"],
    } as Record<Direction, string[]>,
};

export default constants;
