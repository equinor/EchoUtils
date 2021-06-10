/**
 * Will return key of the first value met.
 *
 * @export
 * @param {Record<string, unknown>} object
 * @param {unknown} value
 * @return {*}  {(string | undefined)}
 */
export function getKeyByValue<T>(object: T, value: unknown): string | undefined {
    return Object.keys(object).find((key) => object[key] === value);
}
