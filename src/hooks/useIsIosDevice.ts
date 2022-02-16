import { useState } from 'react';
import { useInitial } from './useInitial';

/**
 * Hook for checking if page is loaded from iOS mobile device.
 * @returns boolean true if on mobile.
 */

export function useIsIosDevice(): boolean {
    const [isIosDevice, setIsIosDevice] = useState(false);

    useInitial(() => {
        if (/iphone|ipad|ipod|macintosh/i.test(navigator.userAgent.toLowerCase()) && navigator.maxTouchPoints > 1) {
            setIsIosDevice(true);
        } else {
            setIsIosDevice(false);
        }
    });

    return isIosDevice;
}
