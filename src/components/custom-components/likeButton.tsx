import React from "react";

interface AppProps {
  onClickHandler: () => void;
  disabled?: boolean;
}

const App: React.FC<AppProps> = ({ onClickHandler, disabled }) => {
  return (
    <button disabled={disabled} className="like-button" onClick={onClickHandler}>
      <span role="img" aria-label="confetti">
        🎉
      </span>
    </button>
  );
};

export default App;
