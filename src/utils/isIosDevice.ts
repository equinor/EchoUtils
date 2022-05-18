let isIos: boolean | undefined;
function isIosDevice(): boolean {
    if (isIos !== undefined) {
        return isIos;
    }

    isIos = /iphone|ipad|ipod|macintosh/i.test(navigator.userAgent.toLowerCase()) && navigator.maxTouchPoints > 1;
    return isIos;
}

function resetIosDeviceCachedValue() {
    isIos = undefined;
}

export const iOs = {
    isIosDevice,
    resetIosDeviceCachedValue
};
