import React from 'react';
import { Senior } from '../data/seniors';
import { getSeniorImage, getPexelsFallback } from '../data/seniorImages';

interface SeniorCardProps {
  senior: Senior;
  slug: string;
  onClick: () => void;
}

export const SeniorCard: React.FC<SeniorCardProps> = ({ senior, slug, onClick }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const currentSrc = target.src;
    
    // If it's already a Pexels URL, don't change it
    if (currentSrc.includes('pexels.com')) {
      return;
    }
    
    // If local image fails, use Pexels fallback
    target.src = getPexelsFallback(slug);
  };

  return (
    <div 
      onClick={onClick}
      className="group relative bg-gradient-to-br from-purple-900/30 to-purple-800/20 
                 border-2 border-purple-500/30 rounded-xl p-6 cursor-pointer
                 transform transition-all duration-300 hover:scale-105 hover:border-purple-400/60
                 hover:shadow-2xl hover:shadow-purple-500/25 backdrop-blur-sm"
    >
      {/* Character Avatar with Image */}
      <div className="relative mb-4">
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden
                        border-4 border-purple-400/50 shadow-lg group-hover:shadow-purple-400/50
                        transition-all duration-300">
          <img 
            src={getSeniorImage(slug)}
            alt={senior.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold-400 rounded-full
                        flex items-center justify-center text-xs font-bold text-black
                        animate-pulse">
          ⭐
        </div>
      </div>

      {/* Character Info */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300
                       transition-colors duration-300 pixel-text">
          {senior.name}
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="px-3 py-1 bg-purple-700/50 rounded-full text-purple-200 pixel-text">
            {senior.guildRank}
          </div>
          
          <div className="text-gray-300 italic pixel-text">
            "{senior.playerRole}"
          </div>
          
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pixel-text">
            <span>⚔️</span>
            <span className="truncate">{senior.favoriteWeapon}</span>
          </div>
        </div>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400/10 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};