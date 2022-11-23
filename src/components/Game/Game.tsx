import React, {useState} from 'react';
import {calculateWinner} from "./Game.helpers";
import Board from "../Board/Board";
import Historic from "./GameHistoric";
import GameState from "./GameState";

function Game(props: GameState) {
    const [stepNumber, setStep] = useState<number>(props.step);
    const [xIsNext, setNext] = useState<boolean>(props.xIsNext);
    const [history, setHistory] = useState<Historic[]>(props.gameStateHistory);

    function handleClick(i: number): void {
        const historic = history.slice(0, stepNumber + 1);
        const current = historic[historic.length - 1];
        const sq = current.squares.slice();

        if (calculateWinner(sq) || sq[i]) {
            return;
        }
        sq[i] = xIsNext ? 'X' : 'O';
        setHistory(historic.concat([{squares: sq}]))
        setStep(historic.length);
        setNext(!xIsNext);
    }

    function jumpTo(step: number): void {
        setStep(step);
        setNext(step % 2 === 0);
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step: { squares: string[] }, move: number) => {
        const desc: string = move ? 'Go to move #' + move : 'Go to game start';
        return (
            <li key={move}>
                <button id={`btn-move-${move}`} onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    const status = (winner: string): string => {
        if (winner) {
            return 'Winner: ' + winner;
        }
        return 'Next player: ' + (xIsNext ? 'X' : 'O');
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
                <div className="status" id="status">{status(winner)}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default Game;