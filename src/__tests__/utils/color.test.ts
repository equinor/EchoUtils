import { getColorStatusFromString, stringToColour } from '../../utils/color';

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
