export class EventEmitterEvent<Type extends string> {
    public event: Event;

    constructor(type: Type) {
        this.event = new Event(type);
    }
}

export class EventEmitter<Events extends string[]> {
    private eventTarget = new EventTarget();

    public addEventListener(
        type: Events[number],
        callback: Parameters<typeof this.eventTarget.addEventListener>[1],
        options?: Parameters<typeof this.eventTarget.addEventListener>[2],
    ): void {
        this.eventTarget.addEventListener(type, callback, options);
    }

    public dispatchEvent(event: EventEmitterEvent<Events[number]>): boolean {
        return this.eventTarget.dispatchEvent(event.event);
    }

    public removeEventListener(
        type: Events[number],
        callback: Parameters<typeof this.eventTarget.removeEventListener>[1],
        options?: Parameters<typeof this.eventTarget.removeEventListener>[2],
    ): void {
        this.eventTarget.removeEventListener(type, callback, options);
    }
}
