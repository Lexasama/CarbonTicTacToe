import Historic from "./GameHistoric";

export default interface GameState{
    step: number,
    xIsNext: true,
    gameStateHistory: Historic[]
}