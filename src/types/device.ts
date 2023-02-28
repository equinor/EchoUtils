export type SupportedPlatforms = 'Android' | 'Linux' | 'MacOs' | 'iOS' | 'iPadOS' | 'Windows' | 'Platform not found.';

export type DetailedDeviceInformation = {
    operatingSystem: string;
    webBrowser: string;
    deviceModel: string;
    platform?: SupportedPlatforms;
};

export type IDeepDeviceInformation = {
    operatingSystem: string;
    webBrowser: string;
    deviceModel: string;
    platform?: SupportedPlatforms;
};

/** If the viewport is a square, then the orientation will be portrait. */
export type ScreenOrientation = 'portrait' | 'landscape';

/** Keep in mind, this is calculated when the page loads, so be sure to do refresh if simulating a device in DevTools. */
export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type UserInput = 'touch' | 'mouse';
export type Browser = 'Chrome' | 'Safari' | 'Firefox' | 'Edge' | 'Opera';

type Dimensions = { width: number; height: number };
export type ScreenDimensions = {
    /** Provides measurements for use in the visual viewport.
     *
     * The visual viewport is the currently visible viewport and these dimensions
     * can be smaller than the layout viewport if, for example, the user has pinch zoomed or summoned their
     * on-screen keyboards.
     */
    visual: Dimensions;

    /**
     * Provides measurements for the layout viewport. These values are always fetched from
     * innerHeight and innerWidth, so scrollbars are included.
     */
    layout?: Dimensions;

    /** Provides measurements for use in fullscreen contexts. */
    fullscreen?: FullscreenDimensions;
};

export type FullscreenDimensions = {
    /** The total screen dimensions, essentially equal to the screen resolution configured in OS settings.*/
    total: Dimensions;
    /** The available screen dimensions, taking into account overlays such as browser address bar or virtual keyboard. */
    available: Dimensions;
};

export interface IDeviceSummary {
    orientation: ScreenOrientation;
    deviceType: DeviceType;
    userInput: UserInput;
    screenDimensions: ScreenDimensions;
    deepInfo: IDeepDeviceInformation;
}
