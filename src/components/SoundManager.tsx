import React, { useEffect } from 'react';

interface SoundManagerProps {
  enabled: boolean;
}

export const SoundManager: React.FC<SoundManagerProps> = ({ enabled }) => {
  useEffect(() => {
    if (!enabled) return;

    // Background music simulation (visual feedback only)
    const musicIndicator = document.createElement('div');
    musicIndicator.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      z-index: 1000;
      border: 2px solid #333;
    `;
    musicIndicator.textContent = '♪ Retro Gaming BGM ♪';
    document.body.appendChild(musicIndicator);

    return () => {
      if (document.body.contains(musicIndicator)) {
        document.body.removeChild(musicIndicator);
      }
    };
  }, [enabled]);

  return null;
};