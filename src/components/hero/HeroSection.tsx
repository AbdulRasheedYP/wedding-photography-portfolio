import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  onExploreClick: () => void;
  onBookClick?: () => void;
}

export default function HeroSection({ onExploreClick }: Props) {
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const heroScrollWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // On mobile devices, skip ScrollTrigger scrub to eliminate layout calculations and keep TBT at 0ms
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    let ctx: gsap.Context;
    // Defer ScrollTrigger initialization on desktop
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // 1. Smooth Scroll Animation
        if (heroScrollWrapperRef.current) {
          gsap.to(heroScrollWrapperRef.current, {
            opacity: 0,
            y: 25,
            ease: "none",
            scrollTrigger: {
              trigger: "#hero",
              start: "top top",
              end: "45% top",
              scrub: 0.5,
            },
          });
        }

        // 2. Scroll hint indicator fades on scroll
        if (scrollHintRef.current) {
          gsap.to(scrollHintRef.current, {
            opacity: 0,
            y: -15,
            scrollTrigger: {
              trigger: "#hero",
              start: "80px top",
              end: "200px top",
              scrub: true,
            },
          });
        }
      });
    }, 120);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] min-h-[550px] sm:min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-[#080B09]"
    >
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/hero_bg.webp"
          alt="Sunset Serenity in Lace - Luxury Wedding Photography by Adil Mubarak"
          width="1920"
          height="1080"
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
          // @ts-ignore
          fetchPriority="high"
        />
        {/* Subtle dark gradient overlay for optimal typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B09] via-black/25 to-black/40 pointer-events-none" />
      </div>

      {/* Centered Hero Content with Scroll Scrub & Entrance Animations */}
      <div
        ref={heroScrollWrapperRef}
        className="relative z-10 text-center px-4 sm:px-6 w-full max-w-7xl mx-auto flex flex-col items-center select-none"
      >
        <h1
          ref={titleRef}
          className="font-serif text-[clamp(1.2rem,4vw,3.25rem)] text-[#F1EDE3] font-normal uppercase tracking-[0.1em] sm:tracking-[0.18em] leading-tight sm:leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] max-w-4xl sm:whitespace-nowrap"
        >
          Wedding Photography &amp; Films
        </h1>

        <p
          ref={subtitleRef}
          className="mt-3.5 sm:mt-5 text-[10px] sm:text-xs md:text-sm font-display font-medium uppercase tracking-[0.15em] sm:tracking-[0.32em] text-[#D8D1C2] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-xl text-center leading-relaxed sm:leading-none sm:whitespace-nowrap"
        >
          Modern wedding stories for the discerning couple
        </p>
      </div>

      {/* Scroll indicator - GPU compositor accelerated float */}
      <div ref={scrollHintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          className="text-[#F1EDE3] opacity-60 flex flex-col items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity focus:outline-none animate-luxury-float"
          onClick={onExploreClick}
          aria-label="Explore Selected Portfolio"
        >
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest">Explore</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
