import { renderHook, waitFor } from '@testing-library/react';
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
        const useCashedPing = false;
        (ping as jest.Mock).mockResolvedValueOnce(true);
        const source = 'http://my.fav.url.hu';

        // when
        const { result } = renderHook(() => usePing(source, useCashedPing));

        expect(result.current.isPingLoading).toBe(true);

        // then
        await waitFor(() => {
            expect(ping).toHaveBeenCalledTimes(1);
            expect(result.current.isSourceAvailable).toBe(true);
            expect(result.current.isPingLoading).toBe(false);
        });
    });

    it('should ping a given url source and return `false` if it`s not available', async () => {
        // given
        const useCashedPing = false;
        (ping as jest.Mock).mockResolvedValueOnce(false);
        const source = 'http://my.fav.url.hu';

        // when
        const { result } = renderHook(() => usePing(source, useCashedPing));
        expect(result.current.isPingLoading).toBe(true);

        // then
        await waitFor(() => {
            expect(ping).toHaveBeenCalledTimes(1);
            expect(result.current.isSourceAvailable).toBe(false);
            expect(result.current.isPingLoading).toBe(false);
        });
    });

    it('should ping a given url source and return with cached values', async () => {
        // given
        const useCashedPing = true;
        (ping as jest.Mock).mockResolvedValueOnce(false);
        const source = 'http://my.really-unique.fav.url.hu';

        // when
        const { result } = renderHook(() => usePing(source, useCashedPing));
        expect(result.current.isPingLoading).toBe(true);

        renderHook(() => usePing(source, useCashedPing));

        // then
        await waitFor(() => {
            expect(ping).toHaveBeenCalledTimes(1);
            expect(result.current.isSourceAvailable).toBe(false);
            expect(result.current.isPingLoading).toBe(false);
        });
    });
});
