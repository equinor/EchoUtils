import { renderHook } from '@testing-library/react-hooks';
import { useCleanup } from './useCleanup';

test('should should not be called once', () => {
    const func = jest.fn();
    renderHook(() =>
        useCleanup(() => {
            func();
        })
    );

    expect(func).not.toBeCalledTimes(1);
});
