import { getDeepLinkParams, setDeepLinkParams } from '../../utils';

describe('getDeepLinkParams', () => {
    it('Should return instance code with correct value', () => {
        const instCode = 'JSV';
        const url = `/?instCode=${instCode}`;

        window.history.pushState({}, 'title', url);
        const queryParams = getDeepLinkParams(['instCode']);

        expect(queryParams).toStrictEqual({ instCode });
    });

    it('Should return multiple query params with correct value', () => {
        const instCode = 'JSV';
        const searchTerm = 'PT';
        const url = `/?instCode=${instCode}&search=${searchTerm}`;
        window.history.pushState({}, 'title', url);

        const queryParams = getDeepLinkParams(['instCode', 'search']);

        expect(queryParams).toStrictEqual({ instCode, search: searchTerm });
    });

    it('Should return multiple query params with correct value, and null if search param is not present', () => {
        const instCode = 'JSV';
        const searchTerm = 'PT';
        const url = `/?instCode=${instCode}&search=${searchTerm}`;
        window.history.pushState({}, 'title', url);

        const queryParams = getDeepLinkParams(['instCode', 'search', 'tagNo']);

        expect(queryParams).toStrictEqual({ instCode, search: searchTerm, tagNo: null });
    });

    it('Should return default query params with correct values', () => {
        const instCode = 'JSV';
        const searchTerm = 'PT';
        const url = `/?instCode=${instCode}&search=${searchTerm}`;
        window.history.pushState({}, 'title', url);

        const queryParams = getDeepLinkParams();

        expect(queryParams).toStrictEqual({ instCode, search: searchTerm, tagNo: null });
    });
});

describe('setDeepLinkParams', () => {
    it('Should update url with new query param', () => {
        const instCode = 'JSV';
        const url = `/?instCode=${instCode}`;
        window.history.pushState({}, 'title', url);

        const queryParam = 'search';
        const queryValue = 'PT';
        setDeepLinkParams(queryParam, queryValue);
        expect(window.location.href).toContain(`${queryParam}=${queryValue}`);
    });

    it('Should update url by removing query param', () => {
        const instCode = 'JSV';
        const url = `/?instCode=${instCode}`;
        window.history.pushState({}, 'title', url);

        const queryParam = 'instCode';
        setDeepLinkParams(queryParam);
        expect(window.location.href).not.toContain(url);
    });
});
