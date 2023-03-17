import { act, cleanup, renderHook } from '@testing-library/react/pure';
import { useState } from 'react';
import { useStateSafe } from './useStateSafe';

jest.mock('react', () => {
    const actual = jest.requireActual('react');
    return {
        ...actual,
        useState: jest.fn()
    };
});

describe('useStateSafe()', () => {
    it('should do state updates while it is mounted', () => {
        // given
        const useStateSetterSpy = jest.fn();
        (useState as jest.Mock).mockReturnValueOnce(['customValue', useStateSetterSpy]);

        // when
        const { result } = renderHook(() => useStateSafe('random value'));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [customValue, setCustomValue] = result.current;
        act(() => {
            setCustomValue('another random value');
        });

        // then
        expect(useStateSetterSpy).toHaveBeenCalledTimes(1);
        cleanup();
    });

    it('should not do any state updates while it is not mounted', () => {
        // given
        const useStateSetterSpy = jest.fn();
        (useState as jest.Mock).mockReturnValueOnce(['customValue', useStateSetterSpy]);

        // when
        const { result } = renderHook(() => useStateSafe('random value'));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [customValue, setCustomValue] = result.current;
        cleanup();
        act(() => {
            setCustomValue('another random value');
        });

        // then
        expect(useStateSetterSpy).toHaveBeenCalledTimes(0);
    });
});
