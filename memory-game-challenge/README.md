# Memory Game Challenge By Yassiel Torres

A fast-paced, highly responsive memory game built on React JS. This project implements custom state machine patterns for card matching, precise native audio synchronization, memory leak protection, and a fluid responsive layout.

##  Live Demo & Repository
- **Live Deployment URL:** [[Pega aquí tu link de Vercel o Netlify, ej: https://yassiel-memory-game.vercel.app]]
- **Repository:** [[https://github.com/YassTorres/MemoryGame]]

---

##  Architecture

### 1. React & Vite
Chosen for the high UI interaction, the game constantly changes states and variables, so React allows me to instantly manipulate the DOM.
### 2. Tailored Hybrid Styling (Tailwind CSS + Vanilla CSS)
To avoid utility-class saturation in the JSX tree and maximize flexibility, i choosed a balanced hybrid styling architecture:
- **Tailwind CSS** handles the global structural, grid definitions,spacing, margins and layout responsiveness.
- **Vanilla CSS** handles component-level positioning, design, precise element centering, and advanced transitions and animations.

### 3. Memory Management
Instead of relying on heavy external audio libraries, the game hooks directly into the native HTML5 `Audio` API. 
- **AUDIO** Audio instances are instantiated cleanly outside the component re-render scopes or wrapped in lifecycles.
- **CLEAN UP:** Continuous intervals (like the ticking clock sound) and background themes are explicitly bound to `useEffect` teardown return functions (`clearInterval` and `.pause()`). This ensures that if a user navigates away or unmounts a screen, background tasks are killed instantly, preventing memory leaks and sound overlapping.

### 4. Immutable Data Shuffling
The game utilizes a classic Fisher-Yates shuffle algorithm. To prevent direct reference mutation of the original source data (`cards.json`).

---

## Installation & Local Setup

Follow these steps to clone the repository:
1. **Clone the repository:**
git clone https://github.com/YassTorres/MemoryGame.git
cd MemoryGame
2. **Install node dependencies:**
npm install
3. **Start the local development server:**
npm run dev
