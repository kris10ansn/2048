import { getCssVariable } from "@/util/dom";

export const generateTileImage = (value: number, size: number): ImageData => {
    const canvas = new OffscreenCanvas(size, size);
    const context = canvas.getContext("2d")!;

    const color =
        getCssVariable(`--color-tile-${value}`) ??
        getCssVariable("--color-tile-max");

    context.fillStyle = color;
    context.beginPath();
    context.roundRect(0, 0, size, size, 0.15 * size);
    context.fill();

    context.fillStyle =
        value <= 4
            ? getCssVariable("--color-text-dark")
            : getCssVariable("--color-text-light");

    const fontSize = (0.8 - value.toString().length * 0.1) * size;
    context.font = `bold ${fontSize}px Arial, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";

    const textX = size / 2;
    const textY = (size / 2) * 1.05;

    context.fillText(value.toString(), textX, textY);

    return context.getImageData(0, 0, size, size);
};
