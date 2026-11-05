import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "100+", label: "Projects Completed", detail: "Campaigns, Events & Reels" },
  { value: "03", label: "Fashion Shows Filmed", detail: "Runway & Bridal Launches" },
  { value: "02", label: "Global Bases", detail: "Dubai, UAE & Kerala, India" },
  { value: "04", label: "Languages", detail: "English · Malayalam · Hindi · Tamil" },
];

const TECH_STACK = [
  { name: "DaVinci Resolve", category: "Color & Grade", level: "Advanced" },
  { name: "Cinematography", category: "Capture", level: "4K / 60fps" },
  { name: "Reel Production", category: "Short-Form", level: "High Engagement" },
  { name: "Color Science", category: "Post-Production", level: "10-Bit Log" },
  { name: "Meta Ads & SMM", category: "Marketing", level: "Growth & Reach" },
  { name: "CapCut Pro", category: "Fast Turnaround", level: "Rapid Social" },
];

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hudTimeRef = useRef<HTMLSpanElement>(null);
  const [dubaiTime, setDubaiTime] = useState("");

  useEffect(() => {
    // Live Dubai clock
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setDubaiTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const cards = sectionRef.current?.querySelectorAll(".bento-card");
        if (cards && cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 35, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.1,
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
      {/* Futuristic Ambient Laser Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#25D366]/[0.025] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-[#F1EDE3]/[0.02] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#F1EDE3_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header: Just "About" */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#67685D]" />
              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8D8B82]">
                Profile
              </p>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#F1EDE3] font-normal tracking-tight leading-[1.05]">
              About
            </h2>
          </div>

          {/* Futuristic Viewfinder Meta */}
          <div className="flex items-center gap-3 text-[10px] font-mono text-[#8D8B82] bg-white/[0.03] border border-white/[0.08] px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            <span>SYS: 4K_LOG</span>
            <span className="text-white/20">|</span>
            <span>COLOR: DAVINCI_MGMT</span>
            <span className="text-white/20">|</span>
            <span className="text-[#D8D1C2]">DXB {dubaiTime || "12:00:00"}</span>
          </div>
        </div>

        {/* Futuristic Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

          {/* 1. MAIN BIO & VISION CARD (Span 8) */}
          <div className="bento-card lg:col-span-8 relative rounded-3xl p-6 sm:p-9 bg-gradient-to-br from-[#121614]/90 via-[#0D100E]/80 to-[#0A0D0B]/90 border border-white/[0.09] shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col justify-between overflow-hidden group hover:border-white/20 transition-all duration-500">
            {/* Viewfinder corner crosshairs */}
            <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/20 pointer-events-none" />
            <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/20 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/20 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/20 pointer-events-none" />

            {/* Glowing top line */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#F1EDE3]/20 to-transparent" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-mono tracking-widest text-[#8D8B82] uppercase">
                  // 01 · ARTISTIC PHILOSOPHY
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 px-2.5 py-0.5 rounded-full">
                  Available Worldwide
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl text-[#F1EDE3] font-normal leading-[1.2] tracking-tight mb-5">
                Merging cinematic precision with <span className="italic text-[#C8BFB0]">raw human emotion.</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-[14px] text-[#A8A499] font-sans leading-[1.8] max-w-2xl">
                <p>
                  I'm <strong className="text-[#F1EDE3] font-medium">Adil Mubarak MK</strong> — a creative Videographer, Photographer, and Reel Editor operating between <strong className="text-[#F1EDE3] font-medium">Dubai, UAE</strong> and <strong className="text-[#F1EDE3] font-medium">Calicut, Kerala</strong>.
                </p>
                <p>
                  With <strong className="text-[#F1EDE3] font-medium">100+ visual projects</strong> spanning luxury bridal campaigns, high-fashion runway shows, and corporate galas — my camera work is grounded in intentional framing, dynamic camera movement, and high-engagement social storytelling.
                </p>
                <p>
                  Every piece of footage is developed inside <strong className="text-[#F1EDE3] font-medium">DaVinci Resolve</strong>. From custom color management to rhythmic sound design, I construct visual experiences engineered to stop the scroll and leave a lasting memory.
                </p>
              </div>
            </div>

            {/* Identity & Download Action Bar */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full border border-white/20 p-0.5 bg-[#171B19] shadow-inner flex-shrink-0">
                  <img
                    src="/images/about/founder.webp"
                    alt="Adil Mubarak"
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="font-serif text-base text-[#F1EDE3] font-normal leading-tight">
                    Adil Mubarak MK
                  </p>
                  <p className="text-[10px] font-mono text-[#8D8B82] uppercase tracking-wider mt-0.5">
                    Videographer · Reel Editor · Colorist
                  </p>
                </div>
              </div>

              {/* Futuristic CV Download Button */}
              <a
                href="/documents/Adil_Mubarak_Resume.pdf"
                download="Adil_Mubarak_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full bg-[#F1EDE3] text-[#080B09] font-sans font-bold text-xs uppercase tracking-wider hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(241,237,227,0.15)]"
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
                <span className="text-[9px] font-mono text-[#080B09]/60 border-l border-[#080B09]/20 pl-2">
                  PDF · 52KB
                </span>
              </a>
            </div>
          </div>

          {/* 2. LIVE LOCATION & HUD RADAR CARD (Span 4) */}
          <div className="bento-card lg:col-span-4 relative rounded-3xl p-6 bg-gradient-to-br from-[#121614]/90 to-[#0A0D0B]/90 border border-white/[0.09] shadow-xl backdrop-blur-xl flex flex-col justify-between overflow-hidden group hover:border-white/20 transition-all duration-500">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-widest text-[#8D8B82] uppercase">
                  // 02 · LOCATION &amp; RADAR
                </span>
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
              </div>

              {/* Futuristic Radar Grid Mockup */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#080B09] border border-white/[0.08] p-4 flex flex-col justify-between mb-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,211,102,0.08)_0,transparent_70%)]" />
                {/* Radar rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-32 rounded-full border border-white/5 animate-pulse" />
                  <div className="absolute w-20 h-20 rounded-full border border-white/10" />
                  <div className="absolute w-2 h-2 rounded-full bg-[#25D366] shadow-[0_0_12px_#25D366]" />
                </div>

                <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-[#8D8B82]">
                  <span>LAT: 25.2048° N</span>
                  <span>LNG: 55.2708° E</span>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#F1EDE3]">
                  <span className="text-[#25D366] font-bold">STATUS: READY TO SHOOT</span>
                  <span>ZONE: UAE / IND</span>
                </div>
              </div>

              <h4 className="font-serif text-xl text-[#F1EDE3] font-normal leading-tight mb-2">
                Dubai &amp; Worldwide
              </h4>
              <p className="text-xs text-[#8D8B82] font-sans leading-relaxed">
                Primary production base in Dubai, UAE with frequent shoots across Calicut, Kochi, and international locations.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.07] flex items-center justify-between text-[11px] font-mono text-[#D8D1C2]">
              <span>Direct WhatsApp:</span>
              <a
                href="https://wa.me/971568709412?text=Hi%20Adil,%20inquiring%20about%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline"
              >
                +971 56 870 9412 &rarr;
              </a>
            </div>
          </div>

          {/* 3. FOUR STATS METRIC BENTO CARDS (Span 6, grid 2x2) */}
          <div className="bento-card lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="rounded-2xl p-5 bg-[#121614]/80 border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono text-[#67685D] uppercase tracking-wider">
                    0{i + 1} //
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#F1EDE3] transition-colors" />
                </div>
                <div>
                  <p className="font-serif text-3xl sm:text-4xl text-[#F1EDE3] font-normal tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                    {stat.value}
                  </p>
                  <p className="font-sans text-[11px] font-semibold text-[#D8D1C2] uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                  <p className="font-sans text-[10px] text-[#8D8B82] mt-0.5">
                    {stat.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 4. DAVINCI RESOLVE & POST-PRODUCTION WORKFLOW (Span 6) */}
          <div className="bento-card lg:col-span-6 relative rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#121614]/90 to-[#0A0D0B]/90 border border-white/[0.09] shadow-xl backdrop-blur-xl flex flex-col justify-between overflow-hidden group hover:border-white/20 transition-all duration-500">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-widest text-[#8D8B82] uppercase">
                  // 03 · POST-PRODUCTION ENGINE
                </span>
                <span className="text-[10px] font-mono text-[#D8D1C2] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                  DaVinci Resolve Studio
                </span>
              </div>

              {/* Color scopes & grade simulation */}
              <div className="mb-4 p-3 rounded-2xl bg-[#080B09] border border-white/[0.06] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#E25B45]" />
                  <div className="w-3 h-3 rounded-full bg-[#F3B23E]" />
                  <div className="w-3 h-3 rounded-full bg-[#3B90B2]" />
                  <div className="w-3 h-3 rounded-full bg-[#25D366]" />
                </div>
                <span className="text-[10px] font-mono text-[#8D8B82]">
                  10-BIT COLOR PIPELINE · LOG &rarr; REC.709
                </span>
                <span className="text-[10px] font-mono text-[#25D366]">PASS ✓</span>
              </div>

              {/* Interactive Tool Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                {TECH_STACK.map((tech) => (
                  <div
                    key={tech.name}
                    className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all duration-200"
                  >
                    <p className="text-[11px] font-sans font-semibold text-[#F1EDE3] leading-snug">
                      {tech.name}
                    </p>
                    <p className="text-[9px] font-mono text-[#8D8B82] uppercase tracking-wider mt-0.5">
                      {tech.level}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] font-sans text-[#67685D] mt-4 pt-3 border-t border-white/[0.06]">
              Engineered for social speed, calibrated for cinema projection.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
