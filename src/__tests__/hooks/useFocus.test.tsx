import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { useFocus } from '../../hooks/useFocus';

test('should set focus to element containing the returned ref', () => {
    const { result } = renderHook(() => useFocus<HTMLInputElement>());
    const [htmlElRef, setFocus] = result.current;
    render(<input ref={htmlElRef} />);
    setFocus();
    const testDiv = screen.getByRole('textbox');
    expect(document.activeElement).toBe(testDiv);
});

test('should not set focus if setFocus is not called', () => {
    const { result } = renderHook(() => useFocus<HTMLInputElement>());
    const [htmlElRef] = result.current;
    render(<input ref={htmlElRef} />);
    const testDiv = screen.getByRole('textbox');
    expect(document.activeElement).not.toBe(testDiv);
});
