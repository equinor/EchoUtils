import { renderHook } from '@testing-library/react';
import { useInitial } from './useInitial';

describe('useInitial', () => {
    test('should should be called once', () => {
        const func = jest.fn();
        renderHook(() =>
            useInitial(() => {
                func();
            })
        );

        expect(func).toBeCalledTimes(1);
    });
});
