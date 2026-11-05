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
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline({ delay: 0.2 });

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30, letterSpacing: "0.3em" },
        { opacity: 1, y: 0, letterSpacing: "0.12em", duration: 1.2, ease: "power3.out" }
      );
    }

    if (taglineRef.current) {
      tl.fromTo(
        Array.from(taglineRef.current.children),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" },
        "-=0.5"
      );
    }

    if (scrollHintRef.current) {
      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );
    }

    // On mobile skip ScrollTrigger scrub
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return () => tl.kill();
    }

    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
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
      tl.kill();
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-[#080B09]"
    >
      {/* Full Background Image */}
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
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B09] via-black/40 to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080B09]/30 via-transparent to-[#080B09]/30 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div
        ref={heroScrollWrapperRef}
        className="relative z-10 text-center px-5 sm:px-6 w-full max-w-6xl mx-auto flex flex-col items-center select-none"
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-8 h-[1px] bg-[#F1EDE3]/30" />
          <span className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-[0.35em] text-[#D8D1C2]/70">
            Dubai · Calicut · Worldwide
          </span>
          <span className="w-8 h-[1px] bg-[#F1EDE3]/30" />
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-serif text-[clamp(2.8rem,8vw,7rem)] text-[#F1EDE3] font-normal uppercase tracking-[0.12em] leading-none drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)]"
          style={{ opacity: 0 }}
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
              className="flex items-center gap-x-3 sm:gap-x-5"
              style={{ opacity: 0 }}
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

        {/* CTA */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4" style={{ opacity: 0 }} ref={(el) => {
          if (el) {
            gsap.fromTo(el, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 1.4 });
          }
        }}>
          <button
            onClick={onExploreClick}
            className="group flex items-center gap-2.5 text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#F1EDE3] border border-[#F1EDE3]/30 hover:border-[#F1EDE3] hover:bg-[#F1EDE3]/10 px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            View Portfolio
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 transition-transform duration-300">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollHintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" style={{ opacity: 0 }}>
        <button
          className="text-[#F1EDE3] opacity-50 flex flex-col items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity focus:outline-none"
          onClick={onExploreClick}
          aria-label="Scroll to explore"
        >
          <span className="text-[9px] font-sans font-bold uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-[#F1EDE3]/50 to-transparent animate-luxury-float" />
        </button>
      </div>
    </section>
  );
}
