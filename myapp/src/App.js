import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [message, setMessage] = useState("Player X's Turn");

  const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8],  
    [0,3,6], [1,4,7], [2,5,8],  
    [0,4,8], [2,4,6]            
  ];

  function checkWinner(newBoard) {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  }

  function handleClick(index) {
    if (checkWinner(board)) return;

    if (board[index]) {
      setMessage("Cell is already selected. Choose another cell"); 

      setTimeout(() => {
        setMessage(`Player ${isXTurn ? "X" : "O"}'s Turn`);
      }, 2000);
      return;
    }
    
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setMessage(`Player ${winner} Wins!`);
    } else if (!newBoard.includes("")) {
      setMessage("It's a Draw!");
    } else {
      setIsXTurn(!isXTurn);
      setMessage(`Player ${isXTurn ? "O" : "X"}'s Turn`);
    }
  }


  
  function restartGame() {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
    setMessage("Player X's Turn");
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <p className="message">{message}</p>
      <div className="board">
        {board.map((cell, i) => (
          <button key={i} onClick={() => handleClick(i)} className="cell">
            {cell}
          </button>
        ))}
      </div>
      <button className="restart" onClick={restartGame}>Start New Game</button>
    </div>
  );
}

export default App;
