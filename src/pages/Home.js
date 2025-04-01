import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  
  const [difficulty, setDifficulty] = useState("easy");
  const [firstPlayer, setFirstPlayer] = useState("X");

  const handleStartGame = () => {
    navigate("/game", {
      state: {
        difficulty,
        firstPlayer,
      },
    });
  };

  return (
    <div className="home-container">
      <h2 className="home-title">5x5 Teeko with AI</h2>

      <div className="home-section">
        <label className="home-label">Difficulty:</label>
        <select
          className="home-select"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="normal">Normal</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="home-section">
        <label className="home-label">First Player:</label>
        <div className="home-radio-group">
          <label>
            <input
              type="radio"
              name="firstPlayer"
              value="X"
              checked={firstPlayer === "X"}
              onChange={() => setFirstPlayer("X")}
            />
            Player (X)
          </label>
          <label>
            <input
              type="radio"
              name="firstPlayer"
              value="O"
              checked={firstPlayer === "O"}
              onChange={() => setFirstPlayer("O")}
            />
            AI (O)
          </label>
        </div>
      </div>

      <button className="home-button" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
}

export default Home;
