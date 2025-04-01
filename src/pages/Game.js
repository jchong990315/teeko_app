// src/pages/Game.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Game.css";  // <-- 스타일 분리: CSS 파일 import

// Board size
const BOARD_SIZE = 5;

/** Initialize the board with empty cells ("") */
function initBoard() {
  return Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(""));
}

/** Check for a winner (5 in a row) */
function checkWinner(board) {
  const checkLine = (line) =>
    line.every((cell) => cell === line[0]) && line[0] !== "";

  // Rows
  for (let r = 0; r < BOARD_SIZE; r++) {
    if (checkLine(board[r])) return board[r][0];
  }

  // Columns
  for (let c = 0; c < BOARD_SIZE; c++) {
    const colArr = board.map((row) => row[c]);
    if (checkLine(colArr)) return colArr[0];
  }

  // Diagonal (top-left -> bottom-right)
  let diag1 = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    diag1.push(board[i][i]);
  }
  if (checkLine(diag1)) return diag1[0];

  // Diagonal (top-right -> bottom-left)
  let diag2 = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    diag2.push(board[i][BOARD_SIZE - 1 - i]);
  }
  if (checkLine(diag2)) return diag2[0];

  // No winner
  return null;
}

/** Check if the board is completely filled */
function isBoardFull(board) {
  return board.every((row) => row.every((cell) => cell !== ""));
}

/** Deep-copy the board (2D array) */
function cloneBoard(board) {
  return board.map((row) => row.slice());
}

/** Minimax + Alpha-Beta to calculate scores */
function alphaBeta(
  board,
  depth,
  alpha,
  beta,
  isMaximizing,
  userSymbol,
  aiSymbol,
  maxDepth
) {
  const winner = checkWinner(board);
  if (winner === aiSymbol) {
    return 10000 - depth; // AI wins
  } else if (winner === userSymbol) {
    return -10000 + depth; // User wins
  }

  // If max depth reached or board is full, return 0 (no further evaluation)
  if (depth === maxDepth || isBoardFull(board)) {
    return 0;
  }

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (board[r][c] === "") {
          board[r][c] = aiSymbol;
          const evalResult = alphaBeta(
            board,
            depth + 1,
            alpha,
            beta,
            false,
            userSymbol,
            aiSymbol,
            maxDepth
          );
          board[r][c] = "";
          maxEval = Math.max(maxEval, evalResult);
          alpha = Math.max(alpha, evalResult);
          if (beta <= alpha) {
            break;
          }
        }
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (board[r][c] === "") {
          board[r][c] = userSymbol;
          const evalResult = alphaBeta(
            board,
            depth + 1,
            alpha,
            beta,
            true,
            userSymbol,
            aiSymbol,
            maxDepth
          );
          board[r][c] = "";
          minEval = Math.min(minEval, evalResult);
          beta = Math.min(beta, evalResult);
          if (beta <= alpha) {
            break;
          }
        }
      }
    }
    return minEval;
  }
}

/** Choose the best move for AI using Minimax */
function getBestMove(board, difficulty, userSymbol, aiSymbol) {
  const maxDepth =
    difficulty === "easy" ? 1 : difficulty === "normal" ? 3 : 5;

  let bestValue = -Infinity;
  let move = { row: -1, col: -1 };

  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === "") {
        board[r][c] = aiSymbol;
        const moveValue = alphaBeta(
          board,
          0,
          -Infinity,
          Infinity,
          false,
          userSymbol,
          aiSymbol,
          maxDepth
        );
        board[r][c] = "";
        if (moveValue > bestValue) {
          bestValue = moveValue;
          move = { row: r, col: c };
        }
      }
    }
  }

  return move;
}

function Game() {
  const navigate = useNavigate();
  const location = useLocation();

  const { difficulty, firstPlayer } = location.state || {
    difficulty: "easy",
    firstPlayer: "X",
  };

  // Determine symbols
  const userSymbol = firstPlayer === "X" ? "X" : "O";
  const aiSymbol = userSymbol === "X" ? "O" : "X";

  // Board state
  const [board, setBoard] = useState(initBoard());
  const [currentPlayer, setCurrentPlayer] = useState(firstPlayer);
  const [winner, setWinner] = useState(null);

  // Check winner or draw each turn
  useEffect(() => {
    const w = checkWinner(board);
    if (w) {
      setWinner(w);
      return;
    }
    if (isBoardFull(board)) {
      setWinner("draw");
    }
  }, [board]);

  // When user clicks a cell
  const handleCellClick = (r, c) => {
    // Ignore if game ended, cell occupied, or it's AI's turn
    if (winner || board[r][c] !== "" || currentPlayer === aiSymbol) return;

    const newBoard = cloneBoard(board);
    newBoard[r][c] = userSymbol;
    setBoard(newBoard);

    setCurrentPlayer(aiSymbol);
  };

  // If AI's turn, automatically make a move
  useEffect(() => {
    if (!winner && currentPlayer === aiSymbol) {
      const newBoard = cloneBoard(board);
      const { row, col } = getBestMove(
        newBoard,
        difficulty,
        userSymbol,
        aiSymbol
      );
      if (row !== -1 && col !== -1) {
        newBoard[row][col] = aiSymbol;
        setBoard(newBoard);
      }
      setCurrentPlayer(userSymbol);
    }
  }, [board, currentPlayer, winner, aiSymbol, userSymbol, difficulty]);

  // Reset game
  const handleReset = () => {
    setBoard(initBoard());
    setWinner(null);
    setCurrentPlayer(firstPlayer);
  };

  // Replay after winner
  const handleReplay = () => {
    handleReset();
  };

  // Go Home
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="game-container">
      <h2>5x5 Teeko with AI</h2>
      <p>Difficulty: {difficulty}</p>
      <p>
        Player: {userSymbol}, AI: {aiSymbol}
      </p>
      <p>
        Current Player: {winner ? "-" : currentPlayer}
      </p>

      {/* Board */}
      <div className="game-board">
        {board.map((row, rowIndex) => (
          <div className="game-row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                className="game-cell"
                key={colIndex}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* If game not ended */}
      {!winner && (
        <div className="game-button-container">
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleGoHome}>Go Home</button>
        </div>
      )}

      {/* If there's a winner or draw */}
      {winner && (
        <div className="game-result">
          {winner === "draw" ? (
            <h3>It's a draw!</h3>
          ) : (
            <h3>{winner} has won!</h3>
          )}
          <button onClick={handleReplay}>Play Again</button>
          <button onClick={handleGoHome}>Home</button>
        </div>
      )}
    </div>
  );
}

export default Game;
