'use client';

import { useState, useCallback } from 'react';

interface FloatingCoinsProps {
  onCoinCollect: (value: number) => void;
  funFacts: string[];
  soundEnabled: boolean;
}

interface Coin {
  id: number;
  x: number;
  y: number;
  value: number;
  factIndex: number;
  collected: boolean;
}

export function FloatingCoins({ onCoinCollect, funFacts, soundEnabled }: FloatingCoinsProps) {
  const [coins, setCoins] = useState<Coin[]>(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 15 + (i * 14),
      y: 20 + (i % 2) * 30,
      value: 100,
      factIndex: i % funFacts.length,
      collected: false
    }))
  );
  
  const [showFact, setShowFact] = useState<{ text: string; x: number; y: number } | null>(null);

  const handleCoinClick = useCallback((coinId: number) => {
    const coin = coins.find(c => c.id === coinId);
    if (!coin || coin.collected) return;

    // Show fun fact
    setShowFact({
      text: funFacts[coin.factIndex],
      x: coin.x,
      y: coin.y
    });

    // Hide fun fact after 3 seconds
    setTimeout(() => setShowFact(null), 3000);

    // Mark coin as collected
    setCoins(prev => prev.map(c => 
      c.id === coinId ? { ...c, collected: true } : c
    ));

    onCoinCollect(coin.value);
  }, [coins, funFacts, onCoinCollect]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Coins */}
      {coins.map(coin => (
        <button
          key={coin.id}
          onClick={() => handleCoinClick(coin.id)}
          disabled={coin.collected}
          className={`absolute pointer-events-auto transition-all duration-500 ${
            coin.collected 
              ? 'opacity-0 scale-0 rotate-180' 
              : 'opacity-100 scale-100 hover:scale-125 cursor-pointer'
          }`}
          style={{
            left: `${coin.x}%`,
            top: `${coin.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className={`text-3xl ${coin.collected ? '' : 'coin-spin hover:animate-pulse'}`}>
            🪙
          </div>
          
          {/* Coin glow effect */}
          {!coin.collected && (
            <div className="absolute inset-0 bg-yellow-400/30 rounded-full animate-ping"></div>
          )}
        </button>
      ))}

      {/* Fun Fact Tooltip */}
      {showFact && (
        <div
          className="absolute z-50 bg-black/90 text-white p-3 rounded-lg pixel-border max-w-xs animate-bounce"
          style={{
            left: `${showFact.x}%`,
            top: `${showFact.y - 15}%`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="text-sm font-bold text-yellow-400 mb-1">💡 Fun Fact!</div>
          <div className="text-xs">{showFact.text}</div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-black/90"></div>
          </div>
        </div>
      )}

      {/* Floating particles for atmosphere */}
      <div className="absolute top-10 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-50"></div>
      <div className="absolute top-32 right-32 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce opacity-40"></div>
    </div>
  );
}