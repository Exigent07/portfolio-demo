import { useEffect, useRef } from 'react';
import Squares from "@/components/Squares";
import gsap from 'gsap';

const BlogSquares = () => {
  const squares = [
    'New', 'Stories,', 'Fresh',
    'Insights,', 'Visit Blog', 'Limitless',
    'Ideas,', 'Sharp', 'Skills.'
  ];
  
  const containerRef = useRef();

  return (
    <div ref={containerRef} className="w-[70%] items-center justify-center grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 md:gap-16 lg:gap-20">
      {squares.map((text, index) => (
        <Squares
          key={index}
          className={`square flex items-center h-[75px] md:h-[90px] lg:h-[115px] w-auto justify-center
            ${text === 'Visit Blog' ? 'col-span-2 md:col-span-1' : ''}`}
          squareClass={`h-6 w-6 md:h-8 md:w-8 ${text === 'Visit Blog' ? 'border-none' : ''}`}
          content={
            <span className="text-accent font-subheading text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center">{text}</span>
          }
        >
        </Squares>
      ))}
    </div>
  );
};

export default BlogSquares;