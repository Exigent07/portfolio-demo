"use client";

import { useEffect, useState, useRef } from "react";
import SplitText from "@/utils/SplitText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Squares from "@/components/Squares";
import { useScroll } from "@/contexts/ScrollContext";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Progress({ sections }) {
  const [currentSection, setCurrentSection] = useScroll();
  const [activeSection, setActiveSection] = useState("landed");
  const [hoveredSection, setHoveredSection] = useState(null);
  const animationRefs = useRef({});

  useEffect(() => {
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => handleSectionChange(section),
        onEnterBack: () => handleSectionChange(section),
      });
    });

    return () => {
      Object.values(animationRefs.current).forEach((animation) => animation?.kill());
      animationRefs.current = {};
    };
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    
    setCurrentSection(sections.indexOf(section));
  };

  const handleSquareClick = (sectionId) => {
    const targetSection = sectionId.replace("-progress", "");
    const element = document.getElementById(targetSection);
  
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element.offsetTop },
        ease: "power4.inOut",
      });
  
      handleSectionChange(targetSection);
    }
  };
  
  const handleHover = (hoveredId) => {
    const sectionId = hoveredId.replace("-progress", "");
    if (sectionId !== activeSection) {
      setHoveredSection(sectionId);

      if (animationRefs.current[hoveredId]) {
        animationRefs.current[hoveredId].kill();
      }

      const chars = document.querySelectorAll(`#${hoveredId} .split-char`);
      if (chars.length > 0) {
        const animation = gsap.fromTo(
          chars,
          { 
            opacity: 0.6,
            duration: 0.5,
            ease: "power1.inOut",

          },
          {
            opacity: 1,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            stagger: {
              each: 0.1,
              from: "start",
            },
          }
        );

        animationRefs.current[hoveredId] = animation;
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);

    Object.keys(animationRefs.current).forEach((key) => {
      if (animationRefs.current[key]) {
        animationRefs.current[key].kill();
        delete animationRefs.current[key];
      }
    });

    const chars = document.querySelectorAll(`.split-char`);
    gsap.to(chars, { opacity: 1, scale: 1, duration: 0.2 });
  };

  return (
    <div
      id="progress"
      className="flex items-center bg-transparent justify-center fixed select-none gap-4 sm:gap-6 md:gap-8 lg:gap-32 bottom-0 lg:bottom-5 h-20 w-full md:w-full lg:w-3/4 z-40"
      onMouseLeave={handleMouseLeave}
    >
      {sections.map((section, idx) => (
        <Squares
          key={idx}
          className="!px-2 !md:px-3 lg:!px-4"
          id={`${section}-progress`}
          squareClass="h-2 w-2"
          isActive={
            activeSection === section ||
            hoveredSection === section
          }
          onHover={() => handleHover(`${section}-progress`)}
          onLeave={handleMouseLeave}
          onClick={() => handleSquareClick(`${section}-progress`)}
          content={
            <SplitText
              text={section[0].toUpperCase() + section.slice(1)}
              smallClass="text-[0.6rem]"
              mediumClass="md:text-xs"
              largeClass="lg:text-xs"
              wrapperClass="text-accent font-subheading text-xs hover:animate-pulse"
            />
          }
        />
      ))}
    </div>
  );
}
