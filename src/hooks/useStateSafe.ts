// source: https://medium.com/technology-hits/how-to-fix-memory-leak-issue-in-react-js-using-hook-a5ecbf9becf8
import { useCallback, useEffect, useRef, useState } from 'react';

type useStateSafeParams<T> = T | (() => T);
type dispatch<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * Wrapper around react's `useState` hook.
 * Use this hook to prevent memory leak as this wont call set state on unmounted component.
 *
 * @param initialValue initial state value
 */
export const useStateSafe = <T>(initialValue: useStateSafeParams<T>): [T, dispatch<T>] => {
    const [val, setVal] = useState<T>(initialValue);
    const mountedRef = useRef<boolean>();

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const setValue: dispatch<T> = useCallback(
        (s: React.SetStateAction<T>) => {
            if (mountedRef.current) {
                setVal(s);
            }
        },
        [setVal]
    );
    return [val, setValue];
};
