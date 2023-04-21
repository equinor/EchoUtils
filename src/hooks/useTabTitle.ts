import { useEffect } from 'react';

/**
 * Sets the provided string as the tab or window title.
 * The hook will set the previous title when the component is unmounted.
 */
export function useTabTitle(title: string): void {
    useEffect(() => {
        const previousTitle = window.document.title;
        window.document.title = title;

        return () => {
            window.document.title = previousTitle;
        };
    }, [title]);
}
