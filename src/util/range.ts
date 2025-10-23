export function* range(from: number, to: number, delta: number) {
    for (let i = from; delta > 0 ? i <= to : i >= to; i += delta) {
        yield i;
    }
}
