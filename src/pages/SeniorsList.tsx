import React from 'react';
import { seniors } from '../data/seniors';
import { getSeniorImage } from '../data/seniorImages';
import { Volume2, VolumeX } from 'lucide-react';

interface SeniorsListProps {
  onSeniorSelect: (slug: string) => void;
}

export const SeniorsList: React.FC<SeniorsListProps> = ({ onSeniorSelect }) => {
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 relative overflow-hidden">
      {/* Retro Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-900 to-pink-900">
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
        
        {/* Hearts */}
        <div className="absolute top-35 left-1/2 text-pink-300 text-sm animate-bounce delay-400">♥</div>
        <div className="absolute top-65 right-1/2 text-pink-300 text-sm animate-bounce delay-700">♥</div>
      </div>

      {/* Sound Control */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="fixed top-4 right-4 z-50 bg-yellow-400 text-black p-3 rounded-lg hover:bg-yellow-300 transition-colors duration-200 shadow-lg border-4 border-black"
      >
        {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white pixel-text mb-6 text-shadow">
            LEGENDS
          </h1>
          <div className="text-yellow-400 pixel-text text-xl mb-4">
            ⭐ SELECT YOUR HERO ⭐
          </div>
          <p className="text-white pixel-text max-w-3xl mx-auto leading-relaxed">
            Welcome to the Hall of Champions! Click on any senior to experience their legendary journey.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 pixel-text">{Object.keys(seniors).length}</div>
              <div className="text-sm text-white pixel-text">LEGENDARY SENIORS</div>
            </div>
            <div className="w-px h-12 bg-yellow-400/50" />
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 pixel-text">∞</div>
              <div className="text-sm text-white pixel-text">MEMORIES CREATED</div>
            </div>
            <div className="w-px h-12 bg-yellow-400/50" />
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 pixel-text">2025</div>
              <div className="text-sm text-white pixel-text">LEGACY YEAR</div>
            </div>
          </div>
        </div>

        {/* Seniors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.entries(seniors).map(([slug, senior]) => (
            <div
              key={slug}
              onClick={() => onSeniorSelect(slug)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-gradient-to-br from-purple-800 to-blue-800 p-6 rounded-lg border-4 border-purple-500/30 hover:border-purple-400/60 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                {/* Character Avatar with Image */}
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-purple-400/50 shadow-lg group-hover:shadow-purple-400/50 transition-all duration-300">
                    <img 
                      src={getSeniorImage(slug)}
                      alt={senior.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to gradient background if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.classList.add('bg-gradient-to-br', 'from-purple-600', 'to-purple-800');
                      }}
                    />
                  </div>
                </div>

                {/* Character Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white pixel-text mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                    {senior.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="px-3 py-1 bg-purple-600 rounded border-2 border-purple-400 text-white pixel-text">
                      {senior.guildRank}
                    </div>
                    
                    <div className="text-yellow-300 italic pixel-text">
                      "{senior.playerRole}"
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-xs text-white pixel-text">
                      <span>⚔️</span>
                      <span className="truncate">{senior.favoriteWeapon}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effects */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* NO LVL 21 BADGE - REMOVED AS REQUESTED */}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <div className="inline-block px-8 py-4 bg-black/50 rounded-lg border-4 border-purple-500/50">
            <p className="text-white pixel-text text-lg">
              "True legends never fade - they become the light that guides future generations."
            </p>
            <p className="text-sm text-yellow-400 pixel-text mt-2">— In honor of those who shaped our legacy</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .pixel-text {
          font-family: 'Courier New', monospace;
          text-shadow: 2px 2px 0px #000;
          letter-spacing: 1px;
          font-weight: bold;
        }
        
        .text-shadow {
          text-shadow: 4px 4px 0px #000;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
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