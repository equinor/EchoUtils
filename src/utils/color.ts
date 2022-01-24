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

export interface Rgb {
    r: number;
    g: number;
    b: number;
}

/**
 * Returns the specified #hex color to RGB.
 * RR (red), GG (green) and BB (blue) are hexadecimal integers between 00 and FF specifying the intensity of the color.
 * @see [Url](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)
 * @param hex The hex color on the format #RRGGBB
 * @param fallbackRgbColor Optional fallback color if the hex argument is invalid
 * @returns The color in RGB format. Returns the fallbackHexColor of invalid hex, which defaults to undefined
 */
export function hexColorToRgb(hex: string, fallbackRgbColor?: Rgb): Rgb | undefined {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          }
        : fallbackRgbColor;
}

/**
 * Calculates a brighter hex color by the specified brighter percentage.
 * @see [Url](https://stackoverflow.com/questions/6443990/javascript-calculate-brighter-colour)
 * @param hexColor the input hex color #RRGGBB
 * @param percentageBrighter How much to brighten the color
 * @param fallbackHexColor Optional fallback color if the hexColor argument is invalid
 * @returns The brightened color or undefined if invalid hexColor
 */
export function calculateBrighterHexColor(
    hexColor: string,
    percentageBrighter: number,
    fallbackHexColor?: string
): string | undefined {
    const rgb = hexColorToRgb(hexColor);
    if (!rgb) return fallbackHexColor;

    const { r, g, b } = rgb;
    return (
        '#' +
        (0 | ((1 << 8) + r + ((256 - r) * percentageBrighter) / 100)).toString(16).slice(1) +
        (0 | ((1 << 8) + g + ((256 - g) * percentageBrighter) / 100)).toString(16).slice(1) +
        (0 | ((1 << 8) + b + ((256 - b) * percentageBrighter) / 100)).toString(16).slice(1)
    );
}

export const colorHelper = { getColorStatusFromString, stringToColour, hexColorToRgb, calculateBrighterHexColor };
