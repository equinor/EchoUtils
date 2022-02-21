/**
 * Get the difference between two given dates in hours. Returns undefined if the hours of the passed date are NaN.
 * @param {Date} date1
 * @param {Date} date2
 * @returns {number | undefined}
 */
export function diffHours(dt2: Date, dt1: Date): number | undefined {
    dt2 = new Date(dt2); //handle strings disguised as dates after JSON parsing
    dt1 = new Date(dt1);
    if (isNaN(dt2.getHours()) || isNaN(dt1.getHours())) {
        return undefined;
    }
    let diff = (dt2.getTime() - new Date(dt1).getTime()) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
}

/**
 * Get the difference between two given dates in minutes. Returns undefined if the hours of the passed date are NaN.
 * @param {Date} date1
 * @param {Date} date2
 * @returns {number}
 */
export function diffMinutes(dt2: Date, dt1: Date): number | undefined {
    dt2 = new Date(dt2); //handle strings disguised as dates after JSON parsing
    dt1 = new Date(dt1);
    if (isNaN(dt2.getHours()) || isNaN(dt1.getHours())) {
        return undefined;
    }
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

/**
 * Get the difference between two given dates in seconds.
 * @param {Date} date1
 * @param {Date} date2
 * @returns {number}
 */
export function diffSeconds(date1?: Date, date2?: Date): number {
    if (!date1 || !date2) {
        return 9999999;
    }
    date2 = new Date(date2); //typescript doesn't know the difference between string and date...
    date1 = new Date(date1);
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(diff / 1000);
}

/**
 * Returns the elapsed time in seconds between start and end time.
 * @param startTimeMs The start time to measure elapsed time from in milliseconds.
 * @param startTimeMs The end time to measure elapsed time to in milliseconds.
 */
export function elapsedTimeInSecondsBetween(startTimeMs: number, endTimeMs: number): number {
    if (startTimeMs > endTimeMs) {
        const swapEndTime = endTimeMs;
        endTimeMs = startTimeMs;
        startTimeMs = swapEndTime;
    }
    return (endTimeMs - startTimeMs) / 1000;
}

/**
 * Returns the elapsed time since startTime in seconds.
 * @param startTimeMs The start time to measure elapsed time from in milliseconds.
 */
export function elapsedTimeInSeconds(startTimeMs: number): number {
    return elapsedTimeInSecondsBetween(performance.now(), startTimeMs);
}

/**
 * Returns the elapsed time since startTime in seconds, rounded to specified fixed number of decimal places.
 * @param startTimeMs The start time to measure elapsed time from.
 * @param decimalPlaces Number of decimal places.
 */
export function elapsedTimeInSecondsToFixed(startTimeMs: number, decimalPlaces = 2): number {
    const seconds = elapsedTimeInSeconds(startTimeMs);
    const secondsFixedDecimals = Number(Math.round(parseFloat(seconds + 'e' + decimalPlaces)) + 'e-' + decimalPlaces); //https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places
    return secondsFixedDecimals;
}

/**
 * Returns a date as a friendly readable string. If the date is undefined, it returns empty string.
 * @param date The date to convert to friendly string format.
 */
export function dateToStringOrEmpty(date: Date | string | undefined): string {
    const empty = '';
    if (!date) {
        return empty;
    }
    if (typeof date === 'string') {
        date = new Date(date);
    }

    const dateFormatEnGb = 'en-GB';
    const dateString = date.toLocaleDateString(dateFormatEnGb);
    if (dateString.toLowerCase().includes('invalid date')) {
        return dateString;
    }
    if (isEpochDateTime(date)) {
        return empty;
    }

    const timeString = date.toLocaleTimeString(dateFormatEnGb, { hour12: false });
    if (timeString === '00:00:00' || timeString === '24:00:00') {
        return dateString;
    }
    return dateString + ' ' + timeString;
}

/**
 * Returns true if the specified date is 1-1-1970
 * @param date the date to check.
 */
function isEpochDateTime(date: Date): boolean {
    const time = date.toUTCString();
    return time === 'Thu, 01 Jan 1970 00:00:00 GMT';
}
