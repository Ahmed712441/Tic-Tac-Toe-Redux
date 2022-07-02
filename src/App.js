import './App.css';
import {useSelector,useDispatch} from 'react-redux';
import {boardActions} from './store/board';



function Box(props){
  
  const dispatch = useDispatch(); 

  return (
    <div onClick={() => dispatch(boardActions.place({index:props.step})) } className="box">
      <p className='box-text'>{props.val}</p>
    </div>
  )
}

function Board(){
  const board = useSelector((state) => state.history[state.currentIndex] );
  
  const boxes = board.map((item,step) =>  <Box key={step} val={item} step={step}  />);
  return (
    <div className="column">
      <div className ="row">
        {boxes.slice(0, 3)}
      </div>
      <div className ="row">
        {boxes.slice(3, 6)}
      </div>
      <div className ="row">
        {boxes.slice(6, 9)}
      </div>
    </div>
  );
}


function App(){
  const Xturn = useSelector((state) => state.Xturn );
  const historyLength = useSelector((state) => state.history.length );
  const winner = useSelector((state) => state.winner );
  const text = winner? "Winner : "+ winner : ("Turn : " + (Xturn ? "X":"O"));
  const dispatch = useDispatch(); 
  var buttons = Array(historyLength).fill(null);
  buttons = buttons.map((value,step)=>{
    const val = step ? "go to move #"+step : "go to start position";
    return (
      <button key={step} onClick={() => dispatch(boardActions.switchTo({index:step}))}>{val}</button>
    )
  });
  return (
      <div className='row App'>
        <div className="column" >
          <h1>{text}</h1>
          <Board /> 
        </div>
        <div className='column'>
          {buttons}
        </div>
      </div>
  )
}

export default App;
