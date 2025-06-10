'use client';

import { useState, useCallback } from 'react';

interface BreakableBricksProps {
  onBrickDestroy: () => void;
  soundEnabled: boolean;
}

interface Brick {
  id: number;
  x: number;
  y: number;
  destroyed: boolean;
  cracking: boolean;
}

export function BreakableBricks({ onBrickDestroy, soundEnabled }: BreakableBricksProps) {
  const [bricks, setBricks] = useState<Brick[]>(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 10 + (i * 10),
      y: 60,
      destroyed: false,
      cracking: false
    }))
  );

  const handleBrickClick = useCallback((brickId: number) => {
    const brick = bricks.find(b => b.id === brickId);
    if (!brick || brick.destroyed) return;

    // Start cracking animation
    setBricks(prev => prev.map(b => 
      b.id === brickId ? { ...b, cracking: true } : b
    ));

    // Destroy brick after crack animation
    setTimeout(() => {
      setBricks(prev => prev.map(b => 
        b.id === brickId ? { ...b, destroyed: true, cracking: false } : b
      ));
      onBrickDestroy();
    }, 300);
  }, [bricks, onBrickDestroy]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {bricks.map(brick => (
        <button
          key={brick.id}
          onClick={() => handleBrickClick(brick.id)}
          disabled={brick.destroyed}
          className={`absolute pointer-events-auto transition-all duration-300 ${
            brick.destroyed 
              ? 'opacity-0 scale-0' 
              : brick.cracking
                ? 'animate-pulse scale-110'
                : 'scale-100 hover:scale-105 cursor-pointer'
          }`}
          style={{
            left: `${brick.x}%`,
            top: `${brick.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className={`w-12 h-6 relative ${
            brick.cracking 
              ? 'bg-gradient-to-r from-orange-600 to-red-600' 
              : 'bg-gradient-to-r from-orange-500 to-orange-600'
          } pixel-border`}>
            {/* Brick texture */}
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-0.5 p-0.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-orange-700 rounded-sm"></div>
                ))}
              </div>
            </div>
            
            {/* Question mark for mystery bricks */}
            {!brick.cracking && !brick.destroyed && (
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                ?
              </div>
            )}
            
            {/* Crack effect */}
            {brick.cracking && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-black text-lg">💥</div>
              </div>
            )}
          </div>
          
          {/* Hover glow */}
          {!brick.destroyed && !brick.cracking && (
            <div className="absolute inset-0 bg-yellow-400/20 rounded opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
          )}
        </button>
      ))}

      {/* Debris particles */}
      {bricks.some(b => b.destroyed) && (
        <div className="absolute inset-0">
          {bricks.filter(b => b.destroyed).map(brick => (
            <div
              key={`debris-${brick.id}`}
              className="absolute"
              style={{
                left: `${brick.x}%`,
                top: `${brick.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Falling debris particles */}
              <div className="absolute animate-bounce">
                <div className="w-1 h-1 bg-orange-600 rounded-full opacity-60"></div>
              </div>
              <div className="absolute animate-ping">
                <div className="w-0.5 h-0.5 bg-orange-500 rounded-full opacity-40"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}