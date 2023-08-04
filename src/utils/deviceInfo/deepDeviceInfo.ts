import UAParser from 'ua-parser-js';
import { DetailedDeviceInformation, DeviceType, SupportedPlatforms } from '../../types/device';

interface DetailedDeviceInformationParserProps {
    deviceInformation: DetailedDeviceInformation;
    uaDataValues?: UADataValues;
    uaParser: UAParser;
}

/**
 * This object is concerned with gathering and holding information about the users device.
 * This object will be read-only after initialization and should as a rule throw errors if the
 * deviceInformation property is altered after intialization.
 */
class DetailedDeviceInformationProvider {
    /**
     * Represents the user agent string parser.
     * This method is treated as a fallback if the User-Agent Client Hints API does not provide a coherent value
     * or if the browser does not yet support it.
     */
    private readonly _uaParser: UAParser;

    /**
     * Stores the system report from a call to the underlying system.
     * More info: https://developer.mozilla.org/en-US/docs/Web/API/User-Agent_Client_Hints_API
     */
    private readonly _uaDataValues: UADataValues | undefined = undefined;

    /* * Holds the current device information and should be the single source of truth. */
    private readonly _deviceInformation: DetailedDeviceInformation;

    private constructor(props: DetailedDeviceInformationParserProps) {
        this._deviceInformation = props.deviceInformation;
        this._uaDataValues = props.uaDataValues;
        this._uaParser = props.uaParser;
    }

    get deviceInformation(): DetailedDeviceInformation {
        return this._deviceInformation;
    }

    get uaDataValues() {
        return this._uaDataValues;
    }

    get uaParser() {
        return this._uaParser;
    }

    /** Constructs the parser and returns it.  */
    static initialize(): DetailedDeviceInformationProvider {
        // Assign essentially an alias for readability.
        const DDIP = DetailedDeviceInformationProvider;
        const navigatorUAData: NavigatorUAData | undefined = navigator?.userAgentData;
        const uaParser = new UAParser(navigator.userAgent);
        let deviceInformation: DetailedDeviceInformation | undefined;

        if (!navigatorUAData) {
            deviceInformation = createUAParserExclusively(uaParser);
        } else {
            deviceInformation = createClientHintsWithUAParserFallback(navigatorUAData, uaParser);
        }

        // Call constructor and return the thin-air object.
        return new DDIP({
            deviceInformation: deviceInformation,
            uaDataValues: navigatorUAData,
            uaParser: uaParser
        });

        function createClientHintsWithUAParserFallback(navigatorUAData: NavigatorUAData, uaParser: UAParser) {
            // User-Agent Client Hints API is supported and initialized, use it with fallbacks to US parsing if we get falseys to specific props.
            let webBrowser = DDIP.getWebBrowser(navigatorUAData);
            if (webBrowser.length === 0) webBrowser = DDIP.getWebBrowser(uaParser);

            let operatingSystem = DDIP.getOperatingSystem(navigatorUAData);
            if (operatingSystem.length === 0) operatingSystem = DDIP.getOperatingSystem(uaParser);

            const deviceModel = DDIP.getDeviceModel(uaParser);

            let platform = DDIP.getPlatform(navigatorUAData);
            if (!platform) platform = DDIP.getPlatform(uaParser);

            const deviceType = DDIP.getDeviceType(uaParser);

            return {
                webBrowser: webBrowser || 'Web browser not found.',
                operatingSystem: operatingSystem || 'Operating system not found',
                deviceModel: deviceModel || 'Device model not found',
                platform: platform || 'Platform not found',
                deviceType: deviceType || 'Device type not found'
            } as DetailedDeviceInformation;
        }

        function createUAParserExclusively(uaParser: UAParser): DetailedDeviceInformation {
            return {
                deviceModel: DDIP.getDeviceModel(uaParser) || 'Device model not found',
                operatingSystem: DDIP.getOperatingSystem(uaParser) || 'Operating system not found',
                webBrowser: DDIP.getWebBrowser(uaParser) || 'Web browser not found',
                platform: DDIP.getPlatform(uaParser) || 'Platform not found',
                deviceType: DDIP.getDeviceType(uaParser) || 'Device type not found'
            };
        }
    }

    private static getPlatform(dataOrigin: UAParser | UALowEntropyJSON): SupportedPlatforms | undefined {
        let platform: string | undefined;
        if (dataOrigin instanceof UAParser) {
            platform = dataOrigin.getBrowser().name;
        } else {
            platform = dataOrigin.platform;
        }
        return platform && isSupportedPlatform(platform) ? platform : undefined;

        function isSupportedPlatform(target: string): target is SupportedPlatforms {
            switch (target.toLowerCase()) {
                case 'android':
                case 'linux':
                case 'macos':
                case 'ios':
                case 'windows':
                case 'ipados':
                    return true;
                default:
                    return false;
            }
        }
    }

    private static getWebBrowser(dataOrigin: UAParser | UALowEntropyJSON): string {
        if (dataOrigin instanceof UAParser) {
            const { name, version } = dataOrigin.getBrowser();
            if (!name && !version) return '';
            return `${name} ${version}`;
        }

        const browsers = dataOrigin.brands;
        if (browsers?.length === 0) return '';
        let browserNameVersion = '';

        browsers?.forEach((browser) => (browserNameVersion += `${browser.brand} ${browser.version};`));
        browserNameVersion = browserNameVersion.substring(0, browserNameVersion.length - 1);

        return browserNameVersion;
    }

    private static getOperatingSystem(dataOrigin: UAParser | UALowEntropyJSON): string {
        if (dataOrigin instanceof UAParser) {
            const { name: osName, version: osVersion } = dataOrigin.getOS();
            if (!osName && !osVersion) return '';
            return `${osName || ''} ${osVersion || ''}`.trim();
        }

        const OS = dataOrigin.platform;
        if (!OS) return '';
        return OS;
    }

    /**
     * TODO: Get the device model from Client Hints API.
     * This requires top-level await support, which in turn has to be implemented to modules downstream.
     */
    private static getDeviceModel(dataOrigin: UAParser): string {
        const { model, vendor } = dataOrigin.getDevice();
        if (!model && !vendor) return '';
        return `${model} ${vendor}`;
    }

    private static getDeviceType(dataOrigin: UAParser): DeviceType {
        const deviceType = dataOrigin.getDevice().type;
        if (deviceType) {
            if (deviceType.includes('mobile')) {
                return 'mobile';
            }
            if (deviceType.includes('tablet')) {
                return 'tablet';
            }
        }
        return 'desktop';
    }
}

const detailedDeviceInformationProvider = DetailedDeviceInformationProvider.initialize();
export { DetailedDeviceInformationProvider, detailedDeviceInformationProvider };
