import React from 'react';

const ParticlesBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* Floating geometric shapes */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`shape-${i}`}
          className="absolute w-2 h-2 border border-purple-300/30 rotate-45 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;