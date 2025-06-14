import React, {  useEffect, useState } from 'react'
import { useContext } from 'react'
import { GameContext } from './gameContext.jsx'
import '../index.css';

function Powerups({ power }) {
    const { powerup, setPowerup, powerClick, setPowerClick,setmoveTime, turn, board ,round,setRound,setTurn,blockClickedIndex, setBlockClickedIndex,setswapClick} = useContext(GameContext);
    const [display, setDisplay] = useState("hidden")
    useEffect(() => {
        if (turn == "Y" && power == "yellow" && powerClick) {
            setDisplay('h-screen w-screen  bg-opacity-50 fixed top-0 left-0 flex items-center justify-center')
        }
        else if (turn == "R" && power == "red" && powerClick) {
            setDisplay("h-screen w-screen  bg-opacity-50 fixed top-0 left-0 flex items-center justify-center")
        }
    }, [powerClick]);
    let list = [0, 0];
    if (power == "red") {
        list = [0, 1]
    }
    else if (power == "yellow") {
        list = [2, 3]
    }
    function handleSwapPiece(e) {
        setswapClick(true)
        const index = parseInt(e.target.value);
        const updated = [...powerup];
        updated[index] = 2 < index && index < 4
            ? "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer  hidden"
            : "bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer  hidden";
        setPowerup(updated);
        handleClose();
    }
    function handleExtraTurn(e) {
        
        const index = parseInt(e.target.value);
        const updated = [...powerup];
        updated[index] = 2 < index && index < 4
            ? "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer  hidden"
            : "bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer  hidden";
        setPowerup(updated);
        setRound(round-1)
        setmoveTime(10)
        handleClose();
        // Add logic to grant an extra turn
    }
    function handleClose() {
        setDisplay("h-screen w-screen  bg-opacity-50 fixed top-0 left-0 flex items-center justify-center hidden")
        setPowerClick(false)
    }

    return (
        <>
            <div className={display}>
  <div className='bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-6 w-96'>
    {/* Header Section */}
    <div className='flex w-full justify-between items-center mb-4'>
      <h2 className='text-lg font-bold'>Power Ups</h2>
      <button 
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition ease-in-out" 
        onClick={handleClose}>
        Close
      </button>
    </div>

    {/* Buttons Section */}
    <div className='flex w-full justify-around gap-6'>
      <button 
        value={list[0]} 
        className={powerup[list[0]]} 
        onClick={handleSwapPiece}>
        Dec Next Move Time
      </button>

      <button 
        value={list[1]} 
        className={powerup[list[1]]} 
        onClick={handleExtraTurn}>
        Extra Turn
      </button>
    </div>
  </div>
</div>
</>

    )
}

export default Powerups