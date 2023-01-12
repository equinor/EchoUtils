import { fireEvent } from '@testing-library/dom';
import { act, renderHook } from '@testing-library/react';
import { useWindowSize } from './';

// Inspired from https://alexboffey.co.uk/blog/jest-window-mock/
describe('useWindowSize', () => {
    // We need to mock the windows sizes which reside in the global object. This interface will be our mock implementation
    // of the properties under testing from the global object.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customGlobal: any = global;
    customGlobal.innerWidth = 500;
    customGlobal.innerHeight = 800;

    it('Initial values are set as expected', () => {
        // :: Act
        const { result } = renderHook(() => useWindowSize());

        // :: Assert
        expect(result.current.width).toEqual(500);
        expect(result.current.height).toEqual(800);
    });

    it('Resize event updates the size properties', () => {
        // :: Arrange
        const { result } = renderHook(() => useWindowSize());
        customGlobal.innerWidth = 1000;
        customGlobal.innerHeight = 1200;

        // :: Act

        act(() => {
            fireEvent(customGlobal, new Event('resize'));
            /* fire events that update state */
        });
        // :: Assert
        expect(result.current.width).toEqual(1000);
        expect(result.current.height).toEqual(1200);
    });
});
