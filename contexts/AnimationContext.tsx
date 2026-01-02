'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface AnimationContextType {
  isSkipped: boolean;
  skipAnimations: () => void;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isSkipped, setIsSkipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const skipAnimations = useCallback(() => {
    setIsSkipped(true);
    setIsAnimating(false);
  }, []);

  return (
    <AnimationContext.Provider value={{ isSkipped, skipAnimations, isAnimating, setIsAnimating }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}
