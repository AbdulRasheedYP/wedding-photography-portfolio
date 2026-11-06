import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== "undefined") {
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

const LenisContext = React.createContext<Lenis | null>(null);

export function useLenis() {
  return React.useContext(LenisContext);
}

interface Props {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<Props> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Leave mobile touch and small screens to 120Hz native GPU compositor acceleration
    const isMobileOrTouch =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window);

    if (isMobileOrTouch) {
      return;
    }

    let lenis: Lenis | null = null;
    let tickerUpdate: ((time: number) => void) | null = null;

    // Defer initialization to after initial paint
    const timer = setTimeout(() => {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      });

      setLenisInstance(lenis);
      if (typeof window !== "undefined") {
        (window as any).__lenis = lenis;
      }
      lenis.on("scroll", ScrollTrigger.update);

      tickerUpdate = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(tickerUpdate);
      gsap.ticker.lagSmoothing(500, 33);
    }, 150);

    return () => {
      clearTimeout(timer);
      if (typeof window !== "undefined") {
        (window as any).__lenis = null;
      }
      if (tickerUpdate) gsap.ticker.remove(tickerUpdate);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
};
