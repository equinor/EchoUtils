import React, { useEffect } from 'react';

type AsyncEffect = (signal: AbortSignal) => Promise<void | (() => void)> | void;

/**
 * Accepts a function that contains imperative, possibly effectful code.
 * @export
 * @param effect Imperative async function that can return a cleanup function
 * @param deps If present, effect will only activate if the values in the list change.
 */
export function useEffectAsync(effect: AsyncEffect, deps: React.DependencyList = []): void {
    useEffect(() => {
        const abortController = new AbortController();

        const cleanupPromise = effect(abortController.signal);

        return () => {
            abortController.abort();

            if (cleanupPromise instanceof Promise) {
                cleanupPromise.then((cleanup) => cleanup && cleanup());
            }
        };
        // Needs to be dynamic dependencies
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
