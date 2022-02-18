import { ping } from './apiUtils';

describe('ping()', () => {
    let fetchSpy: jest.SpyInstance;
    const mockUrl = 'https://my.fav.url.hu';

    beforeEach(() => {
        if (!window.fetch) {
            Object.defineProperty(window, 'fetch', {
                value: jest.fn()
            });
        }
        fetchSpy = jest.spyOn(window, 'fetch');
    });

    it('should handle successful fetch request', async () => {
        // given
        fetchSpy.mockResolvedValueOnce({ fake: 'response' });

        // when
        const isReachable = await ping(mockUrl);

        // then
        expect(isReachable).toBe(true);
    });

    it('should handle failed fetch request', async () => {
        // given
        fetchSpy.mockRejectedValueOnce({ fake: 'error' });

        // when
        const isReachable = await ping(mockUrl);

        // then
        expect(isReachable).toBe(false);
    });
});
