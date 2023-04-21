/** Creates a base mock implementation of matchMedia.
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
 */
function mockMatchMedia() {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn()
        }))
    });
}

/** Creates a base mock implementation of the layout viewport dimensions at 1080p. */
function mockLayoutDimensions() {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1920 });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1080 });
}

/**
 * Creates a base mock of the visual viewport at 1080p
 * https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport
 */
function mockVisualViewport() {
    Object.defineProperty(window, 'visualViewport', {
        writable: true,
        configurable: true,
        value: {
            height: 1080,
            offsetLeft: 0,
            offsetTop: 0,
            onresize: jest.fn(),
            onscroll: jest.fn(),
            pageLeft: 0,
            pageTop: 0,
            scale: 1,
            width: 1920
        }
    });
}

/**
 * Creates a base mock of the Screen property at 1080p.
 * https://developer.mozilla.org/en-US/docs/Web/API/Screen
 */
function mockScreen() {
    Object.defineProperty(window, 'screen', {
        writable: true,
        configurable: true,
        value: {
            availHeight: 1080,
            availLeft: 1920,
            availTop: 0,
            availWidth: 1920,
            colorDepth: 24,
            height: 1080,
            isExtended: false,
            onchange: jest.fn(),
            orientation: {
                angle: 0,
                onchange: jest.fn(),
                type: 'landscape-primary'
            },
            pixelDepth: 24,
            width: 1920
        }
    });
}

mockMatchMedia();
mockLayoutDimensions();
mockVisualViewport();
mockScreen();
