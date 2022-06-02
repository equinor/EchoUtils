import { act, renderHook } from '@testing-library/react-hooks';
import { useDebounce } from './useDebounce';

beforeEach(() => {
    jest.useFakeTimers({
        legacyFakeTimers: true
    });
});

afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
});

test('should test that useDebounce return value is only updated if the timeout is set', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
        initialProps: { value: '', delay: 500 }
    });
    expect(result.current).toBe('');
    act(() => {
        jest.advanceTimersByTime(510);
    });
    expect(result.current).toBe('');

    rerender({ value: 'Hello World', delay: 500 });
    expect(result.current).toBe('');

    act(() => {
        jest.advanceTimersByTime(498);
    });
    expect(result.current).toBe('');

    act(() => {
        jest.advanceTimersByTime(3);
    });
    expect(result.current).toBe('Hello World');
    expect(clearTimeout).toBeCalledTimes(1);
});
