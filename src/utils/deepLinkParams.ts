export const defaultSearchParams = ['instCode', 'tagNo', 'search'];

type LinkParam = { [key: string]: string | null };

export function getDeepLinkParam<T extends LinkParam>(param: string): Required<T> {
    return getDeepLinkParams([param]);
}

export function getDeepLinkParams<T extends LinkParam>(
    params: Array<keyof LinkParam> = defaultSearchParams
): Required<T> {
    const queryParams = new URLSearchParams(new URL(window.location.href).search);
    const linkParams = {} as LinkParam;
    params.forEach((key) => {
        linkParams[key] = queryParams.get(String(key));
    });
    return linkParams as Required<T>;
}

export const setDeepLinkParam = (param: string, value?: string): void => {
    const queryParams = new URLSearchParams(new URL(window.location.href).search);
    if (value && value.length > 0) {
        queryParams.set(param, value);
    } else {
        queryParams.delete(param);
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${queryParams}`);
};
