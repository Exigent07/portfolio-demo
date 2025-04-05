"use client";

import { useState, useEffect } from 'react';
import Squares from './Squares';
import SplitText from "@/utils/SplitText";
import Post from './Post';

const PostsSection = () => {
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setContainerWidth(window.innerWidth);
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setContainerWidth(width);

      if (width >= 1350) {
        setVisiblePosts(3);
      } else if (width >= 845) {
        setVisiblePosts(2);
      } else {
        setVisiblePosts(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="updates"
      className={`min-h-screen w-full flex items-center ${
        containerWidth <= 768 ? "flex-col justify-evenly" : "justify-around"
      }`}
    >
      <Squares
        className={`!px-6 lg:!px-12 !py-8 !h-[25px] sm:!h-auto !w-auto break-words ${
          containerWidth >= 768 ? "rotate-180" : "rotate-0"
        }`}
        style={
          containerWidth >= 768
            ? { writingMode: "vertical-lr" }
            : {}
        }
        squareClass="h-6 w-6"
        content={
          <SplitText
            text="Breaking Updates"
            smallClass="text-xl"
            mediumClass="md:text-3xl"
            largeClass="lg:text-5xl"
            wrapperClass="text-accent font-subheading text-xs text-accent break-words"
          />
        }
      />

      <div
        id="posts"
        className="flex items-center justify-center flex-row gap-12 sm:max-h-[60vh] md:max-h-none flex-wrap overflow-x-hidden"
      >
        {[...Array(visiblePosts)].map((_, index) => (
          <Post key={index} />
        ))}
      </div>
    </section>
  );
};

export default PostsSection;
