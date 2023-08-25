import React, { useState } from 'react';

const HighFiveButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 500);  // Reset after animation
  };

  return (
    <span 
      className={`high-five-btn ${clicked ? 'clicked' : ''}`} 
      onClick={handleClick}
    >
      <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        {/* This is just a placeholder. Replace this with a high five SVG path */}
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
      </svg>
      <span className="sr-only">High Five!</span>
    </span>
  );
}

export default HighFiveButton;
