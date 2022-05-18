import { act, renderHook } from '@testing-library/react-hooks';
import { useIsIosDevice } from './useIsIosDevice';

describe('useIsIosDevice()', () => {
    afterEach(() => {
        Object.defineProperty(window, 'navigator', {
            value: {},
            writable: true
        });
    });

    ['Macintosh', 'iPhone', 'iPad', 'iPod'].forEach((deviceType) => {
        it(`should return true in case of ios devices: ${deviceType}`, () => {
            // given
            let result;
            Object.defineProperty(window, 'navigator', {
                value: { userAgent: deviceType, maxTouchPoints: 2 },
                writable: true
            });

            // when
            act(() => {
                result = renderHook(() => useIsIosDevice()).result;
            });
            // then
            expect(result.current).toBe(true);
        });
    });

    it('should return false, if not ios device', () => {
        // given
        let result;
        Object.defineProperty(window, 'navigator', {
            value: { userAgent: 'pokemonOS', maxTouchPoints: 2 },
            writable: true
        });

        // when
        act(() => {
            result = renderHook(() => useIsIosDevice()).result;
        });
        // then
        expect(result.current).toBe(false);
    });
});
