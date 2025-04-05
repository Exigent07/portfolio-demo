"use client";

import { useEffect, useState, useRef } from "react";
import SplitText from "@/utils/SplitText";
import { gsap } from "gsap";
import Squares from "./Squares";

export default function Post({
  className = "",
  style = {},
  heading = "Heading Default",
  type = "CTF Name",
  category = ["category1", "category2", "category3", "category4"],
  premise = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, aut fuga doloribus ex ab aspernatur esse amet labore doloremque maiores!",
  date = new Date().toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }),
}) {
  return (
    <Squares
      className={`post px-4 py-4 relative flex-shrink-0 break-words ${className}`}
      style={{ 
        ...style,
        width: 'clamp(280px, 30vw, 320px)',
        height: 'clamp(400px, 50vh, 450px)'
      }}
      squareClass="h-6 w-6"
      content={
        <div className="flex flex-col space-y-4 justify-center break-words items-center h-full">
          <div className="flex flex-col space-y-3 h-1/2 justify-center items-center">
            <h2 className="text-primary font-subheading text-center" style={{ fontSize: 'clamp(1.25rem, 3vw, 2.25rem)' }}>
              {heading}
            </h2>
            <p className="text-secondary font-subheading text-center" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
              {type}
            </p>
            <p className="text-accent font-subheading w-3/4 items-center justify-center flex flex-wrap gap-1 text-center" 
               style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
              {category.map((value, idx) => (
                <a href={`/${value.toLowerCase()}`} key={idx}>
                  {value}
                </a>
              ))}
            </p>
          </div>
          <p className="text-accent h-1/2 font-subheading text-center" 
             style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>
            {premise}
          </p>
          <p className="text-secondary font-subheading absolute bottom-2" 
             style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
             suppressHydrationWarning>
            {date}
          </p>
        </div>
      }
    />
  );
}