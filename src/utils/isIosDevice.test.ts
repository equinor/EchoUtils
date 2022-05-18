import { iOs } from './isIosDevice';

describe('isIosDevice()', () => {
    afterEach(() => {
        Object.defineProperty(window, 'navigator', {
            value: {},
            writable: true
        });
    });

    it('should return false, if not ios device', () => {
        // given
        Object.defineProperty(window, 'navigator', {
            value: { userAgent: 'pokemonOS', maxTouchPoints: 2 },
            writable: true
        });

        // when
        const result = iOs.isIosDevice();

        // then
        expect(result).toBe(false);
    });

    ['Macintosh', 'iPhone', 'iPad', 'iPod'].forEach((deviceType) => {
        it(`should return true in case of ios devices: ${deviceType}`, () => {
            // given
            Object.defineProperty(window, 'navigator', {
                value: { userAgent: deviceType, maxTouchPoints: 2 },
                writable: true
            });

            // when
            const result = iOs.isIosDevice();

            // then
            expect(result).toBe(true);
        });
    });
});
