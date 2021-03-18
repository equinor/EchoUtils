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
