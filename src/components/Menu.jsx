import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import Squares from './Squares';
import SplitText from '@/utils/SplitText';
import LogoIcon from "../../public/logo.svg";
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const menuItems = [
  { en: 'Home', ja: '家屋' },
  { en: 'About', ja: 'について' },
  { en: 'Works', ja: '作品' },
  { en: 'Blog', ja: 'ブログ' }
];

const Menu = ({ isOpen, setIsOpen }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const textRefs = useRef(menuItems.map(() => React.createRef()));
  const animating = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut'
      });

      gsap.fromTo(menuRef.current,
        {
          y: '-100%',
          opacity: 0
        },
        {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }
      );

      gsap.fromTo('.menu-item',
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.3
        }
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      });

      gsap.to(menuRef.current, {
        y: '-100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in'
      });
    }
  }, [isOpen, isMounted]);

  const animateTextTransition = (index, isEntering) => {
    const textElement = textRefs.current[index].current;
    if (!textElement) return;

    const newText = isEntering ? menuItems[index].ja : menuItems[index].en;

    const timeline = gsap.timeline({
      onComplete: () => {
        animating.current = false;
      }
    });

    timeline.set(textElement, { text: newText, opacity: 0 })
      .to(textElement, { opacity: 1, duration: 1, ease: "power2.out" });
  };

  const handleHover = (itemId) => {
    const index = parseInt(itemId.split('-')[1]);
    if (hoveredItem !== itemId) {
      setHoveredItem(itemId);
      animateTextTransition(index, true);
    }
  };

  const handleLeave = () => {
    if (hoveredItem) {
      const index = parseInt(hoveredItem.split('-')[1]);
      animateTextTransition(index, false);
      setHoveredItem(null);
    }
  };

  return (
    <>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        <SplitText
          text="メニュー"
          smallClass="text-xl"
          mediumClass="md:text-2xl"
          largeClass="lg:text-3xl"
        />
      </div>

      <div
        ref={overlayRef}
        className="fixed inset-0 bg-background opacity-0"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      />

      <div
        ref={menuRef}
        className="fixed inset-0 flex flex-col md:flex-row items-center justify-evenly md:justify-around translate-y-[-100%] gap-0 z-50"
        style={{ 
          pointerEvents: isOpen ? 'auto' : 'none',
          perspective: '1000px'
        }}
      >
        <div className="flex flex-col items-center gap-0">
          {menuItems.map((item, index) => (
            <Squares
              key={index}
              id={`menu-${index}`}
              className="menu-item w-[300px] h-[75px] md:w-[350px] md:h-[120px] lg:w-[450px] lg:h-[150px] flex items-center justify-center"
              squareClass="h-8 w-8 md:h-12 md:w-12"
              isActive={hoveredItem === `menu-${index}`}
              onClick={ () => router.push(`/${item.en.toLowerCase() === "home" ? "" : item.en.toLowerCase()}`) }
              onHover={handleHover}
              onLeave={handleLeave}
              content={
                <div 
                  ref={textRefs.current[index]}
                  style={{ perspective: '1000px' }}
                  className="text-3xl md:text-4xl lg:text-7xl font-subheading"
                >
                  {item.en}
                </div>
              }
            />
          ))}
        </div>
        <button
          className="text-accent"
          onClick={() => setIsOpen(false)}
        >
          <LogoIcon id="logoIcon" className="fill-foreground h-28 md:h-44 lg:h-56" />
          <SplitText
            text="閉じる"
            smallClass="text-xl"
            mediumClass="md:text-2xl"
            largeClass="lg:text-3xl"
          />
        </button>
        <Squares
          className="!px-4 !fixed bottom-10 hidden md:flex"
          squareClass="h-2 w-2"
          content={
            <p className="text-accent animate-pulse cursor-wait font-subheading text-xs hidden md:flex">
              Menu
            </p>
          }
        />
      </div>
    </>
  );
};

export default Menu;
