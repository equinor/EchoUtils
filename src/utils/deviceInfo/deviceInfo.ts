import {
    Browser,
    DetailedDeviceInformation,
    DeviceType,
    IDeviceSummary,
    ScreenDimensions,
    ScreenOrientation,
    UserInput
} from '../../types/device';
import { detailedDeviceInformationProvider } from './deepDeviceInfo';

type Props = { detailedDeviceInfo: typeof detailedDeviceInformationProvider };

class DeviceInformation {
    /**
     * Represents the current viewport orientation.
     * If the viewport is square, it will default to portrait.
     */
    private _orientation: ScreenOrientation;

    /**
     * Represents an abstracted device type: desktop, tablet or mobile.
     */
    private readonly _deviceType: DeviceType;

    /**
     * Represents the current input source.
     * Note: On a touchscreen device which has a mouse plugged in, it will return the mouse.
     */
    private readonly _userInput: UserInput;

    private readonly _browser?: Browser;

    /**
     * Represents the viewport (layout and visual) and (full)screen dimensions.
     * WebKit browsers prior to 15 will only support layout dimensions.
     */
    private _dimensions: ScreenDimensions;

    // MediaQueryLists
    protected orientationIsLandscapeQuery: MediaQueryList;

    private _detailedDeviceInfo: typeof detailedDeviceInformationProvider;

    constructor(props: Props) {
        this._detailedDeviceInfo = props.detailedDeviceInfo;
        this.orientationIsLandscapeQuery = window.matchMedia('(orientation: landscape)');

        this._userInput = this.getUserInput();
        this._deviceType = this.getDeviceType();
        this._dimensions = this.getUpdatedScreenDimensions();
        this._orientation = this.getOrientation();
        this._browser = this.getBrowser();

        // TODO: Once ScreenOrientation API is supported on Safari, this event can be removed.
        this.orientationIsLandscapeQuery.addEventListener('change', () => (this._orientation = this.getOrientation()));
    }

    private getUpdatedScreenDimensions(): ScreenDimensions {
        const updatedDimensions = {
            width: window.innerWidth,
            height: window.innerHeight,
            visual: window.visualViewport
                ? {
                      width: window.visualViewport.width,
                      height: window.visualViewport?.height
                  }
                : undefined,
            fullscreen: window.screen
                ? {
                      available: {
                          width: window.screen.availWidth,
                          height: window.screen.availHeight
                      },
                      total: {
                          width: window.screen.width,
                          height: window.screen.height
                      }
                  }
                : undefined
        } as ScreenDimensions;
        this._dimensions = updatedDimensions;
        return updatedDimensions;
    }

    private getBrowser(): Browser | undefined {
        const browser = this._detailedDeviceInfo.deviceInformation.webBrowser.toLowerCase();
        if (browser.includes('chrome') || browser.includes('chromium')) return 'Chrome';
        if (browser.includes('firefox')) return 'Firefox';
        if (browser.includes('opera')) return 'Opera';
        if (browser.includes('safari')) return 'Safari';
        if (browser.includes('edge')) return 'Edge';
        if (browser.includes('samsung')) return 'Samsung Internet';

        return undefined;
    }

    private getUserInput() {
        const usingTouchQuery = window.matchMedia('(pointer: coarse)');
        return usingTouchQuery.matches ? 'touch' : 'mouse';
    }

    /** Returns the current viewing medium.*/
    private getDeviceType(): DeviceType {
        return this._detailedDeviceInfo.deviceInformation.deviceType;
    }

    private getOrientation(): ScreenOrientation {
        if (this.orientationIsLandscapeQuery.matches) return 'landscape';
        else return 'portrait';
    }

    getDeviceDetails(): DetailedDeviceInformation {
        return this._detailedDeviceInfo.deviceInformation;
    }

    get platform() {
        const deviceInfo = this._detailedDeviceInfo.deviceInformation;
        return deviceInfo.platform;
    }

    get orientation() {
        return this._orientation;
    }

    get deviceType() {
        return this.getDeviceType();
    }

    get userInput() {
        return this._userInput;
    }

    get screenDimensions(): ScreenDimensions {
        return this.getUpdatedScreenDimensions();
    }

    get browser(): Browser | undefined {
        return this._browser;
    }

    getDeviceSummary(): IDeviceSummary {
        return {
            orientation: this.orientation,
            deviceType: this.deviceType,
            userInput: this.userInput,
            screenDimensions: this.screenDimensions,
            deepInfo: this.getDeviceDetails()
        };
    }
}

const deviceInfo = new DeviceInformation({
    detailedDeviceInfo: detailedDeviceInformationProvider
});

export { DeviceInformation, deviceInfo };
