import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setIsComplete(true);
        },
      });

      // Animate the counter from 0 to 100
      tl.to(counterRef.current, {
        innerText: 100,
        duration: 1.8,
        snap: { innerText: 1 },
        ease: "power3.inOut",
        onUpdate: function () {
          if (counterRef.current) {
            counterRef.current.innerHTML = Math.round(Number(this.targets()[0].innerText)).toString();
          }
        },
      })
      // Slide up and fade out the text
      .to(textGroupRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
      }, "+=0.2")
      // Slide the entire preloader up to reveal the site
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });
    }, containerRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] bg-[#141414] text-[#F1EDE3] flex flex-col items-center justify-center"
    >
      <div ref={textGroupRef} className="flex flex-col items-center">
        <span className="text-[10px] font-display font-bold uppercase tracking-[0.4em] opacity-70 mb-4">
          Adil Mubarak
        </span>
        <div className="font-display text-7xl sm:text-9xl font-black tracking-tighter flex items-end">
          <span ref={counterRef}>0</span>
          <span className="text-3xl sm:text-5xl opacity-50 mb-2 sm:mb-4">%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
