'use client';

import { useEffect, useState } from 'react';
import { useAnimation } from '@/contexts/AnimationContext';

export default function SkipIndicator() {
  const { isAnimating } = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Detect if device is touch-enabled
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
  }, []);

  // Hide indicator after fade out completes
  useEffect(() => {
    if (!isAnimating) {
      // Wait for fade transition to complete before unmounting
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 pointer-events-none select-none transition-opacity duration-500 ease-in-out"
      style={{
        opacity: isAnimating ? 0.6 : 0
      }}
    >
      <p className="text-sm text-gray-400 font-light tracking-wide">
        {isMobile ? 'Tap' : 'Click'} anywhere to skip
      </p>
    </div>
  );
}
