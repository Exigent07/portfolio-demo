"use client"

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const LoadingText = ({
  text = "",
  smallClass = "text-6xl",
  mediumClass = "md:text-6xl",
  largeClass = "lg:text-8xl",
  wrapperClass = "",
  wrapperStyle = {},
  charStyle = {},
}) => {
  const containerRef = useRef(null);
  const previousText = useRef(text);
  const cycleCount = useRef(0);
  
  const fontClasses = [
    'font-load1',
    'font-load2',
    'font-load3'
  ];

  const getFontForPosition = (position) => {
    const index = (position + cycleCount.current) % fontClasses.length;
    return fontClasses[index];
  };

  useGSAP(() => {
    if (text !== previousText.current) {
      const elements = containerRef.current.children;
      const chars = text.split("");
      
      if (text === "100%") {
        chars.forEach((_, index) => {
          const element = elements[index];
          if (!element) return;
          
          fontClasses.forEach(font => element.classList.remove(font));
          element.classList.add(fontClasses[0]);
          
          gsap.fromTo(element, 
            { scale: 0.8, opacity: 0.8 },
            { 
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "elastic.out(1.2)"
            }
          );
        });
      } else {
        cycleCount.current = (cycleCount.current + 1) % fontClasses.length;
        
        chars.forEach((_, index) => {
          const element = elements[index];
          if (!element) return;

          fontClasses.forEach(font => element.classList.remove(font));
          const newFont = getFontForPosition(index);
          element.classList.add(newFont);

          gsap.fromTo(element, 
            { scale: 0.8 },
            { 
              scale: 1,
              duration: 0.3,
              ease: "back.out(1.7)"
            }
          );
        });
      }

      previousText.current = text;
    }
  }, [text]);

  useEffect(() => {
    const elements = containerRef.current.children;
    const chars = text.split("");
    
    chars.forEach((_, index) => {
      const element = elements[index];
      if (!element) return;
      const initialFont = text === "100%" ? fontClasses[0] : getFontForPosition(index);
      element.classList.add(initialFont);
    });
  }, []);

  return (
    <div
      id="loading-text"
      ref={containerRef}
      className={`flex items-center justify-center ${wrapperClass}`}
      style={wrapperStyle}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          style={charStyle}
          className={`inline-block ${smallClass} ${mediumClass} ${largeClass}`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

export default LoadingText;