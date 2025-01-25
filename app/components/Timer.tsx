import { useState, useEffect } from 'react';

const Timer = ({ onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour (3600 seconds)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="text-center mb-4 text-lg ">
      <span className="text-gray-500 font-italic">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default Timer;
