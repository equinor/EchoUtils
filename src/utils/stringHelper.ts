/**
 * Returns true if the specified string is undefined, empty, contains only white-spaces, or contains double quotes ("").
 * @param value The specific value to check.
 * @returns Returns true if the string is undefined, empty, contains only white-spaces, or contains double quotes ("").
 */
export function isNullOrEmpty(value?: string): boolean {
    value = value?.trim();
    if (value && value === '""') {
        return true;
    }
    return !value;
}

/**
 * Returns an empty string if the string isNullOrEmpty, otherwise returns original string.
 * @param value The string to check.
 * @returns Returns an empty string if the string isNullOrEmpty, otherwise returns original string.
 */
export function orEmpty(value?: string): string {
    if (isNullOrEmpty(value)) return '';
    return value?.trim() || '';
}

/**
 * Joins all nonEmpty elements into one string with the optional separator (defaults to 1 space).
 * @param values The elements to join
 * @param separator Optional separator (defaults to 1 space).
 * @returns All none empty values as one string. Returns empty if all elements are empty.
 */
export function joinOrEmpty(values: ReadonlyArray<string | undefined>, separator?: string | undefined): string {
    if (!separator) {
        separator = ' ';
    }
    const value = values.filter((item) => !isNullOrEmpty(item)).join(separator);
    return value.trim();
}

/**
 * Returns the first element which is not empty. Returns empty if all are empty.
 * @param values The list of values
 * @returns Returns the first element which is not empty. Returns empty if all are empty.
 */
export function firstOrEmpty(values: ReadonlyArray<string | undefined>): string {
    const result = values.find((element) => !isNullOrEmpty(element));
    return orEmpty(result);
}

export const stringHelper = {
    isNullOrEmpty,
    orEmpty,
    firstOrEmpty,
    joinOrEmpty
};
