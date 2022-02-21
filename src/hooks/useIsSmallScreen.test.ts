import { act, renderHook } from '@testing-library/react-hooks';
import { useIsSmallScreen } from './useIsSmallScreen';

// it('should return true in case of small (w: 200) screen', () => {
//     expect(isSmallScreen({ width: 200, height: 800 })).toBe(true);
// });

// it('should return true in case of small (w: 550) screen', () => {
//     expect(isSmallScreen({ width: 200, height: 800 })).toBe(true);
// });

// it('should return false in case of large screen', () => {
//     expect(isSmallScreen({ width: 560, height: 800 })).toBe(false);
// });

describe('useIsSmallScreen()', () => {
    afterEach(() => {
        Object.defineProperty(window, 'innerWidth', {
            value: undefined,
            writable: true
        });
        Object.defineProperty(window, 'innerHeight', {
            value: undefined,
            writable: true
        });
    });
    it('should return true in case of small (w: 200) screen', () => {
        // given
        let result;
        Object.defineProperty(window, 'innerWidth', {
            value: 200,
            writable: true
        });
        Object.defineProperty(window, 'innerHeight', {
            value: 800,
            writable: true
        });

        // when
        act(() => {
            result = renderHook(() => useIsSmallScreen()).result;
        });
        // then
        expect(result.current).toBe(true);
    });

    it('should return true in case of small (w: 550) screen', () => {
        // given
        let result;
        Object.defineProperty(window, 'innerWidth', {
            value: 550,
            writable: true
        });
        Object.defineProperty(window, 'innerHeight', {
            value: 800,
            writable: true
        });

        // when
        act(() => {
            result = renderHook(() => useIsSmallScreen()).result;
        });
        // then
        expect(result.current).toBe(true);
    });

    it('should return false in case of large (w: 850) screen', () => {
        // given
        let result;
        Object.defineProperty(window, 'innerWidth', {
            value: 850,
            writable: true
        });
        Object.defineProperty(window, 'innerHeight', {
            value: 800,
            writable: true
        });

        // when
        act(() => {
            result = renderHook(() => useIsSmallScreen()).result;
        });
        // then
        expect(result.current).toBe(false);
    });
});
