import { useState } from "react";
import './Cricket.css';
function Cricket(){

  let [run, setRun] = useState(0);
  let [wicket, setWicket] = useState(0);
  let [ball, setBall] = useState(0);
  let [over, setOver] = useState(0);
   
  let wicketlist = () => {
    if (wicket < 10) {
      setWicket(wicket + 1);
    }
  };
  
  let isOut = wicket >= 10;
  let isOverFinish = over >= 3;
  let isMatchOver = isOut || isOverFinish;


  let updateBall = () => {
    if (isMatchOver) return;

    if (ball === 5) {
      setOver(over + 1); 
      setBall(0);        
    } else {
      setBall(ball + 1); 
    }
  };

  let addRun = (value) => {
    if (!isMatchOver) {
      setRun(run + value);
      updateBall();
    }
  };

  let addWicket = () => {
    if (!isMatchOver && wicket < 10) {
      setWicket(wicket + 1);
      updateBall();
    }
  };


  return (
    <>
    <div className="text-center">

    <h1 style={{ color: "green",}}>
      <u>Cricket Score Board</u> 🏏
    </h1>

    <h2>Runs: {run} </h2>

    <h2>
      Wickets: {wicket}/10  
        {isOut && <span style={{ color: "red" }}> — Match is Over (All out)👋</span>}
    </h2>

    <h2>
        Overs: {over}.{ball}/3
        {isOverFinish && <span style={{ color: "blue" }}> — Match Over (3 overs completed)</span>}
      </h2>
    <br />

 
    <button className="btn" onClick={()=> addRun(1)} disabled={isMatchOver}>1 Run</button>
    <button className="btn" onClick={()=> addRun(2)} disabled={isMatchOver}>2 Runs</button>
    <button className="btn" onClick={()=> addRun(3)} disabled={isMatchOver}>3 Runs</button>
    <button className="btn" onClick={()=> addRun(4)} disabled={isMatchOver}>4 Runs</button>
    <button className="btn" onClick={()=> addRun(5)} disabled={isMatchOver}>5 Runs</button>
    <button className="btn" onClick={()=> addRun(6)} disabled={isMatchOver}>6 Runs</button>
    <button className="btn" onClick={addWicket} disabled={isMatchOver}>Wicket</button>
    <button className="btn bg-danger" onClick={() => {setRun(0); setWicket(0);setOver(0);setBall(0);}}>Reset</button>

    
    </div>
    </>
  )
}
export default Cricket;