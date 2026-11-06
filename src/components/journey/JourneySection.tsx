import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  number: string;
  year: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
  desktopNode: { x: number; y: number };
}

const MILESTONES: Milestone[] = [
  {
    number: "01",
    year: "2021 – 2023",
    role: "Visual Storyteller & Foundations",
    company: "Independent Filmmaking",
    location: "Calicut, Kerala",
    description:
      "Began hands-on visual storytelling, mastering professional camera operation, lighting, composition, and framing across early short films, bridal portraits, and event coverage.",
    tags: ["Camera Operation", "Visual Storytelling", "Calicut"],
    desktopNode: { x: 460, y: 170 },
  },
  {
    number: "02",
    year: "2023 – 2024",
    role: "Digital Strategy & Media Creation",
    company: "Quadcubes · CDA Academy",
    location: "Kerala",
    description:
      "Executed Meta & Google Ads campaigns and social media strategy, bridging cinematic storytelling with digital content distribution, audience engagement, and performance marketing.",
    tags: ["Meta Ads", "Campaign Strategy", "Social Media"],
    desktopNode: { x: 740, y: 420 },
  },
  {
    number: "03",
    year: "2024 – 2025",
    role: "Bridal & Runway Cinematographer",
    company: "Shobhika Weddings",
    location: "Calicut, Kerala",
    description:
      "Produced promotional and fashion video content for a premier bridal brand. Filmed and edited 3 full runway fashion shows, directed DaVinci Resolve color grading, and produced seasonal campaign reels.",
    tags: ["3 Fashion Shows", "Bridal Cinema", "DaVinci Resolve"],
    desktopNode: { x: 460, y: 680 },
  },
  {
    number: "04",
    year: "2025 – 2026",
    role: "International Cinema & Events",
    company: "Jovial Events",
    location: "Dubai, UAE",
    description:
      "Stepped onto the global stage in Dubai — capturing videography and photography across high-profile corporate galas, fashion launches, cultural celebrations, and delivering fast-turnaround reels.",
    tags: ["Dubai Events", "Corporate Galas", "Viral Reels"],
    desktopNode: { x: 740, y: 930 },
  },
];

const JourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".journey-fade-in",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="py-20 sm:py-28 lg:py-32 bg-black scroll-mt-20 relative overflow-hidden text-[#F1EDE3]"
    >
      {/* 1. Cinematic Muted Mountain Landscape Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src="/images/journey/journey_bg.webp"
          alt="Cinematic Atmospheric Landscape"
          width="1920"
          height="1080"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.05] saturate-[0.4]"
          loading="lazy"
          decoding="async"
        />

        {/* Multi-Layer Seamless Vignettes into Pure Black Canvas */}
        <div className="absolute top-0 inset-x-0 h-44 sm:h-56 bg-gradient-to-b from-black via-black/85 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-48 sm:h-64 bg-gradient-to-t from-black via-black/90 to-transparent" />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/85" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">

        {/* 2. Editorial Header */}
        <div className="text-center mb-14 sm:mb-20 journey-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-[#67685D]" />
            <p className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.3em] text-[#D8D1C2]">
              — My Journey —
            </p>
            <span className="w-6 h-[1px] bg-[#67685D]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.75rem] text-[#F1EDE3] font-normal leading-[1.08] tracking-tight">
            The Road <span className="italic text-[#E8DCC8]">So Far.</span>
          </h2>
          <p className="text-[#8D8B82] text-xs sm:text-sm font-sans mt-3 max-w-md mx-auto">
            Key milestones in visual storytelling, brand campaigns, and creative growth.
          </p>
        </div>

        {/* 3. DESKTOP ROADMAP VIEW (Hidden on Mobile/Tablet < 1024px) */}
        {/* Tall vertical layout with gentle curves and standard luxury palette */}
        <div className="hidden lg:block relative w-full max-w-[1200px] mx-auto h-[1080px] journey-fade-in">

          {/* SVG Winding Road Path with Champagne Glow & Markings */}
          <svg
            viewBox="0 0 1200 1080"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Soft Ambient Road Glow Filter */}
              <filter id="roadGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Node Core Glow Filter */}
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Standard Luxury Champagne Silver & Warm Platinum Gradient */}
              <linearGradient id="roadRailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7E7B72" stopOpacity="0.35" />
                <stop offset="25%" stopColor="#DDD6C8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="75%" stopColor="#DDD6C8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7E7B72" stopOpacity="0.35" />
              </linearGradient>
            </defs>

            {/* Ambient Underglow (Subtle warm platinum, zero harsh yellow) */}
            <path
              d="M 600,-20 C 600,60 470,90 460,170 C 450,270 750,310 740,420 C 730,530 450,570 460,680 C 470,790 750,820 740,930 C 730,1000 600,1030 600,1100"
              stroke="rgba(241, 237, 227, 0.12)"
              strokeWidth="42"
              strokeLinecap="round"
              filter="url(#roadGlow)"
            />

            {/* Outer Illuminated Rails */}
            <path
              d="M 600,-20 C 600,60 470,90 460,170 C 450,270 750,310 740,420 C 730,530 450,570 460,680 C 470,790 750,820 740,930 C 730,1000 600,1030 600,1100"
              stroke="url(#roadRailGrad)"
              strokeWidth="28"
              strokeLinecap="round"
            />

            {/* Dark Asphalt Road Surface */}
            <path
              d="M 600,-20 C 600,60 470,90 460,170 C 450,270 750,310 740,420 C 730,530 450,570 460,680 C 470,790 750,820 740,930 C 730,1000 600,1030 600,1100"
              stroke="#0B0C0E"
              strokeWidth="22"
              strokeLinecap="round"
            />

            {/* Animated Dashed Center Highway Marking */}
            <path
              d="M 600,-20 C 600,60 470,90 460,170 C 450,270 750,310 740,420 C 730,530 450,570 460,680 C 470,790 750,820 740,930 C 730,1000 600,1030 600,1100"
              stroke="#F1EDE3"
              strokeWidth="2"
              strokeDasharray="8 12"
              strokeLinecap="round"
              className="animate-road-dash opacity-75"
            />

            {/* Clean Horizontal Connector Lines to Milestone Cards */}
            <line x1="440" y1="170" x2="385" y2="170" stroke="rgba(241, 237, 227, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="760" y1="420" x2="815" y2="420" stroke="rgba(241, 237, 227, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="440" y1="680" x2="385" y2="680" stroke="rgba(241, 237, 227, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="760" y1="930" x2="815" y2="930" stroke="rgba(241, 237, 227, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* 4 Luminous Road Nodes (Champagne Silver & Warm White) */}
            {MILESTONES.map((m, idx) => {
              const isHovered = activeNode === idx;
              return (
                <g key={m.number} className="transition-all duration-300">
                  {/* Outer Pulsing Halo */}
                  <circle
                    cx={m.desktopNode.x}
                    cy={m.desktopNode.y}
                    r={isHovered ? 18 : 13}
                    fill="none"
                    stroke="rgba(241, 237, 227, 0.4)"
                    strokeWidth="1.5"
                    className="animate-node-pulse"
                  />
                  {/* Middle Glow */}
                  <circle
                    cx={m.desktopNode.x}
                    cy={m.desktopNode.y}
                    r={isHovered ? 11 : 8}
                    fill="rgba(241, 237, 227, 0.22)"
                    filter="url(#nodeGlow)"
                  />
                  {/* Crisp Center Dot */}
                  <circle
                    cx={m.desktopNode.x}
                    cy={m.desktopNode.y}
                    r={isHovered ? 6.5 : 5}
                    fill="#FFFDF7"
                    stroke="#C4BAA9"
                    strokeWidth="2.5"
                  />
                </g>
              );
            })}
          </svg>

          {/* 4 Cards Alternating Elegantly on Left & Right */}

          {/* CARD 01: Top Left */}
          <div
            onMouseEnter={() => setActiveNode(0)}
            onMouseLeave={() => setActiveNode(null)}
            className="absolute z-20 top-[65px] left-0 xl:left-[20px] w-[360px] xl:w-[390px] flex items-start gap-3.5 group cursor-pointer"
          >
            <span className="font-serif italic text-4xl xl:text-5xl text-[#E8DCC8]/60 group-hover:text-[#FFF8EE] group-hover:scale-105 transition-all flex-shrink-0 pt-0.5 select-none drop-shadow-md">
              01
            </span>
            <div className="w-full bg-[#121212]/85 hover:bg-[#181818]/95 backdrop-blur-md border border-white/10 hover:border-white/25 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[#D8D1C2]">
                  {MILESTONES[0].year}
                </span>
              </div>
              <h3 className="font-serif text-lg text-[#F1EDE3] font-normal leading-snug mb-0.5">
                {MILESTONES[0].role}
              </h3>
              <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#A8A499] mb-2.5">
                {MILESTONES[0].company} · {MILESTONES[0].location}
              </p>
              <p className="text-[#8D8B82] text-xs leading-relaxed font-sans">
                {MILESTONES[0].description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-white/[0.06]">
                {MILESTONES[0].tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-sans uppercase tracking-wider text-[#67685D] group-hover:text-[#8D8B82] transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CARD 02: Upper Right */}
          <div
            onMouseEnter={() => setActiveNode(1)}
            onMouseLeave={() => setActiveNode(null)}
            className="absolute z-20 top-[315px] right-0 xl:right-[20px] w-[360px] xl:w-[390px] flex items-start gap-3.5 group cursor-pointer"
          >
            <span className="font-serif italic text-4xl xl:text-5xl text-[#E8DCC8]/60 group-hover:text-[#FFF8EE] group-hover:scale-105 transition-all flex-shrink-0 pt-0.5 select-none drop-shadow-md">
              02
            </span>
            <div className="w-full bg-[#121212]/85 hover:bg-[#181818]/95 backdrop-blur-md border border-white/10 hover:border-white/25 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[#D8D1C2]">
                  {MILESTONES[1].year}
                </span>
              </div>
              <h3 className="font-serif text-lg text-[#F1EDE3] font-normal leading-snug mb-0.5">
                {MILESTONES[1].role}
              </h3>
              <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#A8A499] mb-2.5">
                {MILESTONES[1].company} · {MILESTONES[1].location}
              </p>
              <p className="text-[#8D8B82] text-xs leading-relaxed font-sans">
                {MILESTONES[1].description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-white/[0.06]">
                {MILESTONES[1].tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-sans uppercase tracking-wider text-[#67685D] group-hover:text-[#8D8B82] transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CARD 03: Lower Left */}
          <div
            onMouseEnter={() => setActiveNode(2)}
            onMouseLeave={() => setActiveNode(null)}
            className="absolute z-20 top-[575px] left-0 xl:left-[20px] w-[360px] xl:w-[390px] flex items-start gap-3.5 group cursor-pointer"
          >
            <span className="font-serif italic text-4xl xl:text-5xl text-[#E8DCC8]/60 group-hover:text-[#FFF8EE] group-hover:scale-105 transition-all flex-shrink-0 pt-0.5 select-none drop-shadow-md">
              03
            </span>
            <div className="w-full bg-[#121212]/85 hover:bg-[#181818]/95 backdrop-blur-md border border-white/10 hover:border-white/25 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[#D8D1C2]">
                  {MILESTONES[2].year}
                </span>
              </div>
              <h3 className="font-serif text-lg text-[#F1EDE3] font-normal leading-snug mb-0.5">
                {MILESTONES[2].role}
              </h3>
              <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#A8A499] mb-2.5">
                {MILESTONES[2].company} · {MILESTONES[2].location}
              </p>
              <p className="text-[#8D8B82] text-xs leading-relaxed font-sans">
                {MILESTONES[2].description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-white/[0.06]">
                {MILESTONES[2].tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-sans uppercase tracking-wider text-[#67685D] group-hover:text-[#8D8B82] transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CARD 04: Bottom Right */}
          <div
            onMouseEnter={() => setActiveNode(3)}
            onMouseLeave={() => setActiveNode(null)}
            className="absolute z-20 top-[825px] right-0 xl:right-[20px] w-[360px] xl:w-[390px] flex items-start gap-3.5 group cursor-pointer"
          >
            <span className="font-serif italic text-4xl xl:text-5xl text-[#E8DCC8]/60 group-hover:text-[#FFF8EE] group-hover:scale-105 transition-all flex-shrink-0 pt-0.5 select-none drop-shadow-md">
              04
            </span>
            <div className="w-full bg-[#121212]/85 hover:bg-[#181818]/95 backdrop-blur-md border border-white/10 hover:border-white/25 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[#D8D1C2]">
                  {MILESTONES[3].year}
                </span>
              </div>
              <h3 className="font-serif text-lg text-[#F1EDE3] font-normal leading-snug mb-0.5">
                {MILESTONES[3].role}
              </h3>
              <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#A8A499] mb-2.5">
                {MILESTONES[3].company} · {MILESTONES[3].location}
              </p>
              <p className="text-[#8D8B82] text-xs leading-relaxed font-sans">
                {MILESTONES[3].description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-white/[0.06]">
                {MILESTONES[3].tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-sans uppercase tracking-wider text-[#67685D] group-hover:text-[#8D8B82] transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 4. MOBILE & TABLET ROADMAP VIEW (< 1024px) */}
        <div className="block lg:hidden relative pl-10 sm:pl-14 space-y-8 sm:space-y-10 journey-fade-in">
          {/* Vertical Glowing Roadway Spine */}
          <div className="absolute left-4 sm:left-6 top-3 bottom-6 w-[3px] bg-gradient-to-b from-transparent via-[#F1EDE3]/30 to-transparent">
            {/* Dashed Center Animation */}
            <div className="w-full h-full border-l-2 border-dashed border-[#FFF8EE]/50" />
          </div>

          {MILESTONES.map((m) => (
            <div key={m.number} className="relative group">
              {/* Glowing Road Node Pin on the line */}
              <div className="absolute -left-10 sm:-left-14 top-5 w-6 h-6 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border-2 border-[#C4BAA9] bg-[#FFF8EE] shadow-[0_0_10px_rgba(241,237,227,0.4)]" />
              </div>

              {/* Card Container with Numeral */}
              <div className="flex items-start gap-3">
                <span className="font-serif italic text-3xl sm:text-4xl text-[#E8DCC8]/60 flex-shrink-0 pt-1 select-none">
                  {m.number}
                </span>

                <div className="w-full bg-[#121212]/90 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg">
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[#D8D1C2]">
                      {m.year}
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg text-[#F1EDE3] font-normal leading-snug mb-0.5">
                    {m.role}
                  </h3>
                  <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#A8A499] mb-2">
                    {m.company} · {m.location}
                  </p>
                  <p className="text-[#8D8B82] text-xs leading-relaxed font-sans">
                    {m.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-white/[0.06]">
                    {m.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-sans uppercase tracking-wider text-[#67685D]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 5. Bottom Narrative Transition */}
        <div className="mt-16 sm:mt-20 text-center journey-fade-in">
          <div className="inline-flex flex-col items-center gap-2.5">
            <p className="text-[#8D8B82] text-xs font-sans uppercase tracking-widest">
              The story continues
            </p>
            <div className="w-[1px] h-10 bg-gradient-to-b from-[#8D8B82]/60 to-transparent" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default JourneySection;
