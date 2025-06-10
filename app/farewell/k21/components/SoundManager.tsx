'use client';

import { useEffect } from 'react';

interface SoundManagerProps {
  enabled: boolean;
}

export function SoundManager({ enabled }: SoundManagerProps) {
  useEffect(() => {
    if (!enabled) return;

    // Background music simulation (subtle ambient sounds)
    const playAmbientSound = () => {
      if (!enabled) return;
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Very subtle ambient tone
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(110, audioContext.currentTime + 4);
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 8);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 8);
    };

    // Play ambient sound every 30 seconds
    const interval = setInterval(playAmbientSound, 30000);
    
    // Play initial ambient sound after 5 seconds
    const timeout = setTimeout(playAmbientSound, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [enabled]);

  return null; // This component doesn't render anything
}