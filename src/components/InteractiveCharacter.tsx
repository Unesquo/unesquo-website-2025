import React from 'react';

interface InteractiveCharacterProps {
  position: number;
  sprite: string;
  isJumping: boolean;
}

export const InteractiveCharacter: React.FC<InteractiveCharacterProps> = ({ 
  position, 
  sprite, 
  isJumping 
}) => {
  return (
    <div
      className={`absolute bottom-16 transition-all duration-200 ${isJumping ? 'animate-jump' : 'character-bounce'}`}
      style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
    >
      {/* Retro Game Character Box */}
      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg relative">
        {/* Character face/design */}
        <div className="absolute inset-2 bg-purple-400"></div>
        {/* Eyes */}
        <div className="absolute top-3 left-3 w-2 h-2 bg-white"></div>
        <div className="absolute top-3 right-3 w-2 h-2 bg-white"></div>
        {/* Mouth */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black"></div>
      </div>
      {/* Character shadow */}
      <div className="w-12 h-4 bg-black/30 rounded-full mx-auto mt-1 blur-sm" />
    </div>
  );
};