"use client"

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import TypeIt from "typeit-react";
import Squares from "@/components/Squares";
import Loading from "@/components/Loading";
import Progress from "@/components/Progress";
import Nav from "@/components/Nav";
import { useGSAP } from "@gsap/react";
import SplitText from "@/utils/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import BlogSquares from "@/components/BlogSquares";
import PostsSection from "@/components/PostsSection";
import { useScroll } from "@/contexts/ScrollContext";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function HomeContent() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [currentSection, setCurrentSection] = useScroll();
  const router = useRouter();
  
  const mainRef = useRef(null);
  const sections = useRef([]);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  useGSAP(() => {
    if (loadingComplete) {
      const timeline = gsap.timeline({
        onComplete: () => {
          setStartTyping(true);
        },
      });
  
      const squareWidth = document.querySelector(".content-container")?.offsetWidth || 0;
      const squareHeight = document.querySelector(".content-container")?.offsetHeight || 0;
  
      timeline
        .to("#loading #loading-text, #loading #squares:last-child", {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        })
        .to(
          "#percentage-square",
          {
            width: `${squareWidth}px`,
            height: `${squareHeight}px`,
            pointerEvents: "none",
            duration: 0.5,
            ease: "power4.out",
          },
          "-=0.5"
        )
        .to("#loading", {
          opacity: 0,
          duration: 0.8,
          pointerEvents: "none",
          ease: "power4.out",
          onComplete: () => {
            gsap.to("#loading", {
              display: "none",
              duration: 0,
              delay: 0.8,
            });
          },
        },
      );
    }
  }, [loadingComplete]);
  

  // Section animations setup
  useGSAP(() => {
    if (!loadingComplete) return;

    // Landing section animation
    gsap.from("#landed .content-container", {
      scrollTrigger: {
        trigger: "#landed",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
      y: 100,
      opacity: 0,
      duration: 1,
    });

    // Who section animation
    gsap.from("#who .content-container", {
      scrollTrigger: {
        trigger: "#who",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
      scale: 0.8,
      opacity: 0,
      duration: 1,
    });

    // Updates section animation
    gsap.from("#updates #posts .post", {
      scrollTrigger: {
        trigger: "#updates",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
      x: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
    });

    // Blog squares animation
    gsap.from("#blog .square", {
      scrollTrigger: {
        trigger: "#blog",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
      scale: 0,
      opacity: 0,
      stagger: {
        each: 0.3,
        grid: [3, 3],
        from: "center",
      },
      duration: 1,
    });

    // Works section animation
    gsap.from("#works .content-container", {
      scrollTrigger: {
        trigger: "#works",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
      x: -100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
    });

    // Bye section animation
    gsap.from("#bye .content-container, #bye #links", {
      scrollTrigger: {
        trigger: "#bye",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
    });
  }, [loadingComplete]);

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
  
  return (
    <>
      <Loading onComplete={() => setLoadingComplete(true)} />
      <Nav />
      <Progress 
         sections={["landed", "who", "updates", "blog", "works", "bye"]}
      />
      <main id="main" ref={mainRef} className="flex break-words flex-col items-center bg-background">
        <section id="landed" className="min-h-screen w-full flex items-center justify-center">
          <Squares
            className="content-container !w-[90vw] !h-[60vh] sm:!w-[80vw] md:!w-[70vw] lg:!w-[60vw] lg:!h-[60vh] items-center justify-center"
            squareClass="h-20 w-20"
            content={
              <div className="flex items-center justify-center flex-col space-y-4">
                {startTyping && (
                  <>
                    <TypeIt
                      options={{
                        strings: ["こんにちは"],
                        cursor: false,
                        waitUntilVisible: true,
                        speed: 150,
                        startDelay: 0,
                      }}
                      as={"h1"}
                      className="text-5xl md:text-6xl break-words lg:text-8xl text-primary"
                    />
                    <TypeIt
                      options={{
                        strings: ["私は"],
                        cursor: false,
                        waitUntilVisible: true,
                        speed: 150,
                        startDelay: 0,
                      }}
                      as={"p"}
                      className="text-xl md:text-2xl break-words lg:text-3xl text-secondary"
                    />
                    <TypeIt
                      options={{
                        loop: true,
                        cursor: false,
                        waitUntilVisible: true,
                        nextStringDelay: 2500,
                        speed: 150,
                        startDelay: 0,
                        afterComplete: (instance) => {
                          instance
                            .delete()
                            .type("Aravindh")
                            .pause(2000)
                            .move(-1)
                            .delete(1)
                            .delete(1)
                            .delete(1)
                            .delete(1)
                            .delete(1)
                            .delete(1)
                            .delete(1)
                            .type("Exigent")
                            .type(" ")
                            .type("<span class='text-secondary'>#</span>")
                            .type(" ")
                            .move(1)
                            .delete(1)
                            .type("<span class='text-secondary'>H</span>")
                            .move(null, { to: "END" })
                            .pause(2000)
                            .go();
                        },
                      }}
                      as={"h1"}
                      className="text-5xl md:text-6xl break-words lg:text-8xl text-accent"
                    />
                    <TypeIt
                      options={{
                        loop: true,
                        cursor: false,
                        waitUntilVisible: true,
                        nextStringDelay: 2500,
                        speed: 150,
                        startDelay: 0,
                        afterComplete: (instance) => {
                          instance
                            .delete()
                            .type("CTF Player")
                            .pause(2000)
                            .delete()
                            .type("Web Researcher")
                            .pause(2000)
                            .go();
                        },
                      }}
                      as={"p"}
                      className="text-xl break-words md:text-2xl lg:text-3xl text-secondary"
                    />
                  </>
                )}
              </div>
            }
          />
        </section>

        <section id="who" className="min-h-screen w-full relative flex items-center justify-center">
          <Squares
            className="content-container p-8 !w-[90vw] !h-[60vh] sm:!w-[80vw] md:!w-[70vw] lg:!w-[60vw] lg:!h-[60vh] items-center justify-center"
            squareClass="h-20 w-20"
            content={
              <div className="flex items-center justify-center flex-col space-y-14">
                <h2 className="font-subheading">
                  <SplitText
                    text="Unraveling"
                    wrapperClass="text-primary flex-wrap"
                    smallClass="text-3xl"
                    mediumClass="md:text-4xl"
                    largeClass="lg:text-8xl"
                  />
                  <SplitText
                    text="Mysteries,"
                    wrapperClass="text-primary flex-wrap break-words"
                    smallClass="text-3xl"
                    mediumClass="md:text-4xl"
                    largeClass="lg:text-8xl"
                  />
                </h2>
                <div className="flex items-center justify-center flex-col">
                  <p className="text-xl md:text-2xl lg:text-3xl font-subheading text-secondary text-center">
                    Stick around—there's always a story
                  </p>
                  <p className="text-xl md:text-2xl lg:text-3xl font-subheading text-secondary text-center">
                    to uncover.
                  </p>
                </div>
                <Squares
                  className="!px-8 !py-4 w-[150px] h-[30px] md:h-[50px] lg:h-[75px] lg:w-[250px] flex items-center justify-center"
                  squareClass="h-2.5 w-2.5 md:h-4 md:w-4 lg:h-6 lg:w-6"
                  onClick={() => router.push("/about")}
                  content={
                    <SplitText
                      text="Know More"
                      smallClass="text-md"
                      mediumClass="md:text-xl"
                      largeClass="lg:text-3xl"
                      wrapperClass="text-accent font-subheading text-xs text-accent"
                    />
                  }
                />
              </div>
            }
          />
        </section>

        <PostsSection />

        <section id="blog" className="min-h-screen w-full flex items-center justify-center">
          <BlogSquares />
        </section>

        <section id="works" className="min-h-screen w-screen flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0 md:justify-around">
          <Squares
            className="content-container flex w-[60vw] h-[30vh] md:w-[40vw] md:h-[40vh] lg:!w-[50vw] lg:!h-[50vh] !px-12 items-center justify-center"
            squareClass="h-20 w-20"
            content={
              <div className="flex items-center justify-around h-full flex-col">
                <h2 className="font-subheading">
                  <SplitText
                    text="Building ideas,"
                    wrapperClass="text-primary break-words"
                    smallClass="text-xl"
                    mediumClass="md:text-4xl"
                    largeClass="lg:text-7xl"
                  />
                  <SplitText
                    text="writing code."
                    wrapperClass="text-primary flex-wrap"
                    smallClass="text-xl"
                    mediumClass="md:text-4xl"
                    largeClass="lg:text-7xl"
                  />
                </h2>
                <Squares
                  className="!px-8 !py-4 w-[150px] h-[30px] md:h-[50px] lg:h-[75px] lg:w-[250px] flex items-center justify-center"
                  squareClass="h-2.5 w-2.5 md:h-4 md:w-4 lg:h-6 lg:w-6"
                  onClick={() => router.push("/works")}
                  content={
                    <SplitText
                      text="My Works"
                      smallClass="text-md"
                      mediumClass="md:text-xl"
                      largeClass="lg:text-3xl"
                      wrapperClass="text-accent font-subheading text-xs text-accent"
                    />
                  }
                />
              </div>
            }
          />
          <Squares
            className="content-container w-[30vh] h-[30vh] md:w-[40vw] md:h-[40vh] lg:!w-[50vh] lg:!h-[50vh] items-center justify-center"
            squareClass="h-20 w-20"
            content={
              <div className="h-[80%] w-[80%] overflow-hidden">
                <img 
                  src="/nomads.png" 
                  className="h-1/2 w-full object-fill"
                  style={{
                    "filter": "sepia(70%) hue-rotate(140deg)",
                  }}
                />
                <img 
                  src="/printhub.png" 
                  className="h-1/2 w-full object-fill"
                  style={{
                    "filter": "sepia(70%) hue-rotate(140deg)",
                  }}
                />
              </div>
            }
          />
        </section>

        <section id="bye" className="min-h-screen w-screen flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0 md:justify-around">
          <Squares
            className="content-container flex w-[60vw] h-[30vh] md:w-[40vw] md:h-[40vh] lg:!w-[50vw] lg:!h-[50vh] !px-12 items-center justify-center"
            squareClass="h-20 w-20"
            content={
              <div className="flex items-center justify-around h-full flex-col">
                <h2 className="font-subheading">
                  <SplitText
                    text="Did the page scroll"
                    wrapperClass="text-primary flex-wrap break-words"
                    smallClass="text-xl"
                    mediumClass="md:text-4xl"
                    largeClass="lg:text-7xl"
                  />
                  <SplitText
                    text="too fast for you?"
                    wrapperClass="text-primary flex-wrap"
                    smallClass="text-xl"
                    mediumClass="md:text-4xl"
                    largeClass="lg:text-7xl"
                  />
                </h2>
                <Squares
                  className="!px-8 !py-4 w-[150px] h-[30px] md:h-[50px] lg:h-[75px] lg:w-[250px] flex items-center justify-center"
                  squareClass="h-2.5 w-2.5 md:h-4 md:w-4 lg:h-6 lg:w-6"
                  onClick={(event) => {
                    event.preventDefault();
                    gsap.to(window, {
                      duration: 1,
                      scrollTo: { y: document.querySelector("html").offsetTop },
                      ease: "power4.inOut",
                    });
                  }}
                  content={
                    <SplitText
                      text="Top"
                      smallClass="text-md"
                      mediumClass="md:text-xl"
                      largeClass="lg:text-3xl"
                      wrapperClass="text-accent font-subheading text-xs text-accent"
                    />
                  }
                />
              </div>
            }
          />
          <div id="links" className="flex flex-col items-center justify-center gap-4 md:gap-12">
            {["Twitter/X", "LinkedIn", "Bluesky", "Github"].map((text, index) => (
              <Squares
                key={index}
                className={`square flex items-center h-[50px] w-[200px] md:h-[60px] md:w-[220px] lg:h-[70px] lg:w-[250px] justify-center`}
                squareClass={`h-3 w-3 md:h-6 md:w-6`}
                content={
                  <span className="text-accent font-subheading text-2xl md:text-4xl">{text}</span>
                }
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}