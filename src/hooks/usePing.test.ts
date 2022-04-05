import { renderHook } from '@testing-library/react-hooks';
import { ping } from '../utils';
import { usePing } from './usePing';

jest.useFakeTimers();

jest.mock('../utils', () => {
    const actual = jest.requireActual('../utils');
    return {
        ...actual,
        ping: jest.fn()
    };
});

describe('usePing()', () => {
    beforeEach(() => {
        (ping as jest.Mock).mockClear();
    });

    it('should ping a given url source and return `true` if it`s available', async () => {
        // given
        expect.assertions(4);
        const useCashedPing = false;
        (ping as jest.Mock).mockResolvedValueOnce(true);
        const source = 'http://my.fav.url.hu';

        // when
        const { result, waitForNextUpdate } = renderHook(() => usePing(source, useCashedPing));
        expect(result.current.isPingLoading).toBe(true);
        await waitForNextUpdate();

        // then
        expect(ping).toHaveBeenCalledTimes(1);
        expect(result.current.isSourceAvailable).toBe(true);
        expect(result.current.isPingLoading).toBe(false);
    });

    it('should ping a given url source and return `false` if it`s not available', async () => {
        // given
        expect.assertions(4);
        const useCashedPing = false;
        (ping as jest.Mock).mockResolvedValueOnce(false);
        const source = 'http://my.fav.url.hu';

        // when
        const { result, waitForNextUpdate } = renderHook(() => usePing(source, useCashedPing));
        expect(result.current.isPingLoading).toBe(true);
        await waitForNextUpdate();

        // then
        expect(ping).toHaveBeenCalledTimes(1);
        expect(result.current.isSourceAvailable).toBe(false);
        expect(result.current.isPingLoading).toBe(false);
    });

    it('should ping a given url source and return with cached values', async () => {
        // given
        expect.assertions(4);
        const useCashedPing = true;
        (ping as jest.Mock).mockResolvedValueOnce(false);
        const source = 'http://my.really-unique.fav.url.hu';

        // when
        const { result, waitForNextUpdate } = renderHook(() => usePing(source, useCashedPing));
        expect(result.current.isPingLoading).toBe(true);
        await waitForNextUpdate();

        renderHook(() => usePing(source, useCashedPing));
        const anotherNextUpdate = renderHook(() => usePing(source, useCashedPing)).waitForNextUpdate;
        await anotherNextUpdate();

        // then
        expect(ping).toHaveBeenCalledTimes(1);
        expect(result.current.isSourceAvailable).toBe(false);
        expect(result.current.isPingLoading).toBe(false);
    });
});
