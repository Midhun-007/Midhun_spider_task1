import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { GameContext } from './gameContext.jsx'
function Popup() {
    const { gameOver,replay,setReplay,setBoard, setGameOver,setTurn,setBlockClicked,setRound,gameStarted,blockClicked,setbuttoncss, blockClickedIndex,dropClicked,setBlockClickedIndex, setDropClicked, setDropClickedIndex, dropClickedIndex, setGameStarted ,moveHistory, setMoveHistory} = useContext(GameContext)
    const handleRestart = () => {
        setGameOver(false);
        setGameStarted(false);
        setBoard(Array.from({ length: 7 }, () => Array(6).fill(0)))
        setRound(1);
        setTurn("Y")
        setbuttoncss('p-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600 cursor-pointer')
        display = 'h-screen w-screen  bg-opacity-50 fixed top-0 left-0 flex items-center justify-center hidden'
        // Add logic to reset the game state here
    };
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    async function handleReplay(){
        setRound(1)
        setReplay(true)
        setTurn("Y")
        setGameStarted(true)
        setGameOver(false);
        const uniqueArray = [...new Set(moveHistory)];
        setMoveHistory(uniqueArray);
        for (let i = 0; i < uniqueArray.length; i++) {
            const move = uniqueArray[i];
            
            await sleep(2000); 
            if(move[0]%2==0){//Drop move
                setBlockClicked(false)
                setDropClicked(true)
                setDropClickedIndex(move.slice(2))
                setBlockClickedIndex(false)
                
            }
            else{//Block move
                setBlockClicked(true)
                setBlockClickedIndex(move.slice(2))

            }
            if(uniqueArray.length-1==i){
                await sleep(2000); 
                setGameOver(true)
            }
        }
    }
    const [replaycss,setreplaycss]=useState('bg-blue-500 text-white px-4 py-2 rounded')
    useEffect(()=>{
        if(replay){
        setreplaycss('bg-blue-500 text-white px-4 py-2 rounded hidden')
    }
    },[replay])
    
    let display = 'h-screen w-screen  bg-opacity-50 fixed top-0 left-0 flex items-center justify-center hidden'
    if (gameOver) {
        display = 'h-screen w-screen  bg-opacity-50 fixed top-0 left-0 flex items-center justify-center '
    }
    else if (!gameOver) {
        display = 'h-screen w-screen  bg-opacity-50 fixed top-0 left-0 flex items-center justify-center hidden'
    }
    const Scores = JSON.parse(localStorage.getItem('scoreHistory')) || [0, 0, 0];
    let leaderboard = []
    if (Scores[0] > Scores[1]) {
        leaderboard[0] = `Red : ${Scores[0]}`
        leaderboard[1] = `Yellow : ${Scores[1]}`
    }
    else if (Scores[0] <= Scores[1]) {
        leaderboard[0] = `Yellow : ${Scores[1]}`
        leaderboard[1] = `Red : ${Scores[0]}`
    }

    return (
        <>
            <div className={display} >
                <div className='bg-white p-8 rounded-lg shadow-lg'>
                    <h2 className='text-lg font-bold mb-4'>Game Over</h2>
                    <div className='flex'>
                        <p>Score</p>
                        <p className='ml-2'>{leaderboard[0]}</p>
                        <p className='ml-2'>{leaderboard[1]}</p>
                    </div>
                    <button onClick={handleRestart} className='bg-blue-500 text-white px-4 py-2 rounded'>Restart</button>
                    <button onClick={handleReplay} className={replaycss}>Replay</button>
                </div>
            </div>
        </>
    )
}

export default Popup