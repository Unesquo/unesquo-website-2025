'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Member {
  name: string;
  guildRank: string;
  playerRole: string;
  favoriteWeapon: string;
  finalBoss: string;
  imageUrl: string;
}

interface TributeCardProps {
  member: Member;
}

export function TributeCard({ member }: TributeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-gradient-to-b from-purple-900 to-purple-800 p-8 pixel-border relative max-w-2xl mx-auto">
      {/* Top Status Bar */}
      <div className="flex justify-between items-center mb-6">
        {/* Hearts */}
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 bg-red-500 pixel-border flex items-center justify-center">
            <span className="text-white text-xs pixel-text">❤️</span>
          </div>
          <div className="w-8 h-8 bg-red-500 pixel-border flex items-center justify-center">
            <span className="text-white text-xs pixel-text">❤️</span>
          </div>
        </div>

        {/* High Score */}
        <div className="text-center">
          <div className="text-yellow-400 text-2xl pixel-text mb-2">HIGH</div>
          <div className="text-yellow-400 text-2xl pixel-text">SCORE</div>
        </div>

        {/* UNESQUO Logo */}
        <div className="w-16 h-16 bg-gray-600 pixel-border rounded-full flex items-center justify-center">
          <span className="text-white text-xs pixel-text">UNESQUO</span>
        </div>
      </div>

      {/* Level Cleared Text */}
      <div className="text-center mb-8">
        <div className="text-white text-xl pixel-text">LEVEL UNESQUO: CLEARED</div>
      </div>

      {/* Character Portrait with Guards */}
      <div className="flex items-center justify-center mb-8">
        {/* Left Guard */}
        <div className="text-6xl mr-8">🤖</div>
        
        {/* Portrait */}
        <div className="relative">
          <div className="w-48 h-48 bg-gray-300 pixel-border rounded-3xl relative overflow-hidden">
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                <div className="text-4xl">🍄</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Guard */}
        <div className="text-6xl ml-8">🤖</div>
      </div>

      {/* Ground/Platform */}
      <div className="h-12 bg-gradient-to-r from-green-600 to-green-500 pixel-border mb-6">
        <div className="w-full h-full bg-repeat-x" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='%23059669'/%3E%3Crect width='16' height='16' fill='%23047857'/%3E%3Crect x='16' y='16' width='16' height='16' fill='%23047857'/%3E%3C/svg%3E")`
             }}>
        </div>
      </div>

      {/* Member Info */}
      <div className="bg-blue-900 p-6 pixel-border">
        <div className="text-center mb-4">
          <div className="text-yellow-400 text-2xl pixel-text">{member.name}</div>
        </div>
        
        <div className="space-y-2 text-white pixel-text text-sm">
          <div><span className="text-cyan-400">GUILD RANK:</span> {member.guildRank}</div>
          <div><span className="text-cyan-400">PLAYER ROLE:</span> {member.playerRole}</div>
          <div><span className="text-cyan-400">FAVOURITE WEAPON:</span> {member.favoriteWeapon}</div>
          <div><span className="text-cyan-400">FINAL BOSS DEFEATED:</span> {member.finalBoss}</div>
        </div>
      </div>

      {/* Insert Coin Message */}
      <div className="mt-6 text-center">
        <div className="bg-black p-4 pixel-border">
          <div className="text-cyan-400 text-lg pixel-text">INSERT COIN TO RESTART LIFE</div>
        </div>
      </div>

      {/* Decorative stars around the card */}
      <div className="absolute -top-2 -left-2 text-yellow-300 text-lg animate-pulse">✦</div>
      <div className="absolute -top-2 -right-2 text-yellow-300 text-lg animate-pulse delay-500">✦</div>
      <div className="absolute -bottom-2 -left-2 text-yellow-300 text-lg animate-pulse delay-1000">✦</div>
      <div className="absolute -bottom-2 -right-2 text-yellow-300 text-lg animate-pulse delay-1500">✦</div>
    </div>
  );
}