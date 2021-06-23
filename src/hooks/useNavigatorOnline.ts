import React, { useEffect } from 'react';

/**
 *
 *
 * @return {*}  {boolean}
 */
export const getOnLineStatus = (): boolean =>
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' ? navigator.onLine : true;

/**
 *
 *
 * @return {*}  {boolean}
 */
export const useNavigatorOnLine = (): boolean => {
    const [status, setStatus] = React.useState(getOnLineStatus());
    const setOnline = (): void => setStatus(true);
    const setOffline = (): void => setStatus(false);
    useEffect(() => {
        window.addEventListener('online', setOnline);
        window.addEventListener('offline', setOffline);
        return (): void => {
            window.removeEventListener('online', setOnline);
            window.removeEventListener('offline', setOffline);
        };
    }, []);
    return status;
};
