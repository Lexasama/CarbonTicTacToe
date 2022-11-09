import React, {useState} from 'react';
import {calculateWinner} from "./Game.helpers";
import Board from "../Board/Board";

function Game() {
    const [stepNumber, setStep] = useState(0);
    const [xIsNext, setNext] = useState(true);
    const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);

    function handleClick(i: number): void {
        const history1 = history.slice(0, stepNumber + 1);
        const current = history1[history1.length - 1];
        const sq = current.squares.slice();

        if (calculateWinner(sq) || sq[i]) {
            return;
        }
        sq[i] = xIsNext ? 'X' : 'O';
        setHistory(history1.concat([{squares: sq}]))
        setStep(history1.length);
        setNext(!xIsNext);
    }

    function jumpTo(step: number): void {
        setStep(step);
        setNext(step % 2 === 0);
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i: number) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div className="status">{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}


export default Game;
