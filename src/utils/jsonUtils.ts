/* eslint-disable @typescript-eslint/no-explicit-any */

function convertDateHelper(key: any, value: any): any {
    if (typeof value === 'string') {
        const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.{0,1}\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        const a = reISO.exec(value);
        if (a) {
            return new Date(value);
        }
    }
    return value;
}

export function parseJsonWithDate(jsonString: string): any {
    return JSON.parse(jsonString, convertDateHelper);
}
