import type { Game } from "@/Game";
import { getCssVariable } from "@/util/dom";

const getTileColor = (value: number): string => {
    return (
        getCssVariable(`--color-tile-${value}`) ??
        getCssVariable("--color-tile-max")
    );
};

export const generateTileImage = (value: number, size: number): ImageData => {
    const cssColorTextDark = getCssVariable("--color-text-dark");
    const cssColorTextLight = getCssVariable("--color-text-light");

    const canvas = new OffscreenCanvas(size, size);
    const context = canvas.getContext("2d")!;

    const color = getTileColor(value);

    context.fillStyle = color;
    context.beginPath();
    context.roundRect(0, 0, size, size, 0.15 * size);
    context.fill();

    const fontSize = (0.8 - value.toString().length * 0.1) * size;
    context.font = `bold ${fontSize}px Arial, sans-serif`;
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
