import md5 from 'blueimp-md5';

type HashMethod = 'md5';

/**
 * Accepts a string value and hashes it with a given value.
 * @param {string} type The hash method. Currently supports "md5".
 * @param {string} value The value to be hashed.
 */
function createHash(type: HashMethod, value: string): string {
    switch (type) {
        case 'md5':
            return md5(value);
        default:
            throw new Error('Could not determine how to hash the value');
    }
}

export { createHash };
