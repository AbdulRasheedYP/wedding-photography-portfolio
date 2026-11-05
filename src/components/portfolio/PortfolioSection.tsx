import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project, Category } from "../../types";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  projects?: Project[];
  categories?: Category[];
  onSelectProject: (project: Project) => void;
}

const OFFICIAL_SHOWREEL_PROJECT: Project = {
  id: "official-showreel",
  title: "Adil Mubarak — Official Showreel 2026",
  category: { id: 1, name: "Fashion & Event Cinema", slug: "showreel" },
  thumbnail: "/images/hero/hero_bg.webp",
  video_url: "/videos/showreel.mp4",
  client_name: "Adil Mubarak Films",
  description: "Cinematic montage of bridal campaigns, fashion shows, and event films captured across Dubai and Kerala.",
};

const PortfolioSection: React.FC<Props> = ({ onSelectProject }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        if (containerRef.current) {
          gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 35, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 78%",
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

  const handlePlayFull = () => {
    onSelectProject(OFFICIAL_SHOWREEL_PROJECT);
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-14 sm:py-20 lg:py-24 bg-[#080B09] scroll-mt-20 overflow-hidden relative"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#F1EDE3]/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#67685D]" />
              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8D8B82]">
                Show Reel
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F1EDE3] font-normal tracking-tight leading-[1.05]">
              Cinematic <span className="italic text-[#C8BFB0]">Reel</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#8D8B82] font-sans max-w-sm leading-relaxed">
            A 44-second visual showcase of fashion campaigns, bridal films, and event cinema — graded on DaVinci Resolve.
          </p>
        </div>

        {/* Real Single Showreel Spotlight Card (with 2-3s silent looping preview) */}
        <div
          ref={containerRef}
          onClick={handlePlayFull}
          className="group relative w-full aspect-[16/9] sm:aspect-[21/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#111412] border border-[#F1EDE3]/15 hover:border-[#F1EDE3]/40 cursor-pointer shadow-[0_20px_70px_rgba(0,0,0,0.85)] transition-all duration-700 hover:shadow-[0_25px_90px_rgba(0,0,0,0.95)]"
        >
          {/* Silent 2-3 Second Video Loop (No Sound, Auto-Repeat) */}
          <video
            ref={videoRef}
            src="/videos/showreel-preview.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.08] transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
          />

          {/* Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

          {/* Top Info Bar */}
          <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-7 flex items-center justify-between pointer-events-none z-10">
            {/* Live silent preview pill */}
            <div className="inline-flex items-center gap-2 bg-[#080B09]/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-widest text-[#F1EDE3]">
                Silent Preview Loop
              </span>
            </div>

            {/* Quality badge */}
            <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
              <span className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-wider text-[#D8D1C2]">
                1080p HD · 60fps · 0:44s
              </span>
            </div>
          </div>

          {/* Center Play Button with Expanding Pulse */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none z-10">
            <div className="relative flex items-center justify-center">
              {/* Ripple Ring */}
              <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 animate-ping opacity-40 pointer-events-none" />
              
              {/* Play Circle */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F1EDE3] text-[#080B09] flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            <div className="bg-[#080B09]/85 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full shadow-lg group-hover:border-white/30 transition-all duration-300">
              <p className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#F1EDE3]">
                Click to Watch with Sound
              </p>
            </div>
          </div>

          {/* Bottom Content Bar */}
          <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-7 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none z-10">
            <div>
              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8D8B82] mb-1">
                Adil Mubarak Films
              </p>
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#F1EDE3] font-normal leading-tight">
                Direction, Cinematography &amp; Reel Edit
              </h3>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-widest text-[#D8D1C2]/80">
              <svg className="w-3.5 h-3.5 fill-current text-[#25D366]" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
              <span>Full Audio Available on Click</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;
