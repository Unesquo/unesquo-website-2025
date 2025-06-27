import React from 'react';
import { Senior } from '../data/seniors';
import { getSeniorImage, getPexelsFallback } from '../data/seniorImages';

interface TributeCardProps {
  member: Senior;
  slug: string;
}

export const TributeCard: React.FC<TributeCardProps> = ({ member, slug }) => {
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
    <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-8 rounded-lg shadow-2xl max-w-md mx-auto">
      {/* Character Portrait */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <img
            src={getSeniorImage(slug)}
            alt={member.name}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-purple-400/50 shadow-lg"
            onError={handleImageError}
          />
        </div>
        
        <h1 className="text-3xl font-bold text-white pixel-text mb-2 text-shadow">
          {member.name}
        </h1>
        
        <div className="bg-purple-600 text-white px-4 py-2 rounded inline-block mb-2">
          <span className="pixel-text text-sm">{member.guildRank}</span>
        </div>
        
        <p className="text-yellow-300 text-lg pixel-text italic">
          "{member.playerRole}"
        </p>
      </div>

      {/* Character Stats */}
      <div className="space-y-3">
        <div className="bg-black/50 p-3 rounded">
          <div className="text-yellow-400 text-sm pixel-text">FAVORITE WEAPON:</div>
          <div className="text-white pixel-text font-bold">{member.favoriteWeapon}</div>
        </div>
        
        <div className="bg-black/50 p-3 rounded">
          <div className="text-red-400 text-sm pixel-text">FINAL BOSS:</div>
          <div className="text-white pixel-text font-bold">{member.finalBoss}</div>
        </div>
      </div>
    </div>
  );
};