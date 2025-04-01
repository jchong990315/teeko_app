5x5 Tic Tac Toe (with AI)

This is a React project featuring a 5×5 tic tac toe board. It includes:

A Home screen to select difficulty (Easy/Normal/Hard) and decide who goes first (Player or AI).
A Game screen showing a 5x5 board, where you play against an AI that uses a Minimax + Alpha-Beta algorithm.
Custom retro-style designs for both the Home and Game pages via separate CSS files.
Features

Player vs. AI: The AI calculates its moves using Minimax with Alpha-Beta pruning.
Difficulty Levels: Easy, Normal, or Hard (adjusting search depth).
First Move Choice: Decide whether the user (Player) or the AI should start.
Reset & Go Home: Reset the board or navigate back to the Home screen at any time.
Victory/Draw Check: Automatically detects a winner if a row, column, or diagonal is completely filled with the same symbol.
Retro Design: A separate CSS file (Game.css / Home.css) is used to style each page for a classic game look.
Project Structure

my-app/
├─ public/
│  └─ index.html
├─ src/
│  ├─ pages/
│  │  ├─ Home.js
│  │  ├─ Home.css
│  │  ├─ Game.js
│  │  └─ Game.css
│  ├─ App.js
│  └─ index.js
├─ package.json
└─ README.md
Key Files
src/pages/Home.js & src/pages/Home.css: The Home screen
Lets users select difficulty and first player.
Navigates to /game with these settings.
src/pages/Game.js & src/pages/Game.css: The Game screen
Renders the 5×5 board.
Includes the Minimax + Alpha-Beta logic in getBestMove() and alphaBeta().
Displays the current player and shows results (Winner / Draw).
App.js: Defines the app’s routing (Home → /, Game → /game).
index.js: React entry point.
Getting Started

Clone the repository (or create it via create-react-app, then replace files accordingly):
git clone https://github.com/your-username/tictactoe-5x5.git
cd tictactoe-5x5
Install dependencies:
npm install
or

yarn
Start the development server:
npm start
or

yarn start
By default, the app runs at http://localhost:3000.
Open your web browser and navigate to http://localhost:3000.
Play:
On the Home screen, choose the difficulty (Easy, Normal, Hard) and who moves first (Player or AI).
Click Start Game to begin the match.
Place your X (or O) on the board. The AI will respond automatically.
Customizing Styles


npm run build
Then deploy the generated build/ folder to your favorite static hosting service (Netlify, Vercel, GitHub Pages, etc.).

