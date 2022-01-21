import { calculateBrighterHexColor, getColorStatusFromString, hexColorToRgb, stringToColour } from './color';

describe('stringToColour()', () => {
    it('should generate a color in hexa format from a given string', () => {
        // given

        // when
        const generatedColor = stringToColour('random-string');

        // then
        expect(generatedColor).toEqual('#b4b097');
    });

    it('should generate a color in hexa format from a given string', () => {
        // given

        // when
        const generatedColor = stringToColour('another-random-string');

        // then
        expect(generatedColor).toEqual('#493cf2');
    });
});

describe('getColorStatusFromString()', () => {
    const mockComputedStyleColor = '#ffffff-mock-color-hexa-value';
    let getPropertyValueSpy;
    beforeEach(() => {
        getPropertyValueSpy = jest.fn((): string => mockComputedStyleColor);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jest.spyOn(window, 'getComputedStyle').mockImplementation((): any => ({
            getPropertyValue: getPropertyValueSpy
        }));
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    it('should return with `unknown` value when there`s no string param passed', () => {
        // given
        const stringToPass = undefined;

        // when
        const generatedColor = getColorStatusFromString(stringToPass);

        // then
        expect(generatedColor).toBe(mockComputedStyleColor);
        expect(window.getComputedStyle).toHaveBeenCalled();
        expect(getPropertyValueSpy).toHaveBeenCalledWith('--unknown');
    });

    it('should return with a hexa color when a status string param is passed', () => {
        // given

        // when
        const generatedColor = getColorStatusFromString('some-random-string');

        // then
        expect(generatedColor).toBe('#fcbca9');
    });
});

describe('hexColorToRgb', () => {
    it('should return the correct RGB values based on the 7-char #hex code', () => {
        expect(hexColorToRgb('#000000')).toStrictEqual({ r: 0, g: 0, b: 0 });
        expect(hexColorToRgb('#FFFFFF')).toStrictEqual({ r: 255, g: 255, b: 255 });
    });

    it('should return the correct RGB values based on the 6-char hex code', () => {
        expect(hexColorToRgb('F00000')).toStrictEqual({ r: 240, g: 0, b: 0 });
    });

    it('should return undefined based on the invalid hex code', () => {
        expect(hexColorToRgb('F000000')).toBe(undefined);
    });
    it('should fallback to specified RGB color if invalid hex code', () => {
        const fallbackColor = { r: 240, g: 0, b: 0 };
        expect(hexColorToRgb('F000000', fallbackColor)).toBe(fallbackColor);
    });
});

describe('calculateBrighterHexColor', () => {
    it('should return the correct brighter hex code based on given percentage', () => {
        const redHex = '#ff0000';
        const expectedFiftyPercentBrighterRedHex = '#ff8080';
        expect(calculateBrighterHexColor(redHex, 50)).toBe(expectedFiftyPercentBrighterRedHex);
    });

    it('should return undefined if an invalid hex code is given', () => {
        const invalidHex = 'Not a hex code';
        expect(calculateBrighterHexColor(invalidHex, 50)).toBe(undefined);
    });

    it('should fallback to specified hex code if hexColor argument is undefined', () => {
        const invalidHex = 'Not a hex code';
        const fallbackHex = '#aabbcc';
        expect(calculateBrighterHexColor(invalidHex, 50, fallbackHex)).toBe(fallbackHex);
    });
});
