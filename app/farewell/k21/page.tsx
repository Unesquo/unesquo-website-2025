'use client';

import { useState, useEffect, useCallback } from 'react';
import { TributeCard } from './components/TributeCard';
import { InteractiveCharacter } from './components/InteractiveCharacter';
import { FloatingCoins } from './components/FloatingCoins';
import { BreakableBricks } from './components/BreakableBricks';
import { FarewellMessage } from './components/FarewellMessage';
import { SoundManager } from './components/SoundManager';
import { Volume2, VolumeX } from 'lucide-react';

// Static member data - will be replaced with MongoDB later
const memberData = {
  name: "MANAN BANSAL",
  guildRank: "HEAD OF SPONSORSHIPS",
  playerRole: "SIR SCRIPTS-A-LOT",
  favoriteWeapon: "SQL (STYLISH. QUIZZER. LEARNER.)",
  finalBoss: "GP BIRLA SCHOLARSHIP",
  imageUrl: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
  farewellMessage: "Whether it was your razor-sharp coding instincts, your deep-rooted rhythm for hip hop, or those rare but deeply healing appearances at college events, every moment left a trail of resonance, like subtle echoes that refuse to fade. You were the quiet force, letting your deeds thunder where words might only whisper.\n\nAnd let us not overlook yet another remarkable facet of yours, your impressive acumen and finesse in quizzing, consistently showcasing sharp wit and an encyclopedic mind, all wrapped in effortless brilliance.\n\nSo, here's to the triumphs and joys awaiting you on your next grand adventure. Keep coding, vibing, and of course, stay as effortlessly stylish as ever. The college halls will undoubtedly feel a shade quieter without your unique resonance, and our club, a beat less vibrant. Your presence has woven an unforgettable threads into the tapestry of our memories, threads we will forever cherish.",
  avatarSprite: "🍄",
  funFacts: [
    "Mastered 5 programming languages in one semester!",
    "Organized the biggest tech fest in college history",
    "Never missed a single UNESQUO meeting",
    "Created the most efficient sorting algorithm for our database",
    "Mentored over 20 junior members"
  ]
};

export default function Home() {
  const [characterPosition, setCharacterPosition] = useState(50);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [bricksDestroyed, setBricksDestroyed] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

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
          playSound('jump');
          break;
        case 'm':
          setSoundEnabled(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moveCharacter, playSound]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 relative overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {/* Stars */}
        <div className="absolute top-10 left-10 text-yellow-300 text-xs animate-pulse">✦</div>
        <div className="absolute top-20 left-32 text-yellow-300 text-xs animate-pulse delay-500">✦</div>
        <div className="absolute top-16 right-20 text-yellow-300 text-xs animate-pulse delay-1000">✦</div>
        <div className="absolute top-32 right-40 text-yellow-300 text-xs animate-pulse delay-1500">✦</div>
        <div className="absolute top-40 left-20 text-yellow-300 text-xs animate-pulse delay-2000">✦</div>
        <div className="absolute top-60 right-60 text-yellow-300 text-xs animate-pulse delay-700">✦</div>
        <div className="absolute top-80 left-60 text-yellow-300 text-xs animate-pulse delay-300">✦</div>
        <div className="absolute top-96 right-32 text-yellow-300 text-xs animate-pulse delay-1200">✦</div>
        
        {/* Plus signs */}
        <div className="absolute top-24 left-60 text-yellow-300 text-sm animate-pulse delay-800">+</div>
        <div className="absolute top-48 right-80 text-yellow-300 text-sm animate-pulse delay-400">+</div>
        <div className="absolute top-72 left-80 text-yellow-300 text-sm animate-pulse delay-1600">+</div>
      </div>

      {/* Sound Control */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="fixed top-4 right-4 z-50 bg-yellow-400 text-black p-3 rounded-lg hover:bg-yellow-300 transition-colors duration-200 shadow-lg pixel-border"
      >
        {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Instructions */}
      <div className="fixed top-4 left-4 z-50 bg-black/90 text-white p-4 rounded-lg pixel-border">
        <div className="text-sm space-y-1 pixel-text">
          <div>🕹️ Use ← → or A/D to move</div>
          <div>🦘 Press ↑, W, or SPACE to jump</div>
          <div>🔊 Press M to toggle sound</div>
          <div>🪙 Click coins for fun facts!</div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Tribute Card Section */}
        <div className="flex justify-center mb-8">
          <TributeCard member={memberData} />
        </div>

        {/* Interactive Game Layer */}
        <div className="relative h-64 mb-8 bg-gradient-to-b from-transparent to-green-600/20 rounded-lg overflow-hidden">
          {/* Floating Coins */}
          <FloatingCoins 
            onCoinCollect={handleCoinCollect}
            funFacts={memberData.funFacts}
            soundEnabled={soundEnabled}
          />
          
          {/* Breakable Bricks */}
          <BreakableBricks 
            onBrickDestroy={handleBrickDestroy}
            soundEnabled={soundEnabled}
          />
          
          {/* Interactive Character */}
          <InteractiveCharacter 
            position={characterPosition}
            sprite={memberData.avatarSprite}
          />
          
          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-green-600 pixel-border-top">
            <div className="w-full h-full bg-repeat-x" 
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='40' fill='%23059669'/%3E%3Crect width='20' height='20' fill='%23047857'/%3E%3Crect x='20' y='20' width='20' height='20' fill='%23047857'/%3E%3C/svg%3E")`
                 }}>
            </div>
          </div>
        </div>

        {/* Farewell Message */}
        {showMessage && (
          <FarewellMessage 
            message={memberData.farewellMessage}
            memberName={memberData.name}
          />
        )}
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
        
        .pixel-border {
          border: 4px solid #333;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
        
        .pixel-border-top {
          border-top: 4px solid #333;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
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
      `}</style>
    </div>
  );
}