/**
 * Will return key of the first value met.
 *
 * @export
 * @param {Record<string, unknown>} passedObject
 * @param {unknown} value
 * @return {*}  {(string | undefined)}
 */
export function getKeyByValue<T extends Record<string, unknown>>(passedObject: T, value: unknown): string | undefined {
    return Object.keys(passedObject).find((key) => passedObject[key] === value);
}
