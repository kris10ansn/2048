import constants from "./constants";

const boxMargin = constants.canvasSize / 48;
const boxSize = constants.canvasSize / constants.boardSize - boxMargin / 4;
const boxFontSize = constants.canvasSize / 12;

export const fillBox = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    fillStyle: string
) => {
    ctx.fillStyle = fillStyle;

    ctx.beginPath();
    ctx.roundRect(
        x * boxSize + boxMargin,
        y * boxSize + boxMargin,
        boxSize - boxMargin,
        boxSize - boxMargin,
        boxMargin / 2
    );

    ctx.fill();
    ctx.closePath();
};

export const fillBoxText = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    text: string
) => {
    const magicNumber = 5;
    ctx.fillStyle = "#333";
    ctx.font = `bold ${boxFontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        text,
        x * boxSize + boxSize / 2 + boxMargin / 2,
        y * boxSize + boxSize / 2 + boxMargin / 2 + magicNumber
    );
};

export const fillBackground = (
    ctx: CanvasRenderingContext2D,
    style: string
) => {
    ctx.fillStyle = style;
    ctx.fillRect(0, 0, constants.canvasSize, constants.canvasSize);
};

export const strokeLine = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
) => {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    ctx.closePath();
};

export const strokeBoxDebugLines = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
) => {
    ctx.strokeStyle = "red";
    ctx.strokeRect(
        boxMargin / 2 + x * boxSize,
        boxMargin / 2 + y * boxSize,
        boxSize,
        boxSize
    );
    strokeLine(
        ctx,
        x * boxSize + boxSize / 2 + boxMargin / 2,
        y * boxSize + boxMargin / 2,
        x * boxSize + boxSize / 2 + boxMargin / 2,
        y * boxSize + boxSize + boxMargin / 2
    );
    strokeLine(
        ctx,
        x * boxSize + boxMargin / 2,
        y * boxSize + boxSize / 2 + boxMargin / 2,
        x * boxSize + boxSize + boxMargin / 2,
        y * boxSize + boxSize / 2 + boxMargin / 2
    );
};
