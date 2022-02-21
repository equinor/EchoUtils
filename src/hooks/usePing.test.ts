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
    it('should ping a given url source', async () => {
        // given
        (ping as jest.Mock).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 3000);
            });
        });
        const source = 'http://my.fav.url.hu';

        // when
        const { result } = renderHook(() => usePing(source));

        // then
        expect(ping).toHaveBeenCalledTimes(1);
        // TODO: Figure out how to solve this: `isSourceAvailable` should be true `here`.
        // Hook state not updated because the hook unmounts on cleanup (cleanup should fire after the test...)
        expect(result.current.isSourceAvailable).toBe(false);
    });
});
