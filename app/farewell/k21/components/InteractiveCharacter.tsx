'use client';

import { useState, useEffect } from 'react';

interface InteractiveCharacterProps {
  position: number;
  sprite: string;
}

export function InteractiveCharacter({ position, sprite }: InteractiveCharacterProps) {
  const [isIdle, setIsIdle] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [lastPosition, setLastPosition] = useState(position);

  useEffect(() => {
    if (position !== lastPosition) {
      setIsMoving(true);
      setIsIdle(false);
      
      const timer = setTimeout(() => {
        setIsMoving(false);
        // Start idle animation after 3 seconds of no movement
        const idleTimer = setTimeout(() => {
          setIsIdle(true);
        }, 3000);
        
        return () => clearTimeout(idleTimer);
      }, 200);
      
      setLastPosition(position);
      return () => clearTimeout(timer);
    }
  }, [position, lastPosition]);

  return (
    <div 
      className={`absolute bottom-16 transition-all duration-200 ease-out ${
        isIdle ? 'character-bounce' : ''
      } ${isMoving ? 'scale-110' : 'scale-100'}`}
      style={{ 
        left: `${position}%`,
        transform: `translateX(-50%) ${isMoving ? 'translateY(-4px)' : 'translateY(0px)'}`
      }}
    >
      {/* Character Shadow */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-black/30 rounded-full"></div>
      
      {/* Character Sprite */}
      <div className={`text-4xl transition-transform duration-200 ${
        isMoving ? 'animate-pulse' : ''
      }`}>
        {sprite}
      </div>
      
      {/* Movement particles */}
      {isMoving && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
      )}
      
      {/* Idle effects */}
      {isIdle && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="text-xs animate-bounce">💭</div>
        </div>
      )}
    </div>
  );
}