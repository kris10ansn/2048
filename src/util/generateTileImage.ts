import { getCssVariable } from "@/util/dom";

export const generateTileImage = (value: number): ImageData => {
    const canvas = new OffscreenCanvas(512, 512);
    const context = canvas.getContext("2d")!;

    const color =
        getCssVariable(`--color-tile-${value}`) ??
        getCssVariable("--color-tile-max");

    context.fillStyle = color;
    context.beginPath();
    context.roundRect(0, 0, canvas.width, canvas.height, 0.05 * 512);
    context.fill();

    context.fillStyle =
        value <= 4
            ? getCssVariable("--color-text-dark")
            : getCssVariable("--color-text-light");

    const fontSize = value < 1024 ? 200 : 175;
    context.font = `bold ${fontSize}px Arial, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";

    const textX = canvas.width / 2;
    const textY = (canvas.height / 2) * 1.025;

    context.fillText(value.toString(), textX, textY);

    return context.getImageData(0, 0, canvas.width, canvas.height);
};
