import { useEffect, useState } from 'react';

/**
 * Hook which ensures that a value is not updated too frequently.
 * Hook will only update the debounced return value when the hook has not been called for the specified time.
 * Hook will set a timeout for when the value should be updated, the timeout will be canceled if the input value changes
 * and the return value will not be updated if the timeout is canceled before the delay is passed
 *
 * @export
 * @param {string} value the value that is likely to be updated frequently
 * @param {number} delay how long the hook should wait for a new call before it will updated the debounced value
 * @return {*}  {string} the debounced value
 */
export function useDebounce(value: string, delay: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return (): void => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
