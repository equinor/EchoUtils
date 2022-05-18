function isIosDevice(): boolean {
    const isIos = navigator.maxTouchPoints > 1 && /iphone|ipad|ipod|macintosh/i.test(navigator.userAgent.toLowerCase());
    return isIos;
}

export const iOs = {
    isIosDevice
};
