import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "100+", label: "Visual Projects", detail: "Campaigns & Events" },
  { value: "03", label: "Fashion Shows", detail: "Runway & Bridal Launches" },
  { value: "02", label: "Global Bases", detail: "Dubai, UAE & Kerala" },
  { value: "04", label: "Languages", detail: "English, Malayalam, Hindi, Tamil" },
];

const SKILLS = [
  "Videography & Cinema",
  "Fashion & Bridal",
  "Reel Editing & Pacing",
  "DaVinci Resolve",
  "Color Grading",
  "Corporate Galas",
  "Social Media Strategy",
];

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        if (imageRef.current) {
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                once: true,
              },
            }
          );
        }

        if (contentRef.current) {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: 30 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                once: true,
              },
            }
          );
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
      className="py-16 sm:py-24 lg:py-28 px-5 sm:px-8 bg-[#080B09] scroll-mt-20 relative overflow-hidden text-[#F1EDE3]"
    >
      {/* Soft Ambient Cinematic Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#F1EDE3]/[0.025] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-[#8D8B82]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10 sm:mb-14">
          <span className="w-8 h-[1px] bg-[#67685D]" />
          <h2 className="text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8D8B82]">
            About
          </h2>
        </div>

        {/* 2-Column Creative Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* LEFT: RICH PHOTOGRAPHY SHOWCASE (Span 5) */}
          <div ref={imageRef} className="lg:col-span-5">
            {/* Primary Large Editorial Image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#111412] border border-[#F1EDE3]/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group">
              <img
                src="/images/about/camera_rig.webp"
                alt="Behind the Lens — Adil Mubarak"
                className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            </div>
          </div>

          {/* RIGHT: STORY, SKILLS, STATS & CV (Span 7) */}
          <div ref={contentRef} className="lg:col-span-7 space-y-7">
            
            {/* Main Headline */}
            <div>
              <h3 className="font-serif text-3xl sm:text-5xl text-[#F1EDE3] font-normal leading-[1.12] tracking-tight">
                Every frame is <span className="italic text-[#C8BFB0]">a deliberate act.</span>
              </h3>
              <p className="font-serif text-base sm:text-lg text-[#D8D1C2] font-normal italic border-l-2 border-[#67685D] pl-4 py-1 mt-4">
                "Light, motion, truth — captured in a single breath."
              </p>
            </div>

            {/* Narrative Bio */}
            <div className="space-y-4 text-xs sm:text-[14.5px] text-[#A8A499] font-sans leading-[1.85]">
              <p>
                I'm <strong className="text-[#F1EDE3] font-medium">Adil Mubarak MK</strong> — a creative Videographer, Photographer, and Reel Editor operating between <strong className="text-[#F1EDE3] font-medium">Dubai, UAE</strong> and <strong className="text-[#F1EDE3] font-medium">Calicut, Kerala</strong>.
              </p>
              <p>
                With over <strong className="text-[#F1EDE3] font-medium">100+ visual projects</strong> across luxury bridal campaigns, high-fashion runway shows, and corporate events — I merge cinematic storytelling with rhythmic reel pacing.
              </p>
              <p>
                Every project is graded and finished on <strong className="text-[#F1EDE3] font-medium">DaVinci Resolve</strong>. From custom color grading to sound design, every visual is crafted with intention to evoke emotion and capture the true spirit of the moment.
              </p>
            </div>

            {/* Creative Skill Chips */}
            <div>
              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8D8B82] mb-3">
                Disciplines &amp; Craft
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-sans font-medium text-[#D8D1C2] bg-[#121614] border border-[#F1EDE3]/10 px-3.5 py-1.5 rounded-full hover:border-[#F1EDE3]/30 hover:text-[#F1EDE3] transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 4 Stats Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-4 bg-[#111412] border border-[#F1EDE3]/10 hover:border-[#F1EDE3]/25 transition-all duration-300"
                >
                  <p className="font-serif text-2xl sm:text-3xl text-[#F1EDE3] font-normal tracking-tight">
                    {stat.value}
                  </p>
                  <p className="font-sans text-[11px] font-semibold text-[#D8D1C2] mt-1 leading-tight">
                    {stat.label}
                  </p>
                  <p className="font-sans text-[9px] text-[#67685D] mt-0.5">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Bar with Round DP Avatar and Download CV */}
            <div className="pt-4 border-t border-[#F1EDE3]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {/* Round Profile DP Avatar */}
                <div className="w-12 h-12 rounded-full border border-white/20 p-0.5 bg-[#171B19] shadow-md flex-shrink-0 overflow-hidden">
                  <img
                    src="/images/about/founder.webp"
                    alt="Adil Mubarak"
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="font-serif text-base text-[#F1EDE3] font-semibold leading-tight">
                    Adil Mubarak MK
                  </p>
                  <p className="text-[11px] font-sans text-[#8D8B82] mt-0.5">
                    adilmubarack03@gmail.com · +971 56 870 9412
                  </p>
                </div>
              </div>

              <a
                href="/documents/Adil_Mubarak_Resume.pdf"
                download="Adil_Mubarak_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full bg-[#F1EDE3] text-[#080B09] font-sans font-bold text-xs uppercase tracking-wider hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg"
              >
                <svg
                  className="w-3.5 h-3.5 stroke-current fill-none stroke-[2.2] transition-transform duration-300 group-hover:translate-y-0.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download CV</span>
                <span className="text-[9px] font-sans text-[#080B09]/60 border-l border-[#080B09]/20 pl-2">
                  PDF
                </span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
