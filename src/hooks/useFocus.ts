import React from 'react';

/**
 * Hook which returns a ref for the element we will focus on,
 * and a function to set the focus on that element.
 * @export
 * @template T
 * @return {*} Ref to focus on and function to set the focus {[React.RefObject<T>, VoidFunction]}
 */
export function useFocus<T extends HTMLElement>(): [React.RefObject<T>, VoidFunction] {
    const htmlElRef = React.useRef<T>(null);

    const setFocus = (): void => {
        htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
}
