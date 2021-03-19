import { objectsIsEqual } from './objectUtils';

/**
 *
 * Function for recursively checking the equality of two arrays.
 * One can choose to ignore the order of items if
 * ignoreOrder is passed as true.
 * @param {any[]} a1 The first array to consider.
 * @param {any[]} a2 The second array to consider.
 * @param {boolean} [ignoreOrder] Flag which decides whether the order should be ignored.
 * @return {*}  {boolean} Returns if the arrays are equal (true) or not (false).
 */
 export const arraysIsEqual = (a1: unknown[], a2: unknown[], ignoreOrder?: boolean): boolean => {
    if (a1 === a2) return true;
    if (a1 == null || a2 == null) return false;
    if (a1.length !== a2.length) return false;

    if (ignoreOrder) {
        a1.sort();
        a2.sort();
    }

    for (let i = 0; i < a1.length; ++i) {
        const val1 = a1[i];
        const val2 = a2[i];

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
