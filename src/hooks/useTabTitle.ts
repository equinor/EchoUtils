import { useInitial } from '../hooks';

/**
 * Sets the provided string as the tab or window title.
 * The hook will set the previous title when the component is unmounted.
 */
export function useTabTitle(title: string): void {
    useInitial(() => {
        const previousTitle = globalThis.document.title;
        window.document.title = title;

        return () => {
            window.document.title = previousTitle;
        };
    });
}
