"use client";

import { createContext, useContext, useState } from 'react';

const ScrollContext = createContext();

export function ScrollProvider({ children }) {
  const [currentSection, setCurrentSection] = useState(0);

  return (
    <ScrollContext.Provider 
      value={[
        currentSection,
        setCurrentSection
      ]}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
}