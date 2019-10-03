import React, { useState, useEffect } from 'react';
import './App.css';

function Stopwatch() {
  // setup states
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(null); // null if not running, otherwise the timer interval

  function startStop() {
    if (running) { // user wants to Stop
      clearInterval(running);
      setRunning(false);
    } else { // user wants to Start or Resume
      const start = new Date(new Date() - time); // start time is current time on the clock
      setRunning(setInterval(() => {
        setTime((new Date() - start))
      }, 10));
    }
  }

  useEffect(startStop, []); // start stopwatch on browser load

  return (
    <div className='Stopwatch'>
      <h2>{(time / 1000).toFixed(2)}s</h2>

      <button onClick={startStop}>{running ? 'Stop' : (time ? 'Resume' : 'Start')}</button>
      {!!time && <button onClick={() => setTime(0)}>Reset</button>}
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <h1>React Stopwatch</h1>
      <Stopwatch />
    </div>
  );
}

export default App;
