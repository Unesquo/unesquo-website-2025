'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Senior } from '../data/seniors';
import { TributeCard } from '../components/TributeCard';
import { InteractiveCharacter } from '../components/InteractiveCharacter';
import { FloatingCoins } from '../components/FloatingCoins';
import { BreakableBricks } from '../components/BreakableBricks';
import { FarewellMessage } from '../components/FarewellMessage';
import { SoundManager } from '../components/SoundManager';
import { Volume2, VolumeX, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

interface SeniorTributeProps {
  senior: Senior;
  seniorSlug: string;
  onBack: () => void;
}

export const SeniorTribute: React.FC<SeniorTributeProps> = ({ senior, seniorSlug, onBack }) => {
  const [characterPosition, setCharacterPosition] = useState(50);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [bricksDestroyed, setBricksDestroyed] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isJumping, setIsJumping] = useState(false);
  const [showGameHUD, setShowGameHUD] = useState(true);

  const playSound = useCallback((soundType: string) => {
    if (!soundEnabled) return;
    
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different sound frequencies for different actions
    switch(soundType) {
      case 'coin':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        break;
      case 'brick':
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        break;
      case 'jump':
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        break;
    }
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }, [soundEnabled]);

  const handleCoinCollect = useCallback((coinValue: number) => {
    setCoinsCollected(prev => prev + 1);
    setScore(prev => prev + coinValue);
    playSound('coin');
  }, [playSound]);

  const handleBrickDestroy = useCallback(() => {
    setBricksDestroyed(prev => prev + 1);
    setScore(prev => prev + 50);
    playSound('brick');
  }, [playSound]);

  const moveCharacter = useCallback((direction: string) => {
    setCharacterPosition(prev => {
      const speed = 5;
      if (direction === 'left') {
        return Math.max(5, prev - speed);
      } else if (direction === 'right') {
        return Math.min(95, prev + speed);
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch(e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
          e.preventDefault();
          moveCharacter('left');
          break;
        case 'arrowright':
        case 'd':
          e.preventDefault();
          moveCharacter('right');
          break;
        case 'arrowup':
        case 'w':
        case ' ':
          e.preventDefault();
          if (!isJumping) {
            setIsJumping(true);
            playSound('jump');
            setTimeout(() => setIsJumping(false), 500);
          }
          break;
        case 'm':
          setSoundEnabled(prev => !prev);
          break;
        case 'h':
          setShowGameHUD(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moveCharacter, playSound, isJumping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Pixel Heart Component
  const PixelHeart = () => (
    <div className="inline-block w-6 h-6 relative">
      <div className="absolute inset-0 bg-red-500" style={{
        clipPath: 'polygon(50% 85%, 15% 45%, 15% 25%, 35% 25%, 50% 40%, 65% 25%, 85% 25%, 85% 45%)'
      }}>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 relative overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-900 to-pink-900">
        <ParticlesBackground />
        {/* Stars */}
        <div className="absolute top-10 left-10 text-yellow-300 text-xs animate-pulse">✦</div>
        <div className="absolute top-20 left-32 text-yellow-300 text-xs animate-pulse delay-500">✦</div>
        <div className="absolute top-16 right-20 text-yellow-300 text-xs animate-pulse delay-1000">✦</div>
        <div className="absolute top-32 right-40 text-yellow-300 text-xs animate-pulse delay-1500">✦</div>
        <div className="absolute top-40 left-20 text-yellow-300 text-xs animate-pulse delay-2000">✦</div>
        <div className="absolute top-60 right-60 text-yellow-300 text-xs animate-pulse delay-700">✦</div>
        <div className="absolute top-80 left-60 text-yellow-300 text-xs animate-pulse delay-300">✦</div>
        <div className="absolute top-96 right-32 text-yellow-300 text-xs animate-pulse delay-1200">✦</div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-15 left-80 text-yellow-300 text-xs animate-pulse delay-900">✦</div>
        <div className="absolute top-45 right-15 text-yellow-300 text-xs animate-pulse delay-1100">✦</div>
        <div className="absolute top-75 left-40 text-yellow-300 text-xs animate-pulse delay-1300">✦</div>
        <div className="absolute top-85 right-90 text-yellow-300 text-xs animate-pulse delay-1700">✦</div>
        
        {/* Plus signs */}
        <div className="absolute top-24 left-60 text-yellow-300 text-sm animate-pulse delay-800">+</div>
        <div className="absolute top-48 right-80 text-yellow-300 text-sm animate-pulse delay-400">+</div>
        <div className="absolute top-72 left-80 text-yellow-300 text-sm animate-pulse delay-1600">+</div>
        
        {/* Hearts */}
        <div className="absolute top-35 left-1/2 text-pink-300 text-sm animate-bounce delay-400">♥</div>
        <div className="absolute top-65 right-1/2 text-pink-300 text-sm animate-bounce delay-700">♥</div>
        
        {/* Sparkles */}
        <div className="absolute top-25 right-1/3 text-yellow-200 text-lg animate-spin-slow">✧</div>
        <div className="absolute top-55 left-1/3 text-yellow-200 text-lg animate-spin-slow delay-300">✧</div>
        <div className="absolute top-85 right-1/3 text-yellow-200 text-lg animate-spin-slow delay-600">✧</div>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-4 left-4 z-50 bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-500 transition-colors duration-200 shadow-lg flex items-center gap-2"
      >
        <ArrowLeft size={20} />
        <span className="pixel-text">BACK</span>
      </button>

      {/* Control Buttons */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {/* Sound Control */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="bg-yellow-400 text-black p-3 rounded-lg hover:bg-yellow-300 transition-colors duration-200 shadow-lg"
        >
          {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
        
        {/* HUD Toggle */}
        <button
          onClick={() => setShowGameHUD(!showGameHUD)}
          className="bg-blue-400 text-black p-3 rounded-lg hover:bg-blue-300 transition-colors duration-200 shadow-lg"
          title="Toggle Game HUD (H key)"
        >
          {showGameHUD ? <Eye size={24} /> : <EyeOff size={24} />}
        </button>
      </div>

      {/* Game HUD - Top Interface - ONLY SHOW IF ENABLED */}
      {showGameHUD && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 flex items-center gap-6 bg-black/95 p-4 rounded-lg shadow-2xl">
          {/* Score */}
          <div className="text-center">
            <div className="text-yellow-400 game-text text-sm">SCORE</div>
            <div className="text-white game-text text-xl font-bold">{score.toLocaleString()}</div>
          </div>
          
          <div className="w-px h-8 bg-white/50"></div>
          
          {/* Lives with Pixel Hearts */}
          <div className="text-center">
            <div className="text-red-400 game-text text-sm">LIVES</div>
            <div className="flex gap-1 mt-1">
              {Array.from({ length: lives }).map((_, i) => (
                <PixelHeart key={i} />
              ))}
            </div>
          </div>
          
          <div className="w-px h-8 bg-white/50"></div>
          
          {/* Stats */}
          <div className="text-center">
            <div className="text-blue-400 game-text text-sm">COINS</div>
            <div className="text-white game-text text-lg font-bold">{coinsCollected}</div>
          </div>
          
          <div className="text-center">
            <div className="text-orange-400 game-text text-sm">BRICKS</div>
            <div className="text-white game-text text-lg font-bold">{bricksDestroyed}</div>
          </div>
        </div>
      )}

      {/* Instructions - ONLY SHOW IF HUD IS ENABLED - MOVED TO BOTTOM LEFT */}
      {showGameHUD && (
        <div className="fixed bottom-4 left-4 z-50 bg-black/95 text-white p-4 rounded-lg max-w-xs shadow-2xl">
          <div className="text-sm space-y-1 pixel-text">
            <div className="text-yellow-400 font-bold mb-2">CONTROLS:</div>
            <div>🕹️ ← → or A/D: Move</div>
            <div>🦘 ↑, W, SPACE: Jump</div>
            <div>🔊 M: Toggle Sound</div>
            <div>👁️ H: Toggle HUD</div>
            <div className="text-green-400 mt-2">🪙 Jump to collect coins!</div>
            <div className="text-orange-400">🧱 Jump to break bricks!</div>
          </div>
        </div>
      )}

      {/* Main Content - Better spacing and layout */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 min-h-screen">
        {/* Farewell Message at Top - Better spacing to avoid overlap */}
        {showMessage && (
          <div className={`mb-8 ${showGameHUD ? 'mt-32' : 'mt-16'}`}>
            <FarewellMessage
              message={senior.farewellMessage}
              memberName={senior.name}
            />
          </div>
        )}

        {/* Tribute Card Section - Centered and spaced properly */}
        <div className="flex justify-center mb-12">
          <TributeCard member={senior} slug={seniorSlug} />
        </div>

        {/* Interactive Game Layer - Platformer Style - Better positioned */}
        <div className="relative h-96 mb-12 bg-gradient-to-b from-blue-800/30 to-green-600/30 rounded-lg overflow-hidden shadow-2xl">
          {/* Game Background Pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='20' height='20' fill='%23000'/%3E%3Crect width='10' height='10' fill='%23333'/%3E%3Crect x='10' y='10' width='10' height='10' fill='%23333'/%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px'
          }}></div>

          {/* Static Coins - Only unlock on jump collision */}
          <FloatingCoins
            onCoinCollect={handleCoinCollect}
            funFacts={senior.funFacts}
            soundEnabled={soundEnabled}
            characterPosition={characterPosition}
            isJumping={isJumping}
          />

          {/* Static Bricks - Only break on jump collision */}
          <BreakableBricks
            onBrickDestroy={handleBrickDestroy}
            soundEnabled={soundEnabled}
            characterPosition={characterPosition}
            isJumping={isJumping}
          />

          {/* Interactive Character */}
          <InteractiveCharacter
            position={characterPosition}
            sprite={senior.avatarSprite}
            isJumping={isJumping}
          />

          {/* Ground - Retro Game Style */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-green-600">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='%23059669'/%3E%3Crect width='16' height='16' fill='%23047857'/%3E%3Crect x='16' y='16' width='16' height='16' fill='%23047857'/%3E%3Crect x='8' y='8' width='4' height='4' fill='%23065f46'/%3E%3Crect x='20' y='20' width='4' height='4' fill='%23065f46'/%3E%3C/svg%3E")`,
                backgroundSize: '32px 32px'
              }}
            />
            {/* Ground decorations */}
            <div className="absolute top-2 left-8 w-4 h-2 bg-yellow-400"></div>
            <div className="absolute top-2 right-16 w-4 h-2 bg-yellow-400"></div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-yellow-400"></div>
          </div>
        </div>
      </main>
      
      {/* Sound Manager */}
      <SoundManager enabled={soundEnabled} />

      <style jsx global>{`
        .pixel-text {
          font-family: 'Courier New', monospace;
          text-shadow: 2px 2px 0px #000;
          letter-spacing: 1px;
          font-weight: bold;
        }
        
        .game-text {
          font-family: 'Impact', 'Arial Black', 'Helvetica', sans-serif;
          font-weight: 900;
          letter-spacing: 1px;
          text-shadow: 2px 2px 0px rgba(0,0,0,0.8);
          text-transform: uppercase;
        }
        
        .text-shadow {
          text-shadow: 4px 4px 0px #000;
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-8px,0);
          }
          70% {
            transform: translate3d(0,-4px,0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }
        
        .character-bounce {
          animation: bounce 2s infinite;
        }
        
        @keyframes coinSpin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        
        .coin-spin {
          animation: coinSpin 2s linear infinite;
        }

        @keyframes jump {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-100px);
          }
        }
        
        .animate-jump {
          animation: jump 0.5s ease-out;
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};