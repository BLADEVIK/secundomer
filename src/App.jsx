import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time => time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const minutes = Math.floor((time / 6000) % 60);
  const seconds = Math.floor((time / 100) % 60);
  const milliseconds = time % 100;

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="stopwatch">
      <div className="dial">
        {[...Array(60)].map((_, index) => (
          <div
            key={index}
            className={`marker ${index % 5 === 0 ? 'major' : 'minor'}`}
            style={{ transform: `rotate(${index * 6}deg)` }}
          ></div>
        ))}
        <div className="hand minute-hand" style={{ transform: `rotate(${minutes * 6}deg)` }}></div>
        <div className="hand second-hand" style={{ transform: `rotate(${seconds * 6}deg)` }}></div>
        <div className="hand millisecond-hand" style={{ transform: `rotate(${milliseconds * 3.6}deg)` }}></div>
        <div className="center-dot"></div>
      </div>
      <div className="digital-time">
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}:
        {milliseconds.toString().padStart(2, '0')}
      </div>
      <div className="controls">
        <button onClick={startStop}>{isRunning ? 'Стоп' : 'Старт'}</button>
        <button onClick={reset}>Сброс</button>
      </div>
    </div>
  );
}

export default App;