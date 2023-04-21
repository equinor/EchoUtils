import { screen } from '@testing-library/dom';
import { render, renderHook } from '@testing-library/react';
import React from 'react';
import { useFocus } from './useFocus';

describe('useFocus()', () => {
    it('should set focus to element containing the returned ref', () => {
        const { result } = renderHook(() => useFocus<HTMLInputElement>());
        const [htmlElRef, setFocus] = result.current;
        render(<input ref={htmlElRef} />);
        setFocus();
        const testDiv = screen.getByRole('textbox');
        expect(document.activeElement).toBe(testDiv);
    });

    it('should not set focus if setFocus is not called', () => {
        const { result } = renderHook(() => useFocus<HTMLInputElement>());
        const [htmlElRef] = result.current;
        render(<input ref={htmlElRef} />);
        const testDiv = screen.getByRole('textbox');
        expect(document.activeElement).not.toBe(testDiv);
    });
});
