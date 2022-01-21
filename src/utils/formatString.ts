/**
 * Used for formatting string to echo standard, with - as separator.
 * Returns - if the joined string is empty.
 * Will handle undefined as input argument.
 *
 * @export
 * @param {(...(string | undefined)[])} args
 * @return {*}  {string}
 */
export function formatString(...args: (string | undefined)[]): string {
    const strings = args.filter((arg) => arg !== undefined);
    const string = strings.length > 0 ? strings.join('-') : '-';
    return string === '' ? '-' : string;
}
