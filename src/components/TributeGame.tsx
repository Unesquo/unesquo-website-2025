import React, { useState, useEffect } from 'react';
import { Senior } from '../data/seniors';
import { Sword, Shield, Zap, Heart, Star, Trophy } from 'lucide-react';

interface TributeGameProps {
  senior: Senior;
}

export const TributeGame: React.FC<TributeGameProps> = ({ senior }) => {
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);

  const maxExp = level * 100;
  const expPercentage = (experience / maxExp) * 100;

  const collectReward = () => {
    const newCoins = Math.floor(Math.random() * 50) + 10;
    const newExp = Math.floor(Math.random() * 30) + 15;
    
    setCoins(prev => prev + newCoins);
    setExperience(prev => {
      const total = prev + newExp;
      if (total >= maxExp) {
        setLevel(prevLevel => prevLevel + 1);
        return total - maxExp;
      }
      return total;
    });
    
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000);

    // Add achievements
    if (coins + newCoins >= 500 && !achievements.includes('Coin Master')) {
      setAchievements(prev => [...prev, 'Coin Master']);
    }
    if (level >= 5 && !achievements.includes('Veteran Tribute')) {
      setAchievements(prev => [...prev, 'Veteran Tribute']);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/50 to-black/50 rounded-xl p-6 
                    border-2 border-purple-500/30 backdrop-blur-sm">
      
      {/* Game Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 
                          rounded-full flex items-center justify-center text-xl">
            {senior.avatarSprite}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Tribute Master</h3>
            <p className="text-sm text-purple-300">Level {level}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2 text-gold-400 font-bold">
            <span className="text-2xl">🪙</span>
            <span className="text-xl">{coins}</span>
          </div>
        </div>
      </div>

      {/* Experience Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span>Experience</span>
          <span>{experience}/{maxExp} XP</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full
                       transition-all duration-500 ease-out"
            style={{ width: `${expPercentage}%` }}
          />
        </div>
      </div>

      {/* Character Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-purple-800/30 rounded-lg p-3 text-center">
          <Sword className="w-6 h-6 mx-auto mb-2 text-red-400" />
          <div className="text-sm text-gray-300">Attack</div>
          <div className="text-lg font-bold text-white">{level * 15 + 25}</div>
        </div>
        
        <div className="bg-purple-800/30 rounded-lg p-3 text-center">
          <Shield className="w-6 h-6 mx-auto mb-2 text-blue-400" />
          <div className="text-sm text-gray-300">Defense</div>
          <div className="text-lg font-bold text-white">{level * 12 + 20}</div>
        </div>
        
        <div className="bg-purple-800/30 rounded-lg p-3 text-center">
          <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
          <div className="text-sm text-gray-300">Magic</div>
          <div className="text-lg font-bold text-white">{level * 18 + 30}</div>
        </div>
        
        <div className="bg-purple-800/30 rounded-lg p-3 text-center">
          <Heart className="w-6 h-6 mx-auto mb-2 text-pink-400" />
          <div className="text-sm text-gray-300">Health</div>
          <div className="text-lg font-bold text-white">{level * 20 + 100}</div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={collectReward}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 
                   hover:from-purple-500 hover:to-purple-600 text-white font-bold 
                   rounded-lg transition-all duration-300 transform hover:scale-105
                   shadow-lg hover:shadow-purple-500/50 relative overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <Trophy className="w-5 h-5" />
          Pay Tribute & Collect Rewards
        </span>
        
        {showAnimation && (
          <div className="absolute inset-0 bg-gradient-to-r from-gold-400/30 to-gold-600/30 
                          animate-pulse z-0" />
        )}
      </button>

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-bold text-purple-300 mb-2 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Achievements Unlocked
          </h4>
          <div className="flex flex-wrap gap-2">
            {achievements.map((achievement, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gold-500/20 text-gold-400 text-xs rounded-full
                           border border-gold-500/30"
              >
                {achievement}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Coin Animation */}
      {showAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-6xl animate-bounce">🪙</div>
            <div className="text-gold-400 font-bold text-xl animate-pulse mt-2">
              +{Math.floor(Math.random() * 50) + 10} coins!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};