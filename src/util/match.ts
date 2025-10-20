export const match = <K, V>(key: K, cases: [K[], V][]): V | null => {
    for (const [keys, value] of cases) {
        if (keys.includes(key)) {
            return value;
        }
    }
    return null;
};
