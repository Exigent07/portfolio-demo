"use client";

import { useState } from "react";
import Logo from "./Logo";
import Menu from "./Menu";

export default function Nav({
  className = "",
  style = {},
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav 
      className={`fixed top-0 px-8 md:px-10 lg:px-14 flex z-50 left-0 w-screen h-24 md:h-28 lg:h-32 bg-transparent justify-between items-center ${className}`}
      style={{
        ...style,
      }}
    >
      <Logo
        text="Eigent"
        hoverAnimation={{
          rotate: "180deg",
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
        }}
        className="relative z-[60]"
        smallTextClass="text-3xl"
        mediumTextClass="md:text-4xl"
        largeTextClass="lg:text-5xl"
        mediumIconClass="md:h-6 md:!mt-1 md:w-6"
        largeIconClass="lg:h-8 lg:w-8"
        iconSizeClass="h-5 !mt-1 w-5"
      />

      <Menu 
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
      />
    </nav>
  );
}