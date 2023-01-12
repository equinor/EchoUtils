import { renderHook } from '@testing-library/react';
import { useCleanup } from './useCleanup';

describe('useCleanup', () => {
    it('should should not be called once', () => {
        const func = jest.fn();
        renderHook(() =>
            useCleanup(() => {
                func();
            })
        );

        expect(func).not.toBeCalledTimes(1);
    });
});
