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
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
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
                trigger: sectionRef.current,
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
      className="py-14 sm:py-20 lg:py-24 px-4 sm:px-8 bg-black scroll-mt-20 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div ref={headerRef} className="mb-8 sm:mb-12 text-center">
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

        {/* Modern Luxury 3D Spotlight Coverflow Carousel */}
        <div ref={gridRef} data-lenis-prevent="true" className="mb-12 sm:mb-16 overscroll-contain">
          <SpotlightCoverflowCarousel />
        </div>

        {/* Technical Skills & Software Arsenal — Elevated Ash Plaque */}
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
