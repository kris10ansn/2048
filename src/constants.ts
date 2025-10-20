export type Direction = "up" | "right" | "left" | "down";

const constants = {
    boardSize: 4,
    canvasSize: 960,

    keyMap: {
        left: ["a", "arrowleft"],
        right: ["d", "arrowright"],
        up: ["w", "arrowup"],
        down: ["s", "arrowdown"],
    } as Record<Direction, string[]>,
};

export default constants;
