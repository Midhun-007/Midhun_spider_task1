import React, { useState ,useEffect} from 'react'
import { useContext } from 'react'
import { GameContext } from './gameContext.jsx'
import '../index.css'


function Grid({ column }) {
  const {setBlockClicked,gridcss,gridcss1,swapClick,setswapClick,swapmove,setswapmove, setBlockClickedIndex, setDropClicked, setDropClickedIndex, round, setRound,board,gameStarted,turn,moveHistory, setMoveHistory } = useContext(GameContext);
  const [sixcolumn,setsixColumn]=useState(false)
  function isSixFullColumns(board){
    let fullColumns = 0;

  for (let col = 0; col < board.length; col++) {
    // Check if all values in this column are non-zero
    const isFull = board[col].every(cell => cell !== 0);
    if (isFull) {
      fullColumns++;
    }
  }

  if(fullColumns === 6 && !sixcolumn){
    setsixColumn(true)
  }
  return fullColumns === 6;
  }
  const [glowColumn, setGlowColumn] = useState(null);
  
  useEffect(() => {
  console.log(turn)
    setTimeout(() => setGlowColumn(null), 1000);
    
  }, [glowColumn]);
  function handleClick(column) {
    isSixFullColumns(board)
    if(gameStarted){
      if (column!== glowColumn){
        setGlowColumn(column)}
        console.log(`Column clicked: ${column},turn: ${turn}, round: ${round}`);
    if (((round + 3) / 4) % 1 == 0) {
      if(!sixcolumn){
        setBlockClicked(true);
      setBlockClickedIndex(`Y${column}`);
      setMoveHistory([...moveHistory, `${round}BY${column}`]);
      setRound(round + 1);
      setDropClicked(false);
      }
      else{
        setBlockClicked(false);
        alert("Block moves are not allowed!")

      }
      
    }
    else if (((round + 2) / 4) % 1 == 0) {
      setDropClicked(true);
      setDropClickedIndex(`R${column}`);
      setMoveHistory([...moveHistory, `${round}DR${column}`]);
      setBlockClicked(false);
      setRound(round + 1);
    }
    else if (((round + 1) / 4) % 1 == 0) {
      if(!sixcolumn){
      setBlockClicked(true);
      setBlockClickedIndex(`R${column}`);
      setMoveHistory([...moveHistory, `${round}BR${column}`]);
      setRound(round + 1);
      setDropClicked(false);
      }

      else{
        setBlockClicked(false);
        alert("Block moves are not allowed!")
      }
    }
    else if (((round) / 4) % 1 == 0) {
      setDropClicked(true);
      setDropClickedIndex(`Y${column}`);
      setMoveHistory([...moveHistory, `${round}DY${column}`]);
      setBlockClicked(false);
      setRound(round + 1);
    }
    else {
      setBlockClicked(false);
      setDropClicked(false);
    }
  }
  }
  
  useEffect(() => {
    console.log(moveHistory);
  }
  , [moveHistory]);
  return (<>
    <div className="grid  grid-rows-6   justify-center mt-34 " onClick={() => handleClick(column)}>
      {[...Array(6)].map((_, i) => (
        
        <div
          key={i}

           className={`border ${gridcss} text-center rounded 
            w-[clamp(45px,7vw,80px)] h-[clamp(45px,7vw,80px)] 
            flex items-center justify-center 
            ${
              glowColumn === column
                ? moveHistory[moveHistory.length-1][2] === 'Y'
                  ? 'glow-yellow'
                  : 'glow-red'
                : ''
            }
            ${
              board[column - 1][i] === 0
                ? gridcss1
                : board[column - 1][i] === 1
                ? 'bg-yellow-300'
                : 'bg-red-500'
            }`}
        >
          <h3 className=' '> {column} {i + 1}</h3>

        </div>
      ))}
    </div>
    
    </>

  )
}

export default Grid