export function parseNumber(value: number | string) {
    if (typeof value === "number") {
        value = isNaNReturnZero(value);
        return value;
    }

    if (typeof value === "string") {
        value = parseInt(value);
        return isNaNReturnZero(value);
    }
    return 0;
}

export function isNaNReturnZero(value: number) {
    return isNaN(value) ? 0 : value;
}

export function isEmptyObject(obj: object) {
    return Object.keys(obj).length === 0;
}