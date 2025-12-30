import type { Game } from "@/Game";
import { buildFont, getCssVariable } from "@/util/css";

const getTileColor = (value: number): string => {
    return (
        getCssVariable(`--color-tile-${value}`) ??
        getCssVariable("--color-tile-max")
    );
};

export const generateTileImage = (value: number, size: number): ImageData => {
    const fontProps = { family: "Arial, sans-serif", weight: "bold" };

    const cssColorTextDark = getCssVariable("--color-text-dark");
    const cssColorTextLight = getCssVariable("--color-text-light");

    const canvas = new OffscreenCanvas(size, size);
    const context = canvas.getContext("2d")!;

    const color = getTileColor(value);

    context.fillStyle = color;
    context.beginPath();
    context.roundRect(0, 0, size, size, 0.15 * size);
    context.fill();

    // Magic font size formula
    const fontSize = (0.8 - String(value).length * 0.1) * size;
    context.font = buildFont({ size: fontSize, ...fontProps });

    context.textAlign = "center";
    context.textBaseline = "middle";

    const textX = size / 2;
    const textY = (size / 2) * 1.05;

    context.fillStyle = value <= 4 ? cssColorTextDark : cssColorTextLight;

    context.fillText(value.toString(), textX, textY);

    return context.getImageData(0, 0, size, size);
};

export const updateBrowserIcon = (game: Game) => {
    if ("chrome" in globalThis && "action" in chrome) {
        return chrome.action.setIcon({
            imageData: generateTileImage(game.getHighestTile(), 128),
        });
    }

    return Promise.resolve();
};
