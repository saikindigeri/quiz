import { useState, useEffect } from 'react';

interface TimerProps{
  onTimeUp:()=>void;
}



const Timer:React.FC<TimerProps> = ({ onTimeUp }) => {
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

  const formatTime = (seconds: number): string => {
    const hours: number = Math.floor(seconds / 3600);
    const minutes: number = Math.floor((seconds % 3600) / 60);
    const secs: number = seconds % 60;
  
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  

  return (
    <div className="text-center mb-4 text-lg ">
      <span className="text-gray-500 font-italic">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default Timer;
