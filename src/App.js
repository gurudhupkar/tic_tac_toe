import React, { useState, useEffect } from "react";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState(null);


  const calculateWinner = (sq) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
        return { winner: sq[a], line: [a, b, c] };
      }
    }
    return null;
  };


  const result = calculateWinner(squares);
  const status = result
    ? `Winner: ${result.winner}`
    : squares.every(Boolean)
    ? "It's a Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;


  const handleClick = (i) => {
    if (squares[i] || result) return;
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };


  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinnerInfo(null);
  };

  const renderSquare = (i) => {
    const isWinnerSquare = result?.line.includes(i);
    return (
      <button
        key={i}
        onClick={() => handleClick(i)}
        style={{
          width: "80px",
          height: "80px",
          fontSize: "24px",
          fontWeight: "bold",
          cursor: "pointer",
          backgroundColor: isWinnerSquare ? "#90ee90" : "#fff",
          border: "2px solid #000",
        }}
      >
        {squares[i]}
      </button>
    );
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        backgroundColor: "#f0f8ff",
        minHeight: "100vh",
        paddingTop: "20px",
      }}
    >
      <h1>Tic Tac Toe</h1>
      <p style={{ fontSize: "18px", marginBottom: "20px" }}>
        {winnerInfo ? `${status} - Resetting...` : status}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 80px)",
          gap: "5px",
          justifyContent: "center",
        }}
      >
        {Array.from({ length: 9 }, (_, i) => renderSquare(i))}
      </div>

      <button
        onClick={resetGame}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Reset Game
      </button>
    </div>
  );
}
