// GameContext.js
import React, { createContext, useState } from 'react';
import '../index.css';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(Array.from({ length: 7 }, () => Array(6).fill(0)));
  const [appcss, setappcss] = useState("flex  justify-center h-screen bg-gray-900 align-middle items-center ")
  const [headercss, setheadercss] = useState('fixed inset-x-0 top-0 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center  text-white p-4 rounded-lg')
  const [gridcss, setgridcss] = useState("text-white")
  const [gridcss1, setgridcss1] = useState("bg-black")
  const [toggle1, settoggle1] = useState(0)
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [overallTime, setOverAllTime] = useState(600)
  const [moveTime, setmoveTime] = useState(10)
  const [score, setScore] = useState(0);
  const [updatedColumn, setupdatedColumn] = useState(0)
  const [gameOver, setGameOver] = useState(false);
  const [turn, setTurn] = useState("Y")
  const [round, setRound] = useState(1);
  const [blockClicked, setBlockClicked] = useState(false);
  const [blockClickedIndex, setBlockClickedIndex] = useState(0);
  const [dropClicked, setDropClicked] = useState(false);
  const [dropClickedIndex, setDropClickedIndex] = useState(0);
  const [powerClick, setPowerClick] = useState(false)
  const [cache,setCache]=useState("")
  const [swapClick,setswapClick]=useState(false)
  const [swapmove,setswapmove]=useState([])
  const [buttoncss, setbuttoncss] = useState('p-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600 cursor-pointer')
  const [replay,setReplay] = useState(false); // To handle replay functionality
  const [moveHistory, setMoveHistory] = useState([]); // To store the history of moves
  const [powerup, setPowerup] = useState(['bg-blue-500 text-white px-4 py-2 rounded ', 'bg-blue-500 text-white px-4 py-2 rounded ', 'bg-blue-500 text-white px-4 py-2 rounded ', 'bg-blue-500 text-white px-4 py-2 rounded '])//red,yellow,swap,extra turn
  return (
    <GameContext.Provider value={{ score, setScore, gameOver, setGameOver,
     blockClicked, setBlockClicked, blockClickedIndex,buttoncss, setbuttoncss,
      setBlockClickedIndex, dropClicked, setDropClicked,replay,setReplay,
       dropClickedIndex, setDropClickedIndex, round, setRound,
        board, setBoard, updatedColumn, setupdatedColumn, 
        overallTime, moveTime, setOverAllTime, setmoveTime,
         turn, setTurn, gameStarted, setGameStarted, gamePaused,
          setGamePaused, setappcss, setgridcss, setheadercss, 
          settoggle1, gridcss, appcss, headercss, toggle1,
           gridcss1, setgridcss1, powerup, setPowerup,
          swapClick,setswapClick,swapmove,setswapmove,
            powerClick, setPowerClick ,cache,setCache,moveHistory, setMoveHistory}}>
      {children}
    </GameContext.Provider>
  );
};
