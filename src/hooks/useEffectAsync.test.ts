import { cleanup, renderHook } from '@testing-library/react';
import { useEffectAsync } from './useEffectAsync';

describe('useEffectAsync()', () => {
    it('should call the effect passed as a param', () => {
        // given
        const mockAsyncEffect = jest.fn();

        // when
        renderHook(() => useEffectAsync(mockAsyncEffect));

        // then
        expect(mockAsyncEffect).toBeCalledTimes(1);
    });

    it('should call the cleanup function returned by the passed effect', async () => {
        // given
        const mockCleanupFunction = jest.fn();
        const mockAsyncEffect: () => Promise<() => void> = () => {
            return Promise.resolve(mockCleanupFunction);
        };

        // when
        renderHook(() => useEffectAsync(mockAsyncEffect));
        // use this to execute useEffect cleanup() run
        await cleanup();

        // then
        expect(mockCleanupFunction).toBeCalledTimes(1);
    });
});
