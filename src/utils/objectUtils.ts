/**
 *
 * Function for recursively checking if all the values in an object is empty.
 * @param {Record<string, any>} obj The object to consider.
 * @return {*}  {boolean} Returns if the array is empty (true) or not (false).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectIsEmpty = (obj: Record<string, any>): boolean => {
    const keys = Object.keys(obj);

    for (const key of keys) {
        const val = obj[key];
        if (val.length > 0 || typeof val === 'number' || typeof val === 'boolean') {
            return false;
        }
        if (typeof val === 'object') {
            if (!objectIsEmpty(val)) {
                return false;
            }
        }
    }

    return true;
};

/**
 *
 * Function for recursively checking the equality of two objects.
 * @param {Record<string, unknown>} obj1 The first object to consider.
 * @param {Record<string, unknown>} obj2 The second object to consider.
 * @return {*}  {boolean} Returns if the objects are equal (true) or not (false).
 */
export const objectsIsEqual = (obj1: Record<string, unknown>, obj2: Record<string, unknown>): boolean => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) return false;
    obj1Keys.sort();
    obj2Keys.sort();
    if (!arraysIsEqual(obj1Keys, obj2Keys)) return false;

    for (const key of obj1Keys) {
        const val1 = obj1[key];
        const val2 = obj2[key];

        if (val1 !== val2) {
            if (Array.isArray(val1) && Array.isArray(val2)) {
                if (!arraysIsEqual(val1, val2)) return false;
            } else if (val1 !== null && val2 !== null && typeof val1 === 'object' && typeof val2 === 'object') {
                if (!objectsIsEqual(val1 as Record<string, unknown>, val2 as Record<string, unknown>)) return false;
            } else {
                return false;
            }
        }
    }
    return true;
};

/**
 *
 * Function for recursively checking the equality of two arrays.
 * One can choose to ignore the order of items if
 * ignoreOrder is passed as true.
 * @param {ReadonlyArray<unknown>} a1 The first array to consider.
 * @param {ReadonlyArray<unknown>} a2 The second array to consider.
 * @param {boolean} [ignoreOrder] Flag which decides whether the order should be ignored.
 * @return {*}  {boolean} Returns if the arrays are equal (true) or not (false).
 */
export const arraysIsEqual = (
    a1: ReadonlyArray<unknown>,
    a2: ReadonlyArray<unknown>,
    ignoreOrder?: boolean
): boolean => {
    if (a1 === a2) return true;
    if (a1 == null || a2 == null) return false;
    if (a1.length !== a2.length) return false;

    const a1Copy = [...a1];
    const a2Copy = [...a2];
    if (ignoreOrder) {
        a1Copy.sort();
        a2Copy.sort();
    }

    for (let i = 0; i < a1.length; ++i) {
        const val1 = a1Copy[i];
        const val2 = a2Copy[i];

        if (val1 !== val2) {
            if (Array.isArray(val1) && Array.isArray(val2)) {
                if (!arraysIsEqual(val1, val2)) return false;
            } else if (val1 !== null && val2 !== null && typeof val1 === 'object' && typeof val2 === 'object') {
                if (!objectsIsEqual(val1 as Record<string, unknown>, val2 as Record<string, unknown>)) return false;
            } else {
                return false;
            }
        }
    }
    return true;
};

/**
 * Function for checking deep equality of either objects or arrays.
 *
 * @export
 * @param {(Array<unknown> | Record<string, unknown>)} val1
 * @param {(Array<unknown> | Record<string, unknown>)} val2
 * @param {boolean} [ignoreArrayOrder]
 * @return {*}  {boolean}
 */
export function deepIsEqual(
    val1: Array<unknown> | Record<string, unknown>,
    val2: Array<unknown> | Record<string, unknown>,
    ignoreArrayOrder?: boolean
): boolean {
    if (
        val1 !== undefined &&
        typeof val1 === 'object' &&
        !Array.isArray(val1) &&
        val2 !== undefined &&
        typeof val2 === 'object' &&
        !Array.isArray(val2)
    ) {
        return objectsIsEqual(val1, val2);
    }
    return arraysIsEqual(val1 as Array<unknown>, val2 as Array<unknown>, ignoreArrayOrder);
}
