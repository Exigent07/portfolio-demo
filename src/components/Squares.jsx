"use client"

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Squares({
  style = {},
  className = "",
  id = "squares",
  squareClass = "h-2 w-2",
  content = <h1>Content</h1>,
  onClick = () => {},
  isActive = true,
  onHover = () => {},
  onLeave = () => {},
}) {
  const cornerRefs = {
    topLeft: useRef(null),
    topRight: useRef(null),
    bottomLeft: useRef(null),
    bottomRight: useRef(null),
  };

  useEffect(() => {
    const corners = [
      cornerRefs.topLeft.current,
      cornerRefs.topRight.current,
      cornerRefs.bottomLeft.current,
      cornerRefs.bottomRight.current,
    ];

    gsap.to(corners, {
      opacity: isActive ? 1 : 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  }, [isActive]);

  return (
    <div
      id={id}
      className={`flex relative p-2 cursor-pointer ${className}`}
      style={style}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onLeave()}
      onClick={onClick}
    >
      <div
        ref={cornerRefs.topLeft}
        className={`absolute top-0 left-0 border-l-2 border-t-2 border-highlight ${squareClass}`}
        style={{ opacity: 0 }}
      />
      <div
        ref={cornerRefs.topRight}
        className={`absolute top-0 right-0 border-r-2 border-t-2 border-highlight ${squareClass}`}
        style={{ opacity: 0 }}
      />
      <div
        ref={cornerRefs.bottomLeft}
        className={`absolute bottom-0 left-0 border-l-2 border-b-2 border-highlight ${squareClass}`}
        style={{ opacity: 0 }}
      />
      <div
        ref={cornerRefs.bottomRight}
        className={`absolute bottom-0 right-0 border-r-2 border-b-2 border-highlight ${squareClass}`}
        style={{ opacity: 0 }}
      />
      {content}
    </div>
  );
};