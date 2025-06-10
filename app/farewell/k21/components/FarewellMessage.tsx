'use client';

import { useState, useEffect } from 'react';

interface FarewellMessageProps {
  message: string;
  memberName: string;
}

export function FarewellMessage({ message, memberName }: FarewellMessageProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < message.length) {
      const timer = setTimeout(() => {
        setDisplayedText(message.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30); // Faster typing speed

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, message]);

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Brick Border Background */}
      <div className="bg-gradient-to-b from-orange-600 to-orange-700 p-8 pixel-border relative">
        {/* Brick Pattern Border */}
        <div className="absolute inset-0 p-4">
          {/* Top border bricks */}
          <div className="absolute top-0 left-0 right-0 h-8 flex">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`top-${i}`} className="flex-1 h-full bg-orange-500 pixel-border mr-1"></div>
            ))}
          </div>
          
          {/* Bottom border bricks */}
          <div className="absolute bottom-0 left-0 right-0 h-8 flex">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`bottom-${i}`} className="flex-1 h-full bg-orange-500 pixel-border mr-1"></div>
            ))}
          </div>
          
          {/* Left border bricks */}
          <div className="absolute top-8 bottom-8 left-0 w-8 flex flex-col">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={`left-${i}`} className="w-full flex-1 bg-orange-500 pixel-border mb-1"></div>
            ))}
          </div>
          
          {/* Right border bricks */}
          <div className="absolute top-8 bottom-8 right-0 w-8 flex flex-col">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={`right-${i}`} className="w-full flex-1 bg-orange-500 pixel-border mb-1"></div>
            ))}
          </div>
        </div>

        {/* Message Content */}
        <div className="relative z-10 bg-blue-900 p-8 pixel-border mx-8 my-8">
          <div className="text-white pixel-text leading-relaxed text-sm">
            {displayedText.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
            {!isComplete && (
              <span className="animate-blink text-lg text-yellow-400">|</span>
            )}
          </div>
        </div>

        {/* Mario Character */}
        <div className="absolute bottom-4 right-12 text-6xl animate-bounce">
          🍄
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
}