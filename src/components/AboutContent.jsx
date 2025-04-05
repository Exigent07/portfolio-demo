"use client";

import SplitText from "@/utils/SplitText";
import Nav from "./Nav";
import Progress from "./Progress";
import Squares from "./Squares";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useScroll } from "@/contexts/ScrollContext";
import { gsap } from "gsap";
import Spinner from "./Spinner";

export default function AboutContent() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [currentSection, setCurrentSection] = useScroll();
  const router = useRouter();
  
  const mainRef = useRef(null);
  const sections = useRef([]);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  // Snap scrolling setup
  useEffect(() => {
    if (!loadingComplete) return;

    const isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
    const sectionElements = document.querySelectorAll('section');
    sections.current = Array.from(sectionElements);

    const scrollToSection = (index) => {
      if (isScrolling.current) return;

      isScrolling.current = true;
      setCurrentSection(index);

      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: sections.current[index],
          autoKill: false,
          offsetY: 0,
        },
        ease: "power2.inOut",
        onComplete: () => {
          if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
          scrollTimeout.current = setTimeout(() => {
            isScrolling.current = false;
          }, 150);
        },
      });
    };

    if (!isMobile) {
      const handleWheel = (e) => {
        e.preventDefault();

        const direction = e.deltaY > 0 ? 1 : -1;
        const newSection = Math.max(0, Math.min(sections.current.length - 1, currentSection + direction));

        if (newSection !== currentSection) {
          scrollToSection(newSection);
        }
      };

      const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
          const direction = e.key === 'ArrowDown' ? 1 : -1;
          const newSection = Math.max(0, Math.min(sections.current.length - 1, currentSection + direction));

          if (newSection !== currentSection) {
            scrollToSection(newSection);
          }
        }
      };

      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      let touchStart = 0;
      const handleTouchStart = (e) => {
        touchStart = e.touches[0].clientY;
      };

      const handleTouchMove = (e) => {
        e.preventDefault();
        const touchEnd = e.touches[0].clientY;
        const direction = touchStart > touchEnd ? 1 : -1;

        if (Math.abs(touchStart - touchEnd) > 50) {
          const newSection = Math.max(0, Math.min(sections.current.length - 1, currentSection + direction));
          if (newSection !== currentSection) {
            scrollToSection(newSection);
          }
          touchStart = touchEnd;
        }
      };

      window.addEventListener('touchstart', handleTouchStart, { passive: false });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });

      return () => {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [loadingComplete, currentSection]);

  useEffect(() => {
    setTimeout(() => {
      setLoadingComplete(true);
      gsap.to(mainRef.current, { opacity: 1, duration: 1 });
    }, 2000);
  }, []);

  return (
    <>
      {!loadingComplete && (
        <Spinner />
      )}
      <Nav />
      <Progress sections={["quick", "ask"]} />
      <main
        ref={mainRef}
        id="about-main"
        className="flex break-words flex-col items-center bg-background opacity-0"
      >
        <section id="quick" className="min-h-screen w-full relative flex items-center justify-center">
          <Squares
            className="content-container p-8 !w-[90vw] !h-[60vh] sm:!w-[80vw] md:!w-[70vw] lg:!w-[60vw] lg:!h-[60vh] items-center justify-center"
            squareClass="h-20 w-20"
            content={
              <div className="flex items-center justify-center flex-col space-y-14">
                <h2 className="font-subheading">
                  <SplitText
                    text="Quick Intro"
                    wrapperClass="text-primary flex-wrap"
                    smallClass="text-3xl"
                    mediumClass="md:text-4xl"
                    largeClass="lg:text-8xl"
                  />
                </h2>
                <div className="flex items-center justify-center flex-col">
                  <p className="text-xl md:text-2xl lg:text-3xl font-subheading text-secondary text-center">
                    I'm known as ex1g3n7, exigent, exigent07, or Aravindh.
                  </p>
                  <p className="text-xl md:text-2xl lg:text-3xl font-subheading text-secondary text-center">
                    I love anime === Japanese and, well, cyber sec... I guess.
                  </p>
                  <p className="text-xl md:text-2xl lg:text-3xl font-subheading text-secondary text-center">
                    I play ctf with <a href="https://bi0s.in">team bi0s</a>
                  </p>
                  <p className="text-xl md:text-2xl lg:text-3xl font-subheading text-secondary text-center">
                    I also do some dev in my free time.
                  </p>
                </div>
              </div>
            }
          />
        </section>

        <section id="ask" className="min-h-screen w-full relative flex items-center justify-center">
          <Squares
            className="content-container p-8 !w-[90vw] !h-[60vh] sm:!w-[80vw] md:!w-[70vw] lg:!w-[60vw] lg:!h-[60vh] items-center justify-center"
            squareClass="h-20 w-20"
            content={
              <div className="flex items-center justify-center flex-col space-y-14">
                <h2 className="font-subheading">
                  <SplitText
                    text="Quick Intro"
                    wrapperClass="text-primary flex-wrap"
                    smallClass="text-3xl"
                    mediumClass="md:text-4xl"
                    largeClass="lg:text-8xl"
                  />
                </h2>
                <div className="flex items-center justify-center flex-col">
                  <p className="text-xl md:text-2xl lg:text-3xl font-subheading text-secondary text-center">
                    I'm known as ex1g3n7, exigent, exigent07, or Aravindh.
                  </p>
                  <p className="text-xl md:text-2xl lg:text-3xl font-subheading text-secondary text-center">
                    I love anime === Japanese and, well, cyber sec... I guess.
                  </p>
                  <p className="text-xl md:text-2xl lg:text-3xl font-subheading text-secondary text-center">
                    I also do some dev in my free time.
                  </p>
                </div>
              </div>
            }
          />
        </section>
      </main>
    </>
  );
}
