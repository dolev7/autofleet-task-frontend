import React, { useState } from 'react';
import './Button.css'; 

export const Button = ({text, hoverText, handleClick} : any) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      className="clickable-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {text}
      {isHovered && <span className="tooltip">{hoverText}</span>}
    </button>
  );
};
