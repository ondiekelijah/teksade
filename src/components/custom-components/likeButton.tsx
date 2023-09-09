import { Button, useMantineColorScheme } from "@mantine/core";
import React from "react";

interface AppProps {
  onClickHandler: () => void;
  disabled?: boolean;
  likes?: number;
}

const App: React.FC<AppProps> = ({ onClickHandler, disabled, likes }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <Button disabled={disabled} variant="subtle" className="like-button" onClick={onClickHandler}>
      <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}>{likes}</p>
      <span role="img" aria-label="confetti" className="mb-1.5">
        🎉
      </span>
    </Button>
  );
};

export default App;
