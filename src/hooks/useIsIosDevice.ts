import { useState } from 'react';
import { iOs } from '../utils/isIosDevice';
import { useInitial } from './useInitial';

/**
 * Hook for checking if page is loaded from iOS mobile device.
 * @returns boolean true if on mobile.
 */

export function useIsIosDevice(): boolean {
    const [isIosDeviceState, setIsIosDeviceState] = useState(false);

    useInitial(() => {
        setIsIosDeviceState(iOs.isIosDevice());
    });

    return isIosDeviceState;
}
