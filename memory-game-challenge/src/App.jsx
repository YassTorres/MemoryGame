import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import StartScreen from './screens/StartScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<StartScreen> </StartScreen>} />
        <Route path="/game" element={<GameScreen/>} />
        <Route path="/gameover" element={<GameOverScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
