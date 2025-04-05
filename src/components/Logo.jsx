"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "@/utils/SplitText";
import LogoIcon from "../../public/logo.svg";

export default function Logo({
  text = "Exigent",
  hoverAnimation = { rotate: "180deg", duration: 1, ease: "power2.out" },
  smallTextClass = "text-xs",
  mediumTextClass = "md:text-lg",
  largeTextClass = "lg:text-4xl",
  smallIconClass = "h-4 w-4",
  mediumIconClass = "md:h-8 md:w-8",
  largeIconClass = "lg:h-12 lg:w-12",
  letterSpacing = "0.5px",
  style = {},
  className = "",
  iconSizeClass = "h-6 w-6",
}) {
  const iconRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(iconRef.current, {
      rotate: hoverAnimation.rotate,
      duration: hoverAnimation.duration,
      ease: hoverAnimation.ease,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(iconRef.current, {
      rotate: "0deg",
      duration: hoverAnimation.duration,
      ease: hoverAnimation.ease,
    });
  };

  return (
    <div
      id="logo"
      className={`flex items-center justify-center cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        letterSpacing,
        ...style,
      }}
    >
      <SplitText
        text={text.charAt(0) || "E"}
        smallClass={smallTextClass}
        mediumClass={mediumTextClass}
        largeClass={largeTextClass}
        wrapperClass="flex items-center"
      />

      <div
        className={`flex items-center justify-center mx-2 mt-2 ${iconSizeClass} ${smallIconClass} ${mediumIconClass} ${largeIconClass}`}
        ref={iconRef}
      >
        <LogoIcon id="logoIcon" className="fill-foreground" />
      </div>

      <SplitText
        text={text.slice(1) || "igent"}
        smallClass={smallTextClass}
        mediumClass={mediumTextClass}
        largeClass={largeTextClass}
        wrapperClass="flex items-center"
      />
    </div>
  );
}
