import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import './index.css'; // or './main.css'
import { GameProvider } from './components/gameContext.jsx';


createRoot(document.getElementById('root')).render(
  <GameProvider>
    <App />
  </GameProvider>
)
