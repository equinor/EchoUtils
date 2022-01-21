/**
 * Removes duplicate items.
 * Example:
 * ```typescript
 * distinct(array, (a, b) => a.name === b.name);
 * ```
 * @param array The array to check for duplicates.
 * @param isEqual Optional compare function.
 * @returns A new array without duplicates.
 */
export function distinct<T>(array: ReadonlyArray<T>, isEqual?: (a: T, b: T) => boolean): T[] {
    const isAllPropertiesEqualFunction = (a: T, b: T) => JSON.stringify(a) === JSON.stringify(b);
    const isItemsEqual = isEqual || isAllPropertiesEqualFunction;
    return array.filter(
        (item, index, subArray) =>
            subArray.indexOf(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                subArray.find((subItem) => isItemsEqual(subItem, item))!
            ) === index
    );
}

export const arrayHelper = {
    distinct
};
