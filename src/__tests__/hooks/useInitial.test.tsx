import { renderHook } from '@testing-library/react-hooks';
import { useInitial } from '../../hooks/useInitial';

test('should should be called once', () => {
    const func = jest.fn();
    renderHook(() =>
        useInitial(() => {
            func();
        })
    );

    expect(func).toBeCalledTimes(1);
});
