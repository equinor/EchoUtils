import { DetailedDeviceInformationProvider } from '../deepDeviceInfo';
import { DeviceInformation } from '../deviceInfo';

beforeAll(() => {
    if (!window.navigator) {
        Object.defineProperty(window, 'navigator', { value: { userAgent: '' }, writable: true, configurable: true });
    }
});

describe('A browser that doesnt support userAgentData', () => {
    test('Simulated iPhone Safari 16.', () => {
        const mockedUserAgent =
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1';
        setupUserAgent(mockedUserAgent);

        const detailedDeviceInfo = DetailedDeviceInformationProvider.initialize();
        expect(detailedDeviceInfo.deviceInformation.deviceModel).toBe('iPhone Apple');
        expect(detailedDeviceInfo.deviceInformation.operatingSystem).toBe('iOS 16.0');
        expect(detailedDeviceInfo.deviceInformation.platform).toBe('Platform not found');
        expect(detailedDeviceInfo.deviceInformation.webBrowser).toBe('Mobile Safari 16.0');

        const deviceInfo = new DeviceInformation({ detailedDeviceInfo });
        expect(deviceInfo.browser).toBe('Safari');
        expect(deviceInfo.deviceType).toBe('mobile');
        expect(deviceInfo.screenDimensions).toBeDefined();
    });

    test('Simulated iPad Mini Safari 16.', () => {
        const mockedUserAgent =
            'Mozilla/5.0 (iPad; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1';
        setupUserAgent(mockedUserAgent);
        const detailedDeviceInfo = DetailedDeviceInformationProvider.initialize();

        expect(detailedDeviceInfo.deviceInformation.deviceModel).toBe('iPad Apple');
        expect(detailedDeviceInfo.deviceInformation.operatingSystem).toBe('iOS 16.0');
        expect(detailedDeviceInfo.deviceInformation.platform).toBe('Platform not found');
        expect(detailedDeviceInfo.deviceInformation.webBrowser).toBe('Mobile Safari 16.0');

        const deviceInfo = new DeviceInformation({ detailedDeviceInfo });
        expect(deviceInfo.browser).toBe('Safari');
        expect(deviceInfo.deviceType).toBe('tablet');
        expect(deviceInfo.screenDimensions).toBeDefined();
    });

    test('Simulated MacBook Safari 16.2', () => {
        const mockedUserAgent =
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15';
        setupUserAgent(mockedUserAgent);
        const detailedDeviceInfo = DetailedDeviceInformationProvider.initialize();

        expect(detailedDeviceInfo.deviceInformation.deviceModel).toBe('Macintosh Apple');
        expect(detailedDeviceInfo.deviceInformation.operatingSystem).toBe('Mac OS 10.15.7');
        expect(detailedDeviceInfo.deviceInformation.platform).toBe('Platform not found');
        expect(detailedDeviceInfo.deviceInformation.webBrowser).toBe('Safari 16.2');

        const deviceInfo = new DeviceInformation({ detailedDeviceInfo });
        expect(deviceInfo.browser).toBe('Safari');
        expect(deviceInfo.deviceType).toBe('desktop');
        expect(deviceInfo.screenDimensions).toBeDefined();
    });

    test('Simulated Linux desktop running Firefox 112', () => {
        const mockedUserAgent = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/112.0';
        setupUserAgent(mockedUserAgent);

        const detailedDeviceInfo = DetailedDeviceInformationProvider.initialize();
        expect(detailedDeviceInfo.deviceInformation.deviceModel).toBe('Device model not found');
        expect(detailedDeviceInfo.deviceInformation.operatingSystem).toBe('Ubuntu');
        expect(detailedDeviceInfo.deviceInformation.platform).toBe('Platform not found');
        expect(detailedDeviceInfo.deviceInformation.webBrowser).toBe('Firefox 112.0');

        const deviceInfo = new DeviceInformation({ detailedDeviceInfo });
        expect(deviceInfo.browser).toBe('Firefox');
        expect(deviceInfo.deviceType).toBe('desktop');
        expect(deviceInfo.screenDimensions).toBeDefined();
    });

    test('Simulated Android device running Firefox 116', () => {
        const mockedUserAgent = 'Mozilla/5.0 (Android 13; Mobile; rv:109.0) Gecko/116.0 Firefox/116.0';
        setupUserAgent(mockedUserAgent);

        const detailedDeviceInfo = DetailedDeviceInformationProvider.initialize();
        expect(detailedDeviceInfo.deviceInformation.deviceModel).toBe('Device model not found');
        expect(detailedDeviceInfo.deviceInformation.operatingSystem).toBe('Android 13');
        expect(detailedDeviceInfo.deviceInformation.platform).toBe('Platform not found');
        expect(detailedDeviceInfo.deviceInformation.webBrowser).toBe('Firefox 116.0');

        const deviceInfo = new DeviceInformation({ detailedDeviceInfo });
        expect(deviceInfo.browser).toBe('Firefox');
        expect(deviceInfo.deviceType).toBe('mobile');
        expect(deviceInfo.screenDimensions).toBeDefined();
    });

    test('Simulated Samsung device running Samsung Internet', () => {
        const mockedUserAgent =
            'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Mobile Safari/537.36';
        setupUserAgent(mockedUserAgent);

        const detailedDeviceInfo = DetailedDeviceInformationProvider.initialize();
        expect(detailedDeviceInfo.deviceInformation.deviceModel).toBe('SM-G973U Samsung');
        expect(detailedDeviceInfo.deviceInformation.operatingSystem).toBe('Android 11');
        expect(detailedDeviceInfo.deviceInformation.platform).toBe('Platform not found');
        expect(detailedDeviceInfo.deviceInformation.webBrowser).toBe('Samsung Browser 14.2');

        const deviceInfo = new DeviceInformation({ detailedDeviceInfo });
        expect(deviceInfo.deviceType).toBe('mobile');
        expect(deviceInfo.browser).toBe('Samsung Internet');
    });
});

type MockedNavigatorUAData = Pick<NavigatorUAData, 'brands' | 'mobile' | 'platform'>;

describe('A browser that supports userAgentData', () => {
    beforeAll(() => {
        Object.defineProperty(window.navigator, 'userAgentData', { value: undefined, writable: true });
    });

    test('Simulated MacBook device running Chrome 112', () => {
        // Setup
        const mockedUserAgent =
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36';
        setupUserAgent(mockedUserAgent);
        const mockedUserAgentData: MockedNavigatorUAData = {
            platform: 'macOS',
            mobile: false,
            brands: [
                { brand: 'Chromium', version: '112' },
                { brand: 'Google Chrome', version: '112' },
                { brand: 'Not:A-Brand', version: '99' }
            ]
        };
        setupUserAgentData(mockedUserAgentData);

        // Test device details
        const detailedDeviceInfo = DetailedDeviceInformationProvider.initialize();
        expect(detailedDeviceInfo.deviceInformation.deviceModel).toBe('Macintosh Apple');
        expect(detailedDeviceInfo.deviceInformation.operatingSystem).toBe('macOS');
        expect(detailedDeviceInfo.deviceInformation.platform).toBe('macOS');
        expect(detailedDeviceInfo.deviceInformation.webBrowser).toBe('Chromium 112;Google Chrome 112;Not:A-Brand 99');

        // Test device summary
        const deviceInfo = new DeviceInformation({ detailedDeviceInfo });
        expect(deviceInfo.browser).toBe('Chrome');
        expect(deviceInfo.deviceType).toBe('desktop');
        expect(deviceInfo.screenDimensions).toBeDefined();
    });

    test('Simulated Goggle Pixel 5 device running Chrome 112', () => {
        const mockedUserAgent =
            'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36';
        setupUserAgent(mockedUserAgent);

        const mockedUserAgentData: MockedNavigatorUAData = {
            platform: 'Android',
            mobile: true,
            brands: [
                {
                    brand: 'Chromium',
                    version: '112'
                },
                {
                    brand: 'Google Chrome',
                    version: '112'
                },
                { brand: 'Not:A-Brand', version: '99' }
            ]
        };
        setupUserAgentData(mockedUserAgentData);

        const detailedDeviceInfo = DetailedDeviceInformationProvider.initialize();
        expect(detailedDeviceInfo.deviceInformation.deviceModel).toBe('Pixel 5 Google');
        expect(detailedDeviceInfo.deviceInformation.operatingSystem).toBe('Android');
        expect(detailedDeviceInfo.deviceInformation.platform).toBe('Android');
        expect(detailedDeviceInfo.deviceInformation.webBrowser).toBe('Chromium 112;Google Chrome 112;Not:A-Brand 99');

        const deviceInfo = new DeviceInformation({ detailedDeviceInfo });
        expect(deviceInfo.browser).toBe('Chrome');
        expect(deviceInfo.deviceType).toBe('mobile');
        expect(deviceInfo.screenDimensions).toBeDefined();
    });

    test('Simulated Windows 11 device running Chrome 112', () => {
        const mockedUserAgent =
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36';
        setupUserAgent(mockedUserAgent);

        const mockedUserAgentData: MockedNavigatorUAData = {
            platform: 'Windows',
            mobile: false,
            brands: [
                {
                    brand: 'Chromium',
                    version: '112'
                },
                {
                    brand: 'Google Chrome',
                    version: '112'
                },
                { brand: 'Not:A-Brand', version: '99' }
            ]
        };
        setupUserAgentData(mockedUserAgentData);

        const detailedDeviceInfo = DetailedDeviceInformationProvider.initialize();
        expect(detailedDeviceInfo.deviceInformation.deviceModel).toBe('Device model not found');
        expect(detailedDeviceInfo.deviceInformation.operatingSystem).toBe('Windows');
        expect(detailedDeviceInfo.deviceInformation.platform).toBe('Windows');
        expect(detailedDeviceInfo.deviceInformation.webBrowser).toBe('Chromium 112;Google Chrome 112;Not:A-Brand 99');

        const deviceInfo = new DeviceInformation({ detailedDeviceInfo });
        expect(deviceInfo.browser).toBe('Chrome');
        expect(deviceInfo.deviceType).toBe('desktop');
        expect(deviceInfo.screenDimensions).toBeDefined();
    });
});

function setupUserAgent(userAgent: string) {
    Object.defineProperty(window.navigator, 'userAgent', { value: userAgent, writable: true });
}

function setupUserAgentData(data: MockedNavigatorUAData) {
    Object.defineProperty(window.navigator, 'userAgentData', { value: data });
}
