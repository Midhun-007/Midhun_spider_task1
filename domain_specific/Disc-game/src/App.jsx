import './App.css'
import Grid from './components/Grid'
import React, { useEffect } from 'react'
import './index.css'

import Header from './components/Header'
import GameLogic from './components/gamelogic'
import { useContext } from 'react'
import { GameContext } from './components/gameContext.jsx'
import WinChecker from './components/WinChecker.jsx'
import Popup from './components/popup.jsx'
import Powerups from './components/Powerups.jsx'


function App() {
  const { updatedColumn,replay,setReplay,gameOver, appcss, moveTime, setmoveTime, overallTime, setOverAllTime, turn, gameStarted, score, setScore, setGameStarted, setGameOver, setBoard, setTurn, setRound, setBlockClicked, setBlockClickedIndex, setDropClicked, setDropClickedIndex } = useContext(GameContext)
  useEffect(() => {
    const scoreHistory = JSON.parse(localStorage.getItem('scoreHistory')) || [0, 0, 0];
    if (score == 1) {//Red Wins
      scoreHistory[0] += 1
    }
    else if (score == 2) {//Yellow Wins
      scoreHistory[1] += 1
    }
    else if (score == 3) {//Draw
      scoreHistory[1] += 1
      scoreHistory[0] += 1
    }
    setScore(0)
    localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));
  }, [score])
  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        
        if(!replay&&!gameOver){ setmoveTime((prevTime) => prevTime - 1);
          setOverAllTime((prevTime) => prevTime - 1);}
      }, 1000);
      if (overallTime <= 0 && gameStarted) {
        clearInterval(timer);
        setOverAllTime(600)
        setGameStarted(false)
        setmoveTime(10)
        setBlockClicked(false)
        setDropClicked(false)
        setBlockClickedIndex(0)
        setDropClickedIndex(0)
        setBoard(Array.from({ length: 7 }, () => Array(6).fill(0)))
        setTurn("Y")

        setRound(1)
        setGameOver(true)

      }
      if (moveTime
        <= 0 && gameStarted&&!replay) {
        clearInterval(timer);
        if (turn == "Y") {
          setOverAllTime(600)
          setmoveTime(10)
          setGameStarted(false)
          setGameOver(true)
          setTurn("Y")
          setBlockClicked(false)
          setDropClicked(false)
          setBlockClickedIndex(0)
          setDropClickedIndex(0)
          setRound(1)
          setBoard(Array.from({ length: 7 }, () => Array(6).fill(0)))
          setScore(1)
        }
        else {
          setOverAllTime(600)
          setGameStarted(false)
          setGameOver(true)
          setBoard(Array.from({ length: 7 }, () => Array(6).fill(0)))
          setmoveTime(10)
          setBlockClicked(false)
          setDropClicked(false)
          setBlockClickedIndex(0)
          setDropClickedIndex(0)
          setTurn("Y")
          setRound(1)
          setScore(2)
        }

      }
      return () => clearInterval(timer);
    }


    return () => {
      console.log("Game Over")
    }
  }, [turn, overallTime, moveTime, gameStarted]);
  return (
    <>
      <Powerups power={"red"}></Powerups>
      <Powerups power={"yellow"}></Powerups>
      <Popup></Popup>
      <WinChecker></WinChecker>
      <div className={appcss}>
        <Header></Header>

        {
          Array.from({ length: 7 }).map((_, index) => (
            <Grid key={index} column={index + 1} updateColumn={updatedColumn} />
          ))
        }

      </div>

      <GameLogic></GameLogic>

    </>

  )
}

export default App
