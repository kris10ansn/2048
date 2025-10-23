export const setDataAttributes = (
    element: HTMLElement,
    data: Record<string, any>
) => {
    for (const [key, value] of Object.entries(data)) {
        element.setAttribute(`data-${key}`, value.toString());
    }
};

export const createHtmlElement = <T extends keyof HTMLElementTagNameMap>(
    tag: T,
    attributes: Partial<HTMLElementTagNameMap[T]> & {
        data?: Record<string, any>;
    }
): HTMLElementTagNameMap[T] => {
    const element = document.createElement(tag);
    const { data } = attributes;
    delete attributes.data;

    Object.assign(element, attributes);
    if (data) setDataAttributes(element, data);

    return element;
};
