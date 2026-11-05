import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  onExploreClick: () => void;
  onBookClick?: () => void;
}

export default function HeroSection({ onExploreClick }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const heroScrollWrapperRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth, unified cinematic entrance timeline
      const tl = gsap.timeline({ delay: 0.15 });

      // 1. Eyebrow
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }

      // 2. Main Title (Clean, buttery-smooth transform without letter-spacing reflow)
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            force3D: true,
          },
          "-=0.5"
        );
      }

      // 3. Staggered Tagline Words
      if (taglineRef.current) {
        const items = taglineRef.current.querySelectorAll(".tagline-item");
        tl.fromTo(
          items,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }

      // 4. CTA Button
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );
      }

      // 5. Scroll Indicator
      if (scrollHintRef.current) {
        tl.fromTo(
          scrollHintRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );
      }

      // Scroll scrubbing effect for desktop
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        if (heroScrollWrapperRef.current) {
          gsap.to(heroScrollWrapperRef.current, {
            opacity: 0,
            y: 25,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "45% top",
              scrub: 0.5,
            },
          });
        }

        if (scrollHintRef.current) {
          gsap.to(scrollHintRef.current, {
            opacity: 0,
            y: -15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "80px top",
              end: "200px top",
              scrub: true,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-[100dvh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-[#141414]"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/hero_bg.webp"
          alt="Adil Mubarak — Videographer & Photographer"
          width="1920"
          height="1080"
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
          // @ts-ignore
          fetchPriority="high"
        />
        {/* Cinematic Multi-Layer Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/40 to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/30 via-transparent to-[#141414]/30 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div
        ref={heroScrollWrapperRef}
        className="relative z-10 text-center px-5 sm:px-6 w-full max-w-6xl mx-auto flex flex-col items-center select-none"
      >
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-6 sm:mb-8 opacity-0">
          <span className="w-8 h-[1px] bg-[#F1EDE3]/30" />
          <span className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.35em] text-[#D8D1C2]/80">
            Dubai · Calicut · Worldwide
          </span>
          <span className="w-8 h-[1px] bg-[#F1EDE3]/30" />
        </div>

        {/* Main Title — Clean, constant tracking, no jitter */}
        <h1
          ref={titleRef}
          className="font-serif text-[clamp(2.8rem,8.5vw,7.2rem)] text-[#F1EDE3] font-normal uppercase tracking-[0.14em] leading-none drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)] opacity-0"
        >
          Adil Mubarak
        </h1>

        {/* Animated Tagline */}
        <div
          ref={taglineRef}
          className="mt-5 sm:mt-7 flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-5 gap-y-2"
        >
          {["Videographer", "Photographer", "Reel Editor"].map((word, i) => (
            <span
              key={word}
              className="tagline-item flex items-center gap-x-3 sm:gap-x-5 opacity-0"
            >
              <span className="text-[11px] sm:text-sm font-sans font-medium uppercase tracking-[0.25em] sm:tracking-[0.32em] text-[#D8D1C2] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                {word}
              </span>
              {i < 2 && (
                <span className="w-1 h-1 rounded-full bg-[#67685D]" />
              )}
            </span>
          ))}
        </div>

        {/* Call to Action Button */}
        <div ref={ctaRef} className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-center gap-4 opacity-0">
          <button
            onClick={onExploreClick}
            className="group flex items-center gap-2.5 text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#F1EDE3] border border-[#F1EDE3]/30 hover:border-[#F1EDE3] hover:bg-[#F1EDE3]/10 px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm shadow-md"
          >
            View Portfolio
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:translate-x-0.5 transition-transform duration-300"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollHintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0">
        <button
          className="text-[#F1EDE3] opacity-60 flex flex-col items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity focus:outline-none"
          onClick={onExploreClick}
          aria-label="Scroll to explore"
        >
          <span className="text-[9px] font-sans font-bold uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-[#F1EDE3]/60 to-transparent animate-luxury-float" />
        </button>
      </div>
    </section>
  );
}
