import React, { useEffect } from 'react'
import { useContext } from 'react'
import { GameContext } from './gameContext'
function WinChecker() {
    const {board,setGameOver,gameOver,setScore,turn,setOverAllTime,setmoveTime,setRound,setBlockClicked,setBlockClickedIndex,setDropClicked,setBoard,setDropClickedIndex,setGameStarted,setTurn,replay,setReplay}=useContext(GameContext)
    useEffect(() => {
      //check horizantaly
      for (let row=0;row<6;row++){
        
        for(let column=0;column<4;column++){
            if(board[column][row]!=0){
                if(board[column][row]==board[column+1][row]&&board[column+1][row]==board[column+2][row]&&board[column+2][row]==board[column+3][row]&&!replay){
                  if(turn=="Y"){
                    setScore(2)
                  }
                  else{
                    setScore(1)
                  }
                  console.log("horizantal win")
                    setGameOver(true)
                    setOverAllTime(600)
                    setmoveTime(10)
                    setRound(1)
                    setGameStarted(false)
            setGameOver(true)
            setTurn("Y")
            setBlockClicked(false)
      setDropClicked(false)
      setBlockClickedIndex(0)
      setDropClickedIndex(0)
            setRound(1)
            setBoard(Array.from({ length: 7 }, () => Array(6).fill(0)))

                }
            }
        }
      }
      //check vertically
      for (let column=0;column<7;column++){
        for(let row=0;row<3;row++){
            if(board[column][row]!=0){
                if(board[column][row]==board[column][row+1]&&board[column][row+1]==board[column][row+2]&&board[column][row+2]==board[column][row+3]&&!replay){
                    console.log("vertical win")
                    if(turn=="Y"){
                    setScore(2)
                  }
                  else{
                    setScore(1)
                  }
                    setOverAllTime(600)
                    setmoveTime(10)
                    setGameOver(true)
                    setRound(1)
                    setGameStarted(false)
            setGameOver(true)
            setTurn("Y")
            setBlockClicked(false)
      setDropClicked(false)
      setBlockClickedIndex(0)
      setDropClickedIndex(0)
            setRound(1)
            setBoard(Array.from({ length: 7 }, () => Array(6).fill(0)))
                    
                }
            }
        }
      }
      //check diagonally
      for (let column=0;column<4;column++){
        for(let row=0;row<3;row++){
            if(board[column][row]!=0){
                if(board[column][row]==board[column+1][row+1]&&board[column+1][row+1]==board[column+2][row+2]&&board[column+2][row+2]==board[column+3][row+3]&&!replay){
                    console.log("diagonal win")
                    if(turn=="Y"){
                    setScore(2)
                  }
                  else{
                    setScore(1)
                  }
                    setGameOver(true)
                    setOverAllTime(600)
                    setRound(1)
                    setGameStarted(false)
            setGameOver(true)
            setTurn("Y")
            setBlockClicked(false)
      setDropClicked(false)
      setBlockClickedIndex(0)
      setDropClickedIndex(0)
            setRound(1)
            setBoard(Array.from({ length: 7 }, () => Array(6).fill(0)))
                    
                }
            }
        }
      }
    
      return () => {
        if(gameOver){
          setOverAllTime(600)
            
        }
      }
    }, [board])
    
  return (
    <div></div>
  )
}

export default WinChecker