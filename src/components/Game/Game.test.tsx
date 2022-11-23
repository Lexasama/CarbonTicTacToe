import React from 'react';
import {render, screen} from '@testing-library/react';
import Game from "./Game";
import GameState from "./GameState";


const defaultSetup: GameState = {
    gameStateHistory: [{squares: Array(9).fill("")}],
    step: 0,
    xIsNext: true
}

test('render next player', () => {
    render(
        <Game {...defaultSetup}/>);
    const nextPlayer = screen.getByText('Next player: X');
    expect(nextPlayer).toBeInTheDocument()
});

test('render go to start game button', () => {
    render(<Game {...defaultSetup}/>);
    const startButton = screen.getByRole('button', {
        name: /go to game start/i
    });
    expect(startButton).toBeInTheDocument()
});

test('Next Payer changes after play', () => {
    render(<Game {...defaultSetup}/>);
})