export const setDataAttributes = (
    element: Element,
    data: Record<string, any>,
) => {
    for (const [key, value] of Object.entries(data)) {
        element.setAttribute(`data-${key}`, value.toString());
    }
};

export const createHtmlElement = <T extends keyof HTMLElementTagNameMap>(
    tag: T,
    attributes: Omit<Partial<HTMLElementTagNameMap[T]>, "children"> & {
        data?: Record<string, any>;
        children?: HTMLElement[];
    },
): HTMLElementTagNameMap[T] => {
    const element = document.createElement(tag);

    const { data, children } = attributes;
    delete attributes.data;
    delete attributes.children;

    Object.assign(element, attributes);

    if (data) {
        setDataAttributes(element, data);
    }

    if (children) {
        children.forEach((child) => element.appendChild(child));
    }

    return element;
};
