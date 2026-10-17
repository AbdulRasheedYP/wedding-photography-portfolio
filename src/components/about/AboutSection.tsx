import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Parallax scrub is only for desktop viewports
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        if (parallaxImgRef.current) {
          gsap.to(parallaxImgRef.current, {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }, sectionRef);
    }, 120);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 sm:py-20 lg:py-20 px-5 sm:px-8 bg-[#080B09] scroll-mt-20 relative overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#F1EDE3]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Top Eyebrow & Headline */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
            <span className="w-8 h-[1px] bg-[#67685D]" />
            <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8D8B82]">
              About The Studio
            </p>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.75rem] text-[#F1EDE3] font-normal leading-[1.08] tracking-tight">
            We preserve feelings, <br className="hidden sm:block" />
            <span className="text-[#D8D1C2] italic">not just footage.</span>
          </h2>
        </div>

        {/* 2-Column Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Manifesto & Studio Story */}
          <div className="lg:col-span-6 space-y-8">
            <p className="font-serif text-xl sm:text-2xl text-[#D8D1C2] font-normal leading-relaxed italic border-l-2 border-[#67685D] pl-6 py-1">
              "The most poignant moments are never scripted. They live in a shared breath, an unposed smile, and the quiet spaces between."
            </p>

            <p className="text-[#8D8B82] text-sm sm:text-[15px] leading-relaxed font-sans">
              Founded in Calicut and traveling pan-India, <strong className="text-[#F1EDE3] font-medium">FrameStory Studios</strong> is a boutique visual collective specializing in intimate wedding cinema, brand commercials, and fine-art films. We merge documentary authenticity with high-end anamorphic optics to produce films that endure for generations.
            </p>

            {/* Founder Sign-off */}
            <div className="pt-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#F1EDE3]/15 overflow-hidden bg-[#080B09] flex-shrink-0">
                <img
                  src="/images/about/founder.jpg"
                  alt="Adil Rasheed, Creative Director of FrameStory Studios"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <p className="font-serif text-lg text-[#F1EDE3] font-semibold leading-tight tracking-wide">
                  Adil Mubarak 
                </p>
                <p className="text-[11px] font-sans text-[#A8A499] uppercase tracking-widest mt-0.5">
                  Founder &amp; Creative Director
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Visuals */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* Primary Main Image (BTS Rig) */}
            <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-3xl overflow-hidden border border-[#F1EDE3]/10 shadow-2xl bg-[#080B09]">
              <img
                ref={parallaxImgRef}
                src="/images/about/camera_rig.jpg"
                alt="Cinema Production Rig"
                className="w-full h-[115%] object-cover -translate-y-[7%] filter brightness-95 contrast-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Secondary Floating Inset Image (Color Grading) */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 w-44 aspect-square rounded-2xl overflow-hidden border border-[#F1EDE3]/20 shadow-2xl bg-[#111412] transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="/images/about/color_grading.jpg"
                alt="Cinema Color Grade"
                className="w-full h-full object-cover filter contrast-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-2.5 left-2.5">
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#F1EDE3] bg-[#080B09]/90 px-2 py-1 rounded">
                  ACES Grade
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
