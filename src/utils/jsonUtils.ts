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

/**
 *
 * Used as an alternative to JSON.parse().
 * The function will convert dates to Date type when parsing.
 *
 * @export
 * @param {string} jsonString
 * @return {*}  {any}
 */
export function parseJsonWithDate(jsonString: string): any {
    return JSON.parse(jsonString, convertDateHelper);
}
