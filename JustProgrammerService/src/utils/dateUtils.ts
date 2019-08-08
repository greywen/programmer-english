import * as moment from "moment";

export function now(format: string = "YYYY-MM-DD HH:mm:ss") {
    return moment().format(format);
}

export function secondOfDay() {
    return moment().endOf('day').diff(moment(), "second");
}
