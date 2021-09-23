import { createHash } from 'crypto';

/**
 * If the status is 'unknown' or not passed, it will return with '--unknown' css color variable value.
 * Otherwise it will generate a hexa color in string based on the passed status.
 * @param {string} status The status which a color string will be generated
 * @returns {string} Color string in hexa format
 */
export function getColorStatusFromString(status: string | undefined): string {
    if (!status || status === '' || status === 'Unknown') {
        const style = getComputedStyle(document.documentElement);
        return style.getPropertyValue('--unknown');
    }
    return stringToColour(status.toLowerCase());
}

/**
 *
 * @param {string} str String value from which the color will be generated
 * @returns {string} Color in hexa format, like: #FF1266
 */
export function stringToColour(str: string): string {
    return '#' + createHash('md5').update(str).digest('hex').slice(0, 6);
}
