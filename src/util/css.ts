export const getCssVariable = (name: string, element?: Element): string =>
    getComputedStyle(element ?? globalThis.document.body)
        .getPropertyValue(name)
        .trim();
