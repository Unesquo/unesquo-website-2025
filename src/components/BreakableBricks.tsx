import React, { useState, useEffect } from 'react';

interface Brick {
  id: number;
  x: number;
  y: number;
  hits: number;
  maxHits: number;
  destroyed: boolean;
}

interface BreakableBricksProps {
  onBrickDestroy: () => void;
  soundEnabled: boolean;
  characterPosition: number;
  isJumping: boolean;
}

export const BreakableBricks: React.FC<BreakableBricksProps> = ({ 
  onBrickDestroy, 
  soundEnabled,
  characterPosition,
  isJumping
}) => {
  const [bricks, setBricks] = useState<Brick[]>([]);

  useEffect(() => {
    // Initialize 2 static bricks
    const staticBricks: Brick[] = [
      {
        id: 1,
        x: 35,
        y: 25,
        hits: 0,
        maxHits: 2,
        destroyed: false
      },
      {
        id: 2,
        x: 70,
        y: 20,
        hits: 0,
        maxHits: 3,
        destroyed: false
      }
    ];
    
    setBricks(staticBricks);
  }, []);

  useEffect(() => {
    if (!isJumping) return;

    bricks.forEach(brick => {
      if (brick.destroyed) return;

      const brickLeft = brick.x;
      const brickRight = brick.x + 10;
      const characterLeft = characterPosition - 4;
      const characterRight = characterPosition + 4;

      if (characterRight >= brickLeft && characterLeft <= brickRight) {
        setBricks(prev => prev.map(b => {
          if (b.id === brick.id) {
            const newHits = b.hits + 1;
            if (newHits >= b.maxHits) {
              onBrickDestroy();
              return { ...b, hits: newHits, destroyed: true };
            }
            return { ...b, hits: newHits };
          }
          return b;
        }));
      }
    });
  }, [isJumping, characterPosition, bricks, onBrickDestroy]);

  const getBrickColor = (hits: number, maxHits: number) => {
    const ratio = hits / maxHits;
    if (ratio === 0) return 'bg-orange-500';
    if (ratio < 0.5) return 'bg-orange-600';
    if (ratio < 1) return 'bg-red-500';
    return 'bg-red-700';
  };

  return (
    <>
      {bricks.map(brick => (
        !brick.destroyed && (
          <div
            key={brick.id}
            className="absolute"
            style={{ left: `${brick.x}%`, top: `${brick.y}%` }}
          >
            <div className={`w-16 h-8 flex items-center justify-center shadow-lg relative ${getBrickColor(brick.hits, brick.maxHits)}`}>
              {/* Brick pattern */}
              <div className="absolute inset-1"></div>
              <div className="text-white pixel-text text-xs font-bold">
                {brick.maxHits - brick.hits}
              </div>
              {/* Crack effects based on hits */}
              {brick.hits > 0 && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1 left-2 w-px h-4 bg-black/50 transform rotate-12"></div>
                  <div className="absolute bottom-1 right-2 w-px h-3 bg-black/50 transform -rotate-12"></div>
                </div>
              )}
            </div>
          </div>
        )
      ))}
    </>
  );
};