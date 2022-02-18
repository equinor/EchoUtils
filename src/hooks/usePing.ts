import { useEffect, useState } from 'react';
import { ping } from '../utils';
interface IntranetCheck {
    isSourceAvailable: boolean;
}

interface CachedPing {
    pingTask: Promise<boolean>;
    timestamp: Date;
}

const cachedPings: Record<string, CachedPing> = {};

function dateDifferenceInSeconds(date1?: Date, date2?: Date): number {
    if (!date1 || !date2) {
        return 9999999;
    }
    date2 = new Date(date2); //typescript doesn't know the difference between string and date...
    date1 = new Date(date1);
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(diff / 1000);
}

async function pingSourceWithCache(
    source: string,
    useCachedPing: boolean,
    renewCacheSeconds: number
): Promise<boolean> {
    const cachedPing = cachedPings[source];
    const timeDifferenceInSeconds = dateDifferenceInSeconds(cachedPing?.timestamp, new Date());

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
 * @returns { isSourceAvailable: boolean; }
 */
export function usePing(source: string, useCachedPing = true, renewCacheSeconds = 30): IntranetCheck {
    const [isSourceAvailable, setIsSourceAvailable] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;

        async function runPing(): Promise<void> {
            const isAvailable = await pingSourceWithCache(source, useCachedPing, renewCacheSeconds);
            if (isMounted) {
                setIsSourceAvailable(isAvailable);
            }
        }
        runPing();

        return (): void => {
            isMounted = false;
        };
    }, [isSourceAvailable, source, useCachedPing, renewCacheSeconds]);

    return { isSourceAvailable };
}
