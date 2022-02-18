import {
    dateToStringOrEmpty,
    diffHours,
    diffMinutes,
    elapsedTimeInSeconds,
    elapsedTimeInSecondsBetween,
    elapsedTimeInSecondsToFixed
} from './formatTimeHelpers';

describe('diffHours', () => {
    it('2.5 hour difference should return 2 hours', () => {
        const date1 = new Date('2020-01-20T00:00:00');
        const date2 = new Date('2020-01-20T02:30:00');
        const result = diffHours(date1, date2);
        expect(result).toEqual(2);
    });
    it('should handle 3 hours difference from between today and yesterday', () => {
        const date1 = new Date('2020-01-19T23:00:00');
        const date2 = new Date('2020-01-20T02:00:00');
        const result = diffHours(date1, date2);
        expect(result).toEqual(3);
    });
    it('should ignore minutes and seconds', () => {
        const date1 = new Date('2020-01-19T00:00:00');
        const date2 = new Date('2020-01-19T01:13:27');
        const result = diffHours(date1, date2);
        expect(result).toEqual(1);
    });

    it('should handle 1 hours difference from dates that are strings from json parsing', () => {
        const dates = parseJsonDates('2020-01-19T00:00:00', '2020-01-19T01:00:00');
        const result = diffHours(dates.date1, dates.date2);
        expect(result).toEqual(1);
    });

    it('invalid date from json parsing should return undefined', () => {
        const dates = parseJsonDates('', '2020-01-19T01:00:00');
        const result = diffHours(dates.date1, dates.date2);
        expect(result).toEqual(undefined);
        const dates2 = parseJsonDates('2020-01-19T01:00:00', 'invalid date');
        const result2 = diffHours(dates2.date1, dates2.date2);
        expect(result2).toEqual(undefined);
    });
});

describe('diffMinutes', () => {
    it('1.25 hour difference should return 2 minutes', () => {
        const date1 = new Date('2020-01-20T00:00:00');
        const date2 = new Date('2020-01-20T01:15:00');
        const result = diffMinutes(date1, date2);
        expect(result).toEqual(75);
    });
    it('should handle 3.5 hours difference from between today and yesterday', () => {
        const date1 = new Date('2020-01-19T23:00:00');
        const date2 = new Date('2020-01-20T02:30:00');
        const result = diffMinutes(date1, date2);
        expect(result).toEqual(210);
    });
    it('should ignore seconds', () => {
        const date1 = new Date('2020-01-19T00:00:00');
        const date2 = new Date('2020-01-19T00:10:23');
        const result = diffMinutes(date1, date2);
        expect(result).toEqual(10);
    });

    it('should handle 1 hours difference from dates that are strings from json parsing', () => {
        const dates = parseJsonDates('2020-01-19T00:00:00', '2020-01-19T01:00:00');
        const result = diffMinutes(dates.date1, dates.date2);
        expect(result).toEqual(60);
    });

    it('invalid date from json parsing should return undefined', () => {
        const dates = parseJsonDates('', '2020-01-19T01:00:00');
        const result = diffMinutes(dates.date1, dates.date2);
        expect(result).toEqual(undefined);
        const dates2 = parseJsonDates('2020-01-19T01:00:00', 'invalid date');
        const result2 = diffMinutes(dates2.date1, dates2.date2);
        expect(result2).toEqual(undefined);
    });
});

describe('elapsedTimeInSecondsBetween', () => {
    it('10 000 milliseconds difference should return 10 seconds elapsed', () => {
        const fromMs = 0;
        const toMs = 10000;
        const elapsedSeconds10 = elapsedTimeInSecondsBetween(fromMs, toMs);
        expect(elapsedSeconds10).toEqual(10);
    });
    it('should handled mixed up order of input parameters', () => {
        const fromMs = 5000;
        const toMs = 0;
        let elapsedSeconds5 = elapsedTimeInSecondsBetween(fromMs, toMs);
        expect(elapsedSeconds5).toEqual(5);
        elapsedSeconds5 = elapsedTimeInSecondsBetween(toMs, fromMs);
        expect(elapsedSeconds5).toEqual(5);
    });
});

describe('dateToStringOrEmpty tests', () => {
    it('should return empty string if undefined', () => {
        const actualDate = dateToStringOrEmpty(undefined);
        expect(actualDate).toEqual('');
    });
    it('should handle string which is not a date, and return Invalid Date', () => {
        const actualDate = dateToStringOrEmpty('garbage string');
        expect(actualDate).toEqual('Invalid Date');
    });
    it('should return empty if epoch date is 1/1/1970 00:00:00', () => {
        const date = '1970-01-01';
        const actualDate = dateToStringOrEmpty(date);
        expect(actualDate).toEqual('');
    });
    it('should convert a string date to human readable string', () => {
        const date = '2020-02-19T13:00:00';
        const actualDate = dateToStringOrEmpty(date);
        //local format varies between browser, jest, and azure, so let's just make sure we include all correct date time values
        expect(actualDate).toContain('13:00:00');
        expect(actualDate).toContain('2020');
        expect(actualDate).toContain('19');
        expect(actualDate).toContain('2');
        expect(actualDate).not.toContain('T');
    });
    it('should convert a real date to human readable string', () => {
        const date = new Date('2020-02-19T13:00:00');
        const actualDate = dateToStringOrEmpty(date);
        expect(actualDate).toContain('13:00:00');
        expect(actualDate).toContain('2020');
        expect(actualDate).toContain('19');
        expect(actualDate).toContain('2');
        expect(actualDate).not.toContain('T');
    });
    it('should convert a json string disguised as date to human readable string', () => {
        const date = parseJsonDates('2020-02-19T13:00:00', '2020-02-19T13:00:00');
        const actualDate = dateToStringOrEmpty(date.date1);
        expect(actualDate).toContain('13:00:00');
        expect(actualDate).toContain('2020');
        expect(actualDate).toContain('19');
        expect(actualDate).toContain('2');
        expect(actualDate).not.toContain('T');
    });
    it('midnight 00h should result in only current date being returned', () => {
        const date = '2021-03-19T00:00:00';
        const actualDate = dateToStringOrEmpty(date);
        expect(actualDate).not.toContain('00:00:00');
        expect(actualDate).toContain('2021');
        expect(actualDate).toContain('19');
        expect(actualDate).toContain('3');
        expect(actualDate).not.toContain('T');
    });
    it('midnight 24h should result in next date being returned', () => {
        const date = '2021-03-19T24:00:00';
        const actualDate = dateToStringOrEmpty(date);
        expect(actualDate).not.toContain('24:00:00');
        expect(actualDate).toContain('2021');
        expect(actualDate).toContain('20');
        expect(actualDate).toContain('3');
        expect(actualDate).not.toContain('T');
    });
});

describe('elapsedTimeInSeconds tests', () => {
    it('should return expected 5 seconds for given input', () => {
        const startTimeInMs = 2_000;
        const endTimeInMs = 7_000;
        performance.now = jest.fn(() => endTimeInMs);
        const inSeconds = elapsedTimeInSeconds(startTimeInMs);
        expect(inSeconds).toEqual(5);
    });

    it('should return expected seconds with decimals for given input', () => {
        const startTimeInMs = 2_000;
        const endTimeInMs = 7_123;
        performance.now = jest.fn(() => endTimeInMs);
        const inSeconds = elapsedTimeInSeconds(startTimeInMs);
        expect(inSeconds).toEqual(5.123);
    });
});

describe('elapsedTimeInSecondsToFixed tests', () => {
    it('elapsedTimeInSecondsToFixed defaults to 2 decimals', () => {
        const startTimeInMs = 2_000;
        const endTimeInMs = 7_123;
        performance.now = jest.fn(() => endTimeInMs);
        const inSeconds = elapsedTimeInSecondsToFixed(startTimeInMs);
        expect(inSeconds).toEqual(5.12);
    });

    it('elapsedTimeInSecondsToFixed does default rounding as expected', () => {
        const startTimeInMs = 2_000;
        const endTimeInMs = 3_005;
        performance.now = jest.fn(() => endTimeInMs);
        const inSeconds = elapsedTimeInSecondsToFixed(startTimeInMs);
        expect(inSeconds).toEqual(1.01);
    });

    it('elapsedTimeInSecondsToFixed uses fixed number of decimals', () => {
        const startTimeInMs = 2_000;
        const endTimeInMs = 7_000;
        performance.now = jest.fn(() => endTimeInMs);
        const inSeconds = elapsedTimeInSecondsToFixed(startTimeInMs);
        expect(inSeconds).toEqual(5.0);
    });

    it('elapsedTimeInSecondsToFixed returns number of decimals according to input', () => {
        const startTimeInMs = 2_000;
        const endTimeInMs = 7_123.456;
        performance.now = jest.fn(() => endTimeInMs);
        const inSeconds = elapsedTimeInSecondsToFixed(startTimeInMs, 4);
        expect(inSeconds).toEqual(5.1235);
    });
});

function parseJsonDates(dateString1: string, dateString2: string): DateInterface {
    const json = `{"date1": "${dateString1}", "date2": "${dateString2}"}`;
    const dates = JSON.parse(json) as DateInterface;
    return dates;
}

interface DateInterface {
    date1: Date;
    date2: Date;
}
