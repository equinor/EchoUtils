import { getDeepLinkParams } from '../../utils';

let windowSpy;

describe('getDeepLinkParams', () => {
    beforeEach(() => {
        windowSpy = jest.spyOn(window, 'window', 'get');
    });

    afterEach(() => {
        windowSpy.mockRestore();
    });

    it('Should return instance code with correct value', () => {
        const instCode = 'JSV';
        const url = `https://localhost:3000/?instCode=${instCode}`;
        windowSpy.mockImplementation(() => ({
            location: {
                href: url
            }
        }));
        const queryParams = getDeepLinkParams(['instCode']);

        expect(queryParams).toStrictEqual({ instCode });
    });

    it('Should return multiple query params with correct value', () => {
        const instCode = 'JSV';
        const searchTerm = 'PT';
        const url = `https://localhost:3000/?instCode=${instCode}&search=${searchTerm}`;
        windowSpy.mockImplementation(() => ({
            location: {
                href: url
            }
        }));

        const queryParams = getDeepLinkParams(['instCode', 'search']);

        expect(queryParams).toStrictEqual({ instCode, search: searchTerm });
    });

    it('Should return multiple query params with correct value, and null if search param is not present', () => {
        const instCode = 'JSV';
        const searchTerm = 'PT';
        const url = `https://localhost:3000/?instCode=${instCode}&search=${searchTerm}`;
        windowSpy.mockImplementation(() => ({
            location: {
                href: url
            }
        }));

        const queryParams = getDeepLinkParams(['instCode', 'search', 'tagNo']);

        expect(queryParams).toStrictEqual({ instCode, search: searchTerm, tagNo: null });
    });
});
