import { isSmallScreen } from './screenUtils';

describe('isSmallScreen()', () => {
    it('should handle empty params', () => {
        expect(isSmallScreen({})).toBe(false);
    });

    it('should return true in case of small (w: 200) screen', () => {
        expect(isSmallScreen({ width: 200, height: 800 })).toBe(true);
    });

    it('should return true in case of small (w: 550) screen', () => {
        expect(isSmallScreen({ width: 200, height: 800 })).toBe(true);
    });

    it('should return false in case of large screen', () => {
        expect(isSmallScreen({ width: 560, height: 800 })).toBe(false);
    });
});
