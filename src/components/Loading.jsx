"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Squares from "@/components/Squares";
import LoadingText from "./LoadingText";

export default function Loading({ onComplete }) {
  const [percentage, setPercentage] = useState(0);
  const [speed, setSpeed] = useState(10);

  useLayoutEffect(() => {
    if (localStorage.getItem("cached")) {
      setSpeed(100);
    } else {
      localStorage.setItem("cached", true);
      setSpeed(50);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        const increment = speed === 100 ? 25 : Math.random() * speed;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete, speed]);

  return (
    <div
      id="loading"
      className="flex items-center bg-background justify-center fixed select-none top-0 left-0 h-screen w-screen z-[99]"
    >
      <Squares
        id="percentage-square"
        className="w-[90vw] h-[40vh] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] lg:h-[30vh] cursor-wait items-center justify-center"
        squareClass="h-20 w-20"
        content={<LoadingText text={`${Math.round(percentage)}%`} />}
      />
      <Squares
        className="!px-4 !fixed bottom-10"
        squareClass="h-2 w-2"
        content={
          <p className="text-accent animate-pulse cursor-wait font-subheading text-xs">
            Loading
          </p>
        }
      />
    </div>
  );
}
