import { useState } from 'react';
import { useWindowSize } from './useWindowSize';

/**
 * Hook for checking if page is loaded from iOS mobile device.
 * @returns boolean true if on mobile.
 */

export function useIsSmallScreen(): boolean {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const windowSize = useWindowSize();

    const isCurrentSizeSmall = !!windowSize.width && windowSize.width <= 550;

    if (isSmallScreen !== isCurrentSizeSmall) {
        setIsSmallScreen(isCurrentSizeSmall);
    }

    return isSmallScreen;
}
