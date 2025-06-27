import React, { useState, useEffect } from 'react';

interface Coin {
  id: number;
  x: number;
  y: number;
  value: number;
  factIndex: number;
  collected: boolean;
}

interface FloatingCoinsProps {
  onCoinCollect: (value: number) => void;
  funFacts: string[];
  soundEnabled: boolean;
  characterPosition: number;
  isJumping: boolean;
}

export const FloatingCoins: React.FC<FloatingCoinsProps> = ({ 
  onCoinCollect, 
  funFacts, 
  soundEnabled,
  characterPosition,
  isJumping
}) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [showFact, setShowFact] = useState<string | null>(null);

  useEffect(() => {
    // Initialize 3 static coins
    const staticCoins: Coin[] = [
      {
        id: 1,
        x: 25,
        y: 40,
        value: 100,
        factIndex: 0,
        collected: false
      },
      {
        id: 2,
        x: 60,
        y: 30,
        value: 150,
        factIndex: 1,
        collected: false
      },
      {
        id: 3,
        x: 80,
        y: 35,
        value: 200,
        factIndex: 2,
        collected: false
      }
    ];
    
    setCoins(staticCoins);
  }, []);

  useEffect(() => {
    if (!isJumping) return;

    coins.forEach(coin => {
      if (coin.collected) return;

      const coinLeft = coin.x;
      const coinRight = coin.x + 8;
      const characterLeft = characterPosition - 4;
      const characterRight = characterPosition + 4;

      if (characterRight >= coinLeft && characterLeft <= coinRight) {
        setCoins(prev => prev.map(c => 
          c.id === coin.id ? { ...c, collected: true } : c
        ));
        
        onCoinCollect(coin.value);
        
        if (funFacts[coin.factIndex]) {
          setShowFact(funFacts[coin.factIndex]);
          setTimeout(() => setShowFact(null), 4000);
        }
      }
    });
  }, [isJumping, characterPosition, coins, funFacts, onCoinCollect]);

  return (
    <>
      {/* Static Coins */}
      {coins.map(coin => (
        !coin.collected && (
          <div
            key={coin.id}
            className="absolute animate-bounce"
            style={{ left: `${coin.x}%`, top: `${coin.y}%` }}
          >
            <div className="w-12 h-12 bg-yellow-400 flex items-center justify-center shadow-lg animate-bounce relative">
              <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white text-xs flex items-center justify-center">
                ✦
              </div>
            </div>
            <div className="text-xs text-white pixel-text text-center mt-1 bg-black/80 rounded px-1">
              +{coin.value}
            </div>
          </div>
        )
      ))}

      {/* Fun Fact Display - Better positioned and more readable */}
      {showFact && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-2xl w-full px-4">
          <div className="bg-yellow-400 text-black p-6 rounded-lg shadow-2xl animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="pixel-text font-bold text-xl">
                💡 FUN FACT UNLOCKED!
              </div>
              <div className="bg-green-400 px-4 py-2 rounded">
                <span className="font-bold text-lg">+100 XP</span>
              </div>
            </div>
            <div className="pixel-text text-lg bg-white p-4 rounded leading-relaxed">
              {showFact}
            </div>
          </div>
        </div>
      )}
    </>
  );
};