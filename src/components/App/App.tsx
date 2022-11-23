import './App.css';
import Game from "../Game/Game";
import GameState from "../Game/GameState";


const GameStart: GameState = {
    gameStateHistory: [{squares: Array(9).fill("")}],
    step: 0,
    xIsNext: true
};

function App() {
    return (
        <div className="App">
            <main>
                <div>
                    <h1>Tic Tac Toe</h1>
                    <Game  {...GameStart}/>
                </div>
            </main>
        </div>
    );
}

export default App;
