# 5x5 Teeko with AI

This is a **React** project featuring a 5×5 tic tac toe board. It includes:

1. A **Home** screen to select the difficulty (Easy/Normal/Hard) and decide who goes first (Player or AI).
2. A **Game** screen showing a 5×5 board, where you play against an AI that uses **Minimax + Alpha-Beta** pruning.  
3. A **retro-style design**, with separate **Home.css** and **Game.css** files for custom styling.

---

## Features

- **Player vs. AI** using Minimax with Alpha-Beta pruning
- **Difficulty Levels**: Easy, Normal, Hard (adjusts AI search depth)
- **First-Move Choice**: Decide if the user (Player) or the AI goes first
- **Reset & Go Home**: Options to reset the board or navigate back to Home
- **Victory/Draw Detection**: Automatically detects a winner if a row, column, or diagonal is filled with the same symbol
- **Retro Design**: Uses a separate CSS file (`Game.css` / `Home.css`) for each page, featuring a classic look

---

### Key Files

- **`src/pages/Home.js`** & **`src/pages/Home.css`**:  
  - **Home** screen to choose difficulty and who goes first  
  - Navigates to `/game` with user-selected settings

- **`src/pages/Game.js`** & **`src/pages/Game.css`**:  
  - **Game** screen with a 5×5 board  
  - Includes AI logic (`getBestMove()` and `alphaBeta()` for Minimax)  
  - Displays current player, detects and shows results (Winner or Draw)

- **`App.js`**: Configures the app’s routing (Home → `/`, Game → `/game`)  
- **`index.js`**: React entry point

---

## Getting Started

1. **Clone the repository** (or create a new app with Create React App, then replace files):
   ```bash
   git clone https://github.com/jchong990315/teeko_app.git
   cd teeko_app
Install dependencies:
npm install
or

yarn
Run the development server:
npm start
or

yarn start
This will typically open http://localhost:3000 in your browser.
Play:
On the Home page, select a Difficulty and who moves first (Player or AI).
Click Start Game to proceed.
On the Game screen, place your X (or O) on the board. The AI will respond automatically.
Customizing Styles

Fonts:
This example uses "Press Start 2P", a retro font from Google Fonts.
To properly load it, add a <link> in your public/index.html (or at the top of your CSS if supported):
<link
  href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
  rel="stylesheet"
/>
Colors & Layout:
Adjust them in Home.css and Game.css (e.g. background color, hover effects, etc.).
Deployment

To build a production-ready bundle:

npm run build
Upload or deploy the contents of the build/ directory to your favorite static hosting provider (Netlify, Vercel, GitHub Pages, etc.).
