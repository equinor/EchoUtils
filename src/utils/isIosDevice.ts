function isIosDevice(): boolean {
    const isIos = /iphone|ipad|ipod|macintosh/i.test(navigator.userAgent.toLowerCase()) && navigator.maxTouchPoints > 1;
    return isIos;
}

export const iOs = {
    isIosDevice
};
