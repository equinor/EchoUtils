import { arraysIsEqual } from './arrayUtils';

/**
 *
 * Function for recursively checking if all the values in an object is empty.
 * @param {Record<string, any>} obj The object to consider.
 * @return {*}  {boolean} Returns if the array is empty (true) or not (false).
 */
 export const objectIsEmpty = (obj: Record<string, any>): boolean => {
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
        const val = obj[keys[i]];
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
 * @param {Record<string, any>} obj1 The first object to consider.
 * @param {Record<string, any>} obj2 The second object to consider.
 * @return {*}  {boolean} Returns if the objects are equal (true) or not (false).
 */
 export const objectsIsEqual = (obj1: Record<string, any>, obj2: Record<string, any>): boolean => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) return false;
    obj1Keys.sort();
    obj2Keys.sort();
    if (!arraysIsEqual(obj1Keys, obj2Keys)) return false;
    
    for (let i = 0; i < obj1Keys.length; i++) {
        const key = obj1Keys[i];
        const val1 = obj1[key];
        const val2 = obj2[key];

        if (val1 !== val2) {
            if (Array.isArray(val1) && Array.isArray(val2)) {
                if (!arraysIsEqual(val1, val2)) return false;
            } else if (typeof val1 === 'object' && typeof val2 === 'object') {
                if (!objectsIsEqual(val1, val2)) return false;
            } else {
                return false;
            }
        }
    }
    return true;
}
