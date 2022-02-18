import React, { FC } from 'react';
import { screen } from '@testing-library/dom';
import { render, fireEvent } from '@testing-library/react';
import { Callback } from '../../types/useOnOutsideClick';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';

interface Props {
    callback: Callback;
}

const TestComponent: FC<Props> = ({ callback }: Props) => {
    const ref = useOnOutsideClick(callback);
    return (
        <>
            <div data-testid="inside" ref={ref}>
                <div data-testid="nested-inside" />
            </div>
            <div data-testid="outside" />
        </>
    );
};

const renderHelper = (): (() => void) => {
    const cb = jest.fn();
    render(<TestComponent callback={cb} />);

    return cb;
};

test('should trigger callback function on outside click', () => {
    const cb = renderHelper();
    const outside = screen.getByTestId('outside');

    fireEvent.mouseDown(outside);

    expect(cb).toHaveBeenCalled();
});

test('should not trigger callback function on inside or nested inside click', () => {
    const cb = renderHelper();
    const inside = screen.getByTestId('inside');
    const nestedInside = screen.getByTestId('nested-inside');

    fireEvent.mouseDown(inside);
    fireEvent.mouseDown(nestedInside);

    expect(cb).not.toHaveBeenCalled();
});
