import { useEffect, useState } from 'react';
import { diffSeconds, ping } from '../utils';
interface IntranetCheck {
    isSourceAvailable: boolean;
    isPingLoading: boolean;
}

interface CachedPing {
    pingTask: Promise<boolean>;
    timestamp: Date;
}

const cachedPings: Record<string, CachedPing> = {};

async function pingSourceWithCache(
    source: string,
    useCachedPing: boolean,
    renewCacheSeconds: number
): Promise<boolean> {
    const cachedPing = cachedPings[source];
    const timeDifferenceInSeconds = diffSeconds(cachedPing?.timestamp, new Date());

    if (useCachedPing && cachedPing && timeDifferenceInSeconds < renewCacheSeconds) {
        return await cachedPing.pingTask;
    } else {
        const pingTask = ping(source);
        cachedPings[source] = { pingTask, timestamp: new Date() };

        return await pingTask;
    }
}

/**
 *
 * @param source string - The url path to ping.
 * @param useCachedPing boolean - Use a cached result of an earlier ping.
 * @param renewCacheSeconds  number - Overwrite cache after this given seconds.
 * @returns { isSourceAvailable: boolean; isLoading: boolean }
 */
export function usePing(source: string, useCachedPing = true, renewCacheSeconds = 30): IntranetCheck {
    const [isSourceAvailable, setIsSourceAvailable] = useState<boolean>(false);
    const [isPingLoading, setIsPingLoading] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;

        async function runPing(): Promise<void> {
            if (!isMounted) {
                return;
            }
            setIsPingLoading(true);
            const isAvailable = await pingSourceWithCache(source, useCachedPing, renewCacheSeconds);
            setIsSourceAvailable(isAvailable);
            setIsPingLoading(false);
        }
        runPing();

        return (): void => {
            isMounted = false;
        };
    }, [source, useCachedPing, renewCacheSeconds]);

    return { isSourceAvailable, isPingLoading };
}
