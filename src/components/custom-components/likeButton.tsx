import React from "react";
import confetti from "canvas-confetti";

interface AppProps {
  onClickHandler: () => void;
}

const App: React.FC<AppProps> = ({ onClickHandler }) => {
  const handleClick = () => {
    void confetti({
      particleCount: 400,
      scalar: 0.6,
      ticks: 400,
      spread: 180,
      origin: {
        y: 0,
        x: 0.5,
      },
    });
    onClickHandler();
  };

  return (
    <p className="like-button" onClick={handleClick}>
      <span role="img" aria-label="confetti">
        🎉
      </span>
    </p>
  );
};

export default App;
