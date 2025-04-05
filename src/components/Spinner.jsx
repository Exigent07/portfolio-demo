import { useEffect } from "react";
import LoadingIcon from "../../public/logo.svg";
import { gsap } from "gsap";

export default function Spinner() {
  useEffect(() => {
    gsap.to("#loading-ring", {
      rotation: 360,
      repeat: -1,
      duration: 1,
      ease: "power3.inOut",
    });

    gsap.to("#loading-icon", {
      rotation: 360,
      repeat: -1,
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <div className="loading-screen flex items-center justify-center h-screen w-screen fixed pointer-events-none top-0 left-0 bg-transparent text-primary">
      <div id="loading" className="flex items-center justify-center p-2">
        <div id="spinner-container" className="flex items-center justify-center relative">
          <div
            id="loading-ring"
            className="absolute flex items-center justify-center w-16 h-16 rounded-full border-2 border-t-4 border-primary"
          ></div>
            <LoadingIcon
              id="loading-icon"
              className="absolute fill-foreground w-8 h-8"
            />
        </div>
      </div>
    </div>
  );
}
