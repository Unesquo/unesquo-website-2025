import React, { useState, useEffect } from 'react';

interface FarewellMessageProps {
  message: string;
  memberName: string;
}

export const FarewellMessage: React.FC<FarewellMessageProps> = ({ 
  message, 
  memberName 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < message.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + message[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50); // Typewriter effect speed
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, message]);

  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 p-8 rounded-lg shadow-2xl max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-yellow-400 hero-text mb-4">
          FAREWELL MESSAGE
        </h2>
        <div className="text-white pixel-text text-xl">
          For {memberName}
        </div>
      </div>
      
      <div className="bg-black/70 p-8 rounded">
        <p className="text-white pixel-text leading-relaxed text-lg">
          {displayedText}
          {currentIndex < message.length && (
            <span className="animate-pulse text-yellow-400">|</span>
          )}
        </p>
      </div>
      
      {currentIndex >= message.length && (
        <div className="text-center mt-6">
          <div className="text-yellow-400 hero-text animate-pulse text-2xl">
            ✨ LEGACY COMPLETE ✨
          </div>
        </div>
      )}
    </div>
  );
};