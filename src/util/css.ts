export const getCssVariable = (name: string): string =>
    getComputedStyle(globalThis.document.body).getPropertyValue(name).trim();
