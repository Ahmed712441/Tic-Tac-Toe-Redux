import { configureStore,createSlice } from "@reduxjs/toolkit";

function getWinner(board){
  
    const WinningStates = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
  
    for(var i=0;i<WinningStates.length;i++){
      const [a,b,c] = WinningStates[i];
      if (board[a] && board[a]===board[b] && board[a]===board[c]){
        return board[a];
      }
    }
    return null;
}


const boardSlice = createSlice({
    name:'board',
    initialState: {history:[Array(9).fill(null)],currentIndex:0,Xturn:true,winner:null},
    reducers: {
        place(state,action){
            
            const index = action.payload.index;
            const currentIndex = state.currentIndex;
            if(state.winner){
                state.currentIndex=1;
                state.winner=null;
                let arr = Array(9).fill(null);
                arr[index] = "X";
                state.history = [Array(9).fill(null),arr];
                state.Xturn=false;
            } 
            else if (!state.history[currentIndex][index]){
                let arr = state.history.slice(0,currentIndex+1);
                let arrCopy = [...state.history[currentIndex]];
                arrCopy[index] = state.Xturn?"X":"O";
                state.winner = getWinner(arrCopy);
                arr.push(arrCopy);
                state.history = arr;
                state.currentIndex+=1;
                state.Xturn=state.currentIndex%2===0?true:false;
            }
        },
        switchTo(state,action){
            state.currentIndex = action.payload.index;
            state.Xturn=state.currentIndex%2===0?true:false;
            state.winner = getWinner(state.history[state.currentIndex]);
        }
    }
});


const store = configureStore({
    reducer:boardSlice.reducer
});

export const boardActions = boardSlice.actions;
export default store;

