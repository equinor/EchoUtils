/**
 * Used for formatting string to echo standard.
 * will handle undefined as input argument.
 *
 * @export
 * @param {(...(string | undefined)[])} args
 * @return {*}  {string}
 */
export function formatString(...args: (string | undefined)[]): string {
    const strings = args.filter((arg) => arg !== undefined);
    if (strings.length > 0) {
        return strings.join('-');
    }
    return '-';
}
