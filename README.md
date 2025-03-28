# Teeko AI Game Player

An intelligent AI agent that plays **Teeko**, a two-player abstract strategy game played on a 5×5 board. This project demonstrates the use of classic AI search techniques including the **Minimax algorithm** and **heuristic evaluation**.

## 🎮 How the Game Works
- Each player has 4 pieces (Red or Black).
- **Drop Phase**: Players take turns placing their 4 pieces on the board.
- **Move Phase**: Once all 8 pieces are placed, players move their pieces one space at a time (including diagonals).
- **Win Conditions**: A player wins by getting four of their pieces in:
  - a horizontal, vertical, or diagonal line, or
  - a 2×2 square.

## 🧠 AI Strategy
- Implements the **Minimax algorithm** with a configurable depth cutoff.
- Uses a custom **heuristic function** to evaluate non-terminal game states.
- Supports both phases of the game: dropping and moving pieces.
- Optimized to make decisions in **under 5 seconds**.

## 💡 Features
- Dynamic detection of game phases.
- Full support for all Teeko win conditions.
- Intelligent move generation and evaluation.
- Competes against various difficulty AIs with high win rates.

## 🛠️ Technologies
- **Python 3**
- Standard libraries: `random`, `copy`

## 🚀 Getting Started
1. Clone the repository.
2. Run the game:
   ```bash
   python game.py
Play against the AI or test the AI agent's performance against built-in opponents.
📁 File Structure

game.py – Main game file with AI logic, game loop, and helper functions.
README.md – Project overview and instructions.
📈 Performance

AI achieves:
75%+ win rate against Easy AI
50%+ win rate against Medium AI
25%+ win rate against Hard AI
🤖 Author

Jun Chong
Aspiring programmer passionate about AI and game development.
