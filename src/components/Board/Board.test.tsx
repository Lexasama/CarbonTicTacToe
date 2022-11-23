import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Board from "../Board/Board";

const initialSquares = Array(9).fill(null);
const handleClick = jest.fn();

test('Board has 9 box', () => {
    render(
        <Board
            squares={initialSquares}
            onClick={(i: number) => handleClick(i)}
        />);
    const boxes = screen.getAllByRole('button');
    expect(boxes.length).toBe(9);
});

test('clicking on a square fires onclick event', () => {
    render(<Board
        squares={initialSquares}
        onClick={(i: number) => handleClick(i)}
    />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(handleClick).toHaveBeenCalledTimes(1);
});
