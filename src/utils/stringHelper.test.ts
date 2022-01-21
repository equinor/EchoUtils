import { stringHelper } from './stringHelper';

describe('stringHelper isNullOrEmpty', () => {
    test('should return true if undefined', () => {
        expect(stringHelper.isNullOrEmpty()).toBeTruthy();
    });

    test('should return true if empty', () => {
        expect(stringHelper.isNullOrEmpty('')).toBeTruthy();
    });

    test('should return true if white-spaces', () => {
        expect(stringHelper.isNullOrEmpty(' ')).toBeTruthy();
    });

    test('should return false if string contains double quotes ("") which represents and empty string', () => {
        expect(stringHelper.isNullOrEmpty('""')).toBeTruthy();
    });

    test('should return false if string contains anything', () => {
        expect(stringHelper.isNullOrEmpty('a')).toBeFalsy();
    });
});

describe('stringHelper orEmpty', () => {
    test('should return empty if undefined', () => {
        expect(stringHelper.orEmpty()).toBe('');
    });

    test('should return empty if white-space', () => {
        expect(stringHelper.orEmpty(' ')).toBe('');
    });

    test('should return empty if white-spaces', () => {
        expect(stringHelper.orEmpty('  ')).toBe('');
    });

    test('should return empty if string contains "" which represents and empty string', () => {
        expect(stringHelper.orEmpty('""')).toBe('');
    });

    test('should return original string if string contains anything', () => {
        expect(stringHelper.orEmpty('aBc')).toBe('aBc');
    });
});

describe('stringHelper joinOrEmpty', () => {
    test('should return empty if undefined', () => {
        expect(stringHelper.joinOrEmpty([])).toBe('');
    });

    test('should return empty if undefined or white-spaces', () => {
        expect(stringHelper.joinOrEmpty([undefined, '', '  '])).toBe('');
    });

    test('should return joined none empty values', () => {
        expect(stringHelper.joinOrEmpty(['a', ' ', 'b', '  '])).toBe('a b');
    });

    test('should return joined none empty values with specified separator', () => {
        expect(stringHelper.joinOrEmpty(['a', ' ', 'b', '  '], '-')).toBe('a-b');
    });
});

describe('stringHelper firstOrEmpty', () => {
    test('should return empty if undefined', () => {
        expect(stringHelper.firstOrEmpty([])).toBe('');
    });

    test('should return empty if undefined or white-spaces', () => {
        expect(stringHelper.firstOrEmpty([undefined, '', '  '])).toBe('');
    });

    test('should return first none empty value', () => {
        expect(stringHelper.firstOrEmpty(['  ', ' ', 'b', 'c'])).toBe('b');
    });
});
