import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpotlightCoverflowCarousel from "./SpotlightCoverflowCarousel";

gsap.registerPlugin(ScrollTrigger);

// EXACT 9 SKILLS VERBATIM FROM ADIL MUBARAK'S CV
const EXACT_CV_SKILLS = [
  "Videography & Cinematography",
  "Photography",
  "Reel Editing & Short-Form Content Creation",
  "DaVinci Resolve (Advanced)",
  "CapCut",
  "Color Correction & Color Grading",
  "Social Media Content Optimization",
  "Meta Ads & Digital Marketing",
  "WordPress Website Management",
];

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobileDevice =
      window.innerWidth < 768 ||
      "ontouchstart" in window ||
      window.matchMedia("(pointer: coarse)").matches;

    // On mobile devices, ensure elements are immediately 100% visible with zero black screen / opacity lag
    if (isMobileDevice) {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
      if (gridRef.current) gsap.set(gridRef.current, { opacity: 1, y: 0 });
      if (skillsRef.current) gsap.set(skillsRef.current, { opacity: 1, y: 0 });
      return;
    }

    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Desktop only: auto-center carousel stage using Lenis smooth scroll
        if (stageRef.current && typeof (window as any).__lenis?.scrollTo === "function") {
          ScrollTrigger.create({
            trigger: stageRef.current,
            start: "top 65%",
            end: "bottom 35%",
            once: true,
            onEnter: () => {
              (window as any).__lenis?.scrollTo(stageRef.current, {
                offset: 0,
                duration: 0.7,
              });
            },
          });
        }

        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: stageRef.current,
                start: "top 78%",
                once: true,
              },
            }
          );
        }

        if (gridRef.current) {
          gsap.fromTo(
            gridRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 82%",
                once: true,
              },
            }
          );
        }

        if (skillsRef.current) {
          gsap.fromTo(
            skillsRef.current,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: skillsRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      }, sectionRef);
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-black scroll-mt-0 relative overflow-hidden w-full"
    >
      {/* 1. Full-Screen Centered Spotlight Carousel Stage */}
      <div
        ref={stageRef}
        className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-8 sm:py-12 relative z-10 max-w-6xl mx-auto w-full"
      >
        {/* Section Header */}
        <div ref={headerRef} className="mb-6 sm:mb-8 text-center flex-shrink-0">
          <div className="inline-flex items-center gap-2.5 mb-2.5">
            <span className="w-6 h-[1px] bg-[#67685D]" />
            <p className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#D8D1C2]">
              — OUR SERVICES —
            </p>
            <span className="w-6 h-[1px] bg-[#67685D]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F1EDE3] font-normal tracking-tight leading-[1.1]">
            Services &amp; Expertise
          </h2>
        </div>

        {/* Modern Luxury 3D Spotlight Coverflow Carousel - Centered in Screen */}
        <div ref={gridRef} className="w-full flex-shrink-0">
          <SpotlightCoverflowCarousel />
        </div>
      </div>

      {/* 2. Technical Skills & Software Arsenal — Elevated Ash Plaque */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-4 pb-20 sm:pb-28 relative z-10">
        <div
          ref={skillsRef}
          className="rounded-2xl p-4 sm:p-6 bg-[#141414] border border-white/[0.08] shadow-lg"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
            <h3 className="font-serif text-lg sm:text-xl text-[#F1EDE3] font-normal tracking-tight">
              Technical Skills &amp; Software Arsenal
            </h3>
          </div>

          {/* Exact 9 CV Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
            {EXACT_CV_SKILLS.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-black border border-white/[0.06] hover:border-white/20 transition-all duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]/80 flex-shrink-0" />
                <span className="text-xs sm:text-[12.5px] font-sans font-medium text-[#E5E0D5]">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
