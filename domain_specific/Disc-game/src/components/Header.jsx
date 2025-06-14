import React from 'react'
import { useContext, useState } from 'react'
import { GameContext } from './gameContext.jsx'
import '../index.css';
import Grid from './Grid.jsx';

function Header() {
    // Game logic goes here

    const { blockClickedIndex,setgameround, setDropClicked,setTurn,setRound, gameround,setDropClickedIndex,setBlockClicked,setBlockClickedIndex,board, setgridcss1, round, overallTime, moveTime, turn,buttoncss, setbuttoncss, setGameStarted, setGamePaused, setGameOver, setappcss, setgridcss, setheadercss, settoggle1, gridcss, appcss, headercss, toggle1, powerClick, setPowerClick,moveHistory, setMoveHistory,setBoard } = useContext(GameContext);
    function moveDisplayHandler() {
        if (((round + 3) / 4) % 1 == 0) {
            return `Yellow to Block`;
        }
        else if (((round + 2) / 4) % 1 == 0) {
            return `Yellow Blocked column ${blockClickedIndex[1]} Red to Drop`;
        }
        else if (((round + 1) / 4) % 1 == 0) {
            return "Red to Block";
        }
        else if (((round) / 4) % 1 == 0) {
            return `Red Blocked column ${blockClickedIndex[1]} Yellow to Drop`;
        }
    }
    

    function startSession() {
        console.log("Game Started");
        setGameOver(false)
        setGameStarted(true);
        setGamePaused(false);
        setbuttoncss('p-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600 cursor-pointer hidden')
    }
    
    function toggle() {
        if (toggle1 == 0) {
            settoggle1(1)
            setappcss('flex  justify-center h-screen bg-white align-middle items-center')
            setheadercss('fixed inset-x-0 top-0 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center  text-black p-4 rounded-lg')
            setgridcss('text-black')
            setgridcss1('bg-white')
        }
        else {
            setappcss('flex  justify-center h-screen bg-gray-900 align-middle items-center')
            setheadercss('fixed inset-x-0 top-0 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center  text-white p-4 rounded-lg')
            setgridcss('text-white')
            setgridcss1('bg-black')
            settoggle1(0)

        }
    }
    function handlePower(){
        setPowerClick(true)
    }
    function handleUndo(){
        if (moveHistory.length === 0) return;
        const move=moveHistory[moveHistory.length-1]
        console.log(move)
        console.log(moveHistory)
        if(move[1]=="D"){
        const column=parseInt(move[3])-1
        let  arr=[...board]
        const index = arr[column].findIndex(num => num !== 0);
        if (index !== -1) {
            arr[column][index] = 0;
        }
        console.log(arr)
        setDropClicked(false)
        setBlockClickedIndex(0)
        setTurn(turn === "Y" ? "R" : "Y")
        setRound(prev=>prev-1)
        
        setMoveHistory(moveHistory.slice(0, moveHistory.length - 1))
        
        setBoard(arr)
        
    }
        else{
            setBlockClickedIndex(0)
            setRound(prev=>prev-1)
            
            setTurn(turn === "Y" ? "R" : "Y")
            
            setMoveHistory(moveHistory.slice(0, moveHistory.length - 1))
            setBlockClicked(false)
        }
    }
    return (
        <div className={headercss}>
            <h1 className='font-poppins '>Disc Game</h1>
            <h3 className='font-poppins font-light'>Move:{moveDisplayHandler()}</h3>
            <div className='flex '>
                <div>
                    <p>Overall Time</p>
                    <p className='p-4'>{overallTime}</p>
                </div>

                <div className='mx-4'>
                    <p>Move Timer</p>
                    <p className='p-4' style={{ color: turn === "Y" ? "yellow" : "red" }}>{moveTime}</p>
                </div>

            </div>
            <div className="flex justify-center items-center gap-4">
                <button className={buttoncss} onClick={startSession}>Start</button>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" onClick={toggle} />

                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">

                    </div>

                </label>
                <button onClick={handlePower} className='z-4 p-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600 cursor-pointer '>Power Ups</button>
                <button onClick={handleUndo} className='z-4 p-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600 cursor-pointer '>Undo</button>
                </div>

        </div>
    )
}

export default Header