/**
 * Checks if a given window size is considered as small.
 * Returns `true`, if the windowSize.width <= 550
 * @param windowSize { width?: number; height?: number }
 * @returns {boolean}
 */
export const isSmallScreen = (windowSize: { width?: number; height?: number }): boolean => {
    return !!windowSize.width && windowSize.width <= 550;
};
