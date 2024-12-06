import React from 'react';
import './AudioTimerStyles.css';

const AudioTimer = ({ isRunning, elapsedTime, setElapsedTime }) => {
    React.useEffect(() => {
        let intervalId;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setElapsedTime(elapsedTime + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, elapsedTime, setElapsedTime]);

    //  calculation
    const hours = Math.floor(elapsedTime / 360000);
    const minutes = Math.floor((elapsedTime % 360000) / 6000);
    const seconds = Math.floor((elapsedTime % 6000) / 100);
    const milliseconds = elapsedTime % 100;

    return (
        <div className="audio-timer">
            <div className="time">
                {hours}:{minutes.toString().padStart(2, "0")}:
                <span className="seconds">{seconds.toString().padStart(2, "0")}:</span>
                <span className="milliseconds">{milliseconds.toString().padStart(2, "0")}</span>
            </div>
        </div>
    );
};

export default AudioTimer;
