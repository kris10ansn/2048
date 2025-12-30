export const getCssVariable = (name: string, element?: Element): string =>
    getComputedStyle(element ?? globalThis.document.body)
        .getPropertyValue(name)
        .trim();

export type BuildFontProps = {
    family: string;
    size: number;
    sizeUnit?: string;
    weight: string;
};

export const buildFont = ({
    family,
    size,
    sizeUnit,
    weight,
}: BuildFontProps) => {
    sizeUnit = sizeUnit ?? "px";

    return `${weight} ${size}${sizeUnit} ${family}`;
};
