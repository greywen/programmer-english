export function removeChinese(value: string): string {
    if (value && value.trim()) {
        let reg = /[\u4e00-\u9fa5]/g;
        return value.replace(reg, "");
    }
    return "";
}


export function isNullReturnEmpty(val) {
    return val ? val : ""
}