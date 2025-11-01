import type { Direction } from "@/types/Direction";

const constants = {
    numbers: {
        boardSize: 4,
        tileTransitionDuration: import.meta.env.VITE_TILE_TRANSITION_DURATION,
    },

    keyMap: {
        left: ["a", "arrowleft", "h"],
        right: ["d", "arrowright", "l"],
        up: ["w", "arrowup", "k"],
        down: ["s", "arrowdown", "j"],
    } as Record<Direction, string[]>,

    animations: {
        bounce: [
            [
                { transform: "scale(1)" },
                { transform: "scale(1.2)" },
                { transform: "scale(1)" },
            ],
            {
                duration: 300,
                easing: "ease",
                iterations: 1,
            },
        ],

        appear: [
            [{ transform: "scale(0)" }, { transform: "scale(1)" }],
            { duration: 200, easing: "ease", iterations: 1 },
        ],
        disappear: [
            [{ transform: "scale(1)" }, { transform: "scale(0)" }],
            { duration: 200, easing: "ease", iterations: 1 },
        ],
    } as Record<string, Parameters<Element["animate"]>>,
};

export default constants;
