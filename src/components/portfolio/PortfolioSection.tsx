import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project, Category } from "../../types";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  projects?: Project[];
  categories?: Category[];
  onSelectProject: (project: Project) => void;
}

const DEFAULT_MAIN_PROJECT: Project = {
  id: "official-showreel",
  title: "Adil Mubarak — Official Showreel 2026",
  category: { id: 1, name: "Fashion & Event Cinema", slug: "showreel" },
  thumbnail: "/images/hero/hero_bg.webp",
  video_url: "/videos/showreel.mp4",
  client_name: "Adil Mubarak Films",
  description: "Cinematic montage of bridal campaigns, fashion shows, and event films captured across Dubai and Kerala.",
};

interface GridReelCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

const GridReelCard: React.FC<GridReelCardProps> = ({ project, onSelectProject }) => {
  const cardVideoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardVideoRef.current) {
      cardVideoRef.current.currentTime = 0;
      cardVideoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardVideoRef.current) {
      cardVideoRef.current.pause();
    }
  };

  return (
    <div
      onClick={() => onSelectProject(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#111412] border border-[#F1EDE3]/10 hover:border-[#F1EDE3]/35 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Background Poster Image */}
      <img
        src={project.thumbnail || "/images/hero/hero_bg.webp"}
        alt={project.title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isHovered && project.video_url ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
        decoding="async"
      />

      {/* Hover Silent Video Preview Loop */}
      {project.video_url && (
        <video
          ref={cardVideoRef}
          src={project.video_url === "/videos/showreel.mp4" ? "/videos/showreel-preview.mp4" : project.video_url}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30 group-hover:from-black/95 transition-colors duration-300 pointer-events-none" />

      {/* Play Icon Badge */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[#F1EDE3] group-hover:text-[#080B09] text-white transition-all duration-300 shadow-md">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current ml-0.5" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Bottom Content Bar */}
      <div className="absolute inset-x-0 bottom-0 p-4 z-10 pointer-events-none">
        {project.category?.name && (
          <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8D8B82] block mb-1">
            {project.category.name}
          </span>
        )}
        <h4 className="font-serif text-base sm:text-lg text-[#F1EDE3] font-normal leading-snug group-hover:text-white transition-colors duration-300 line-clamp-1">
          {project.title}
        </h4>
      </div>
    </div>
  );
};

const PortfolioSection: React.FC<Props> = ({ projects = [], onSelectProject }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const mainProject = projects.length > 0 ? projects[0] : DEFAULT_MAIN_PROJECT;
  const additionalReels = projects.length > 1 ? projects.slice(1) : [];

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

  const handlePlayMain = () => {
    onSelectProject(mainProject);
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
                Portfolio
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F1EDE3] font-normal tracking-tight leading-[1.05]">
              Show <span className="italic text-[#C8BFB0]">Reel</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#8D8B82] font-sans max-w-sm leading-relaxed">
            A 44-second visual showcase of fashion campaigns, bridal films, and event cinema — graded on DaVinci Resolve.
          </p>
        </div>

        {/* 1. FEATURED MAIN REEL SPOTLIGHT (With silent 2-3s auto-repeating video loop) */}
        <div
          ref={containerRef}
          onClick={handlePlayMain}
          className="group relative w-full aspect-[16/9] sm:aspect-[21/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#111412] border border-[#F1EDE3]/15 hover:border-[#F1EDE3]/40 cursor-pointer shadow-[0_20px_70px_rgba(0,0,0,0.85)] transition-all duration-700 hover:shadow-[0_25px_90px_rgba(0,0,0,0.95)]"
        >
          {/* Silent Video Loop (No Sound, 2-3s Repeating Preview) */}
          <video
            ref={heroVideoRef}
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


          {/* Center Play Button with Expanding Pulse */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none z-10">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 animate-ping opacity-40 pointer-events-none" />
              
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

          </div>

          {/* Bottom Content Bar */}
          <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-7 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none z-10">
            <div>
              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8D8B82] mb-1">
                {mainProject.client_name || "Adil Mubarak Films"}
              </p>
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#F1EDE3] font-normal leading-tight">
                {mainProject.title}
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

        {/* 2. ADDITIONAL REELS GRID (Appears dynamically below when more reels are added) */}
        {additionalReels.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-[1px] bg-[#67685D]" />
              <h3 className="font-serif text-xl sm:text-2xl text-[#F1EDE3]">
                More Releases &amp; Campaigns
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {additionalReels.map((reel) => (
                <GridReelCard
                  key={reel.id}
                  project={reel}
                  onSelectProject={onSelectProject}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default PortfolioSection;
