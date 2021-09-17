import { createHash } from 'crypto';

export function getColorStatusFromString(status: string | undefined): string {
    if (!status || status === '' || status === 'Unknown') {
        const style = getComputedStyle(document.documentElement);
        return style.getPropertyValue('--unknown');
    }
    return stringToColour(status.toLowerCase());
}

export function stringToColour(str: string): string {
    return '#' + createHash('md5').update(str).digest('hex').slice(0, 6);
}
