/**
 * Ping a given url.
 * @param url {string} Url to ping.
 * @returns {boolean} If the given url is reachable or not
 */
export const ping = async (url: string): Promise<boolean> => {
    let isReachable = false;
    try {
        const response: Response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
            cache: 'no-store'
        });
        if (response) {
            isReachable = true;
        }
    } catch (error) {
        return isReachable;
    }

    return isReachable;
};
