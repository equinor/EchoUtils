// useWindowSize from usehooks.com
import { useEffect, useState } from 'react';

/**
 * Get the current size of the browser window.
 * @returns {width?: number; height?: number} Width and height of the current browser window size.
 * Returns undefined if there is no window object (for example: executed on server side)
 */
export function useWindowSize(): { width?: number; height?: number } {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize(): void {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return (): void => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
}
