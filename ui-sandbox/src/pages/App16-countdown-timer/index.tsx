import { useEffect, useState } from "react";

interface CountdownProps {
  initialSeconds: number;
}

const CountdownTimer: React.FC<CountdownProps> = ({ initialSeconds = 20 }) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let intervalId: number;
    if (isActive && secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(intervalId);
  }, [isActive, initialSeconds]);

  const handleToggle = () => {
    if (secondsLeft === 0) return;
    setIsActive((prev) => !prev);
  };

  const handleReset = () => {
    setSecondsLeft(initialSeconds);
    setIsActive(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-sm text-center">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <p className="text-6xl font-mono">{secondsLeft}</p>
        <p className="text-lg">seconds left</p>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleToggle}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          {/* Change button text based on 'isActive' state */}
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-6 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default function Timer() {
  return <CountdownTimer initialSeconds={40} />;
}
