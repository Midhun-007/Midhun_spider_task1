import React from 'react'
import { useContext ,useEffect } from 'react'
import { GameContext } from './gameContext.jsx'
import '../index.css';

function GameLogic() {
    const {board,setBoard, blockClicked,setmoveTime
        , blockClickedIndex,swapClick,setswapClick,replay, dropClicked,setBlockClickedIndex, setDropClicked, setDropClickedIndex, dropClickedIndex, round, setRound,setTurn,cache,setCache,turn } = useContext(GameContext);
    function MoveHandler(){
         if (blockClicked) {
            // Handle block movement
           console.log("inside block")
            if(blockClickedIndex[0] == "Y" ){
                // Yellow disc block logic
                if(!replay){setTurn("R")
                if(swapClick){
                    setmoveTime(7)
                    setswapClick(false)
                }
                else{
                    setmoveTime(10)
                }}
                
                
                
                
            } else if (blockClickedIndex[0] == "R" ) {
                // Red disc block logic
                
                if(!replay){
                    setTurn("Y")
                if(swapClick){
                    setmoveTime(7)
                    setswapClick(false)
                }
                else{
                    setmoveTime(10)
                }}
                
            }
        } else if (dropClicked && dropClickedIndex[1] != blockClickedIndex[1]) {
            
            console.log("insde cond")
            console.log(round)
            // Handle drop movement
            if (dropClickedIndex[0] == "Y" ) {
                // Yellow disc drop logic
                
                if(!replay){
                    setTurn("Y")
                if(swapClick){
                    setmoveTime(7)
                    setswapClick(false)
                }
                else{
                    setmoveTime(10)
                }}
                setDropClickedIndex(false);
                changeBoard("Y",parseInt(dropClickedIndex[1]));
                
            } else if (dropClickedIndex[0] == "R" && dropClickedIndex[1] != blockClickedIndex[1]) {
                // Red disc drop logic
                
                setDropClickedIndex(false);
                if(!replay){
                setTurn("R")
                if(swapClick){
                    setmoveTime(7)
                    setswapClick(false)
                }
                else{
                    setmoveTime(10)
                }}
                changeBoard("R",parseInt(dropClickedIndex[1]));
                
            }
        }
        else {
                // Invalid move
                if(round!=1){
                    setRound(round - 1);
               
                }
                
            }
    }
    function changeBoard(turn,column){
        const newBoard = [...board];
        const color=turn=="Y"?1:2;
        // Update the board state based on the game logic
        const rowIndex=newBoard[column-1].lastIndexOf(0);
        if(rowIndex!=-1){
            newBoard[column-1][rowIndex]=color;
        }
        else{
            return false;
        }
        
        setBoard(newBoard);
        console.log(newBoard)
        return true;
    }
    useEffect(() => {
        MoveHandler();
    },[dropClickedIndex,blockClickedIndex])
    return (
        <div></div>
    )
}

export default GameLogic