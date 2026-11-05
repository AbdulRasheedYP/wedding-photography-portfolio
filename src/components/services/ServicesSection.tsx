import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DisciplineCard {
  id: string;
  number: string;
  title: string;
  description: string;
  img: string;
  tools: string[];
}

const SERVICES: DisciplineCard[] = [
  {
    id: "videography",
    number: "01",
    title: "Videography & Cinematography",
    description: "Cinematic event, bridal, and promotional video coverage with professional camera operation.",
    img: "/images/services/1.webp",
    tools: ["4K", "Cinema", "Gimbal"],
  },
  {
    id: "photography",
    number: "02",
    title: "Photography",
    description: "Editorial portraits, bridal fashion campaigns, and social event stills with natural light mastery.",
    img: "/images/services/2.webp",
    tools: ["Editorial", "Bridal", "Events"],
  },
  {
    id: "reels",
    number: "03",
    title: "Reel Editing & Short-Form Content",
    description: "Instagram Reels and digital campaign videos with fast-paced cuts and rhythmic sound sync.",
    img: "/images/services/3.webp",
    tools: ["Reels", "CapCut", "Transitions"],
  },
  {
    id: "colorgrading",
    number: "04",
    title: "Color Correction & Grading",
    description: "Post-production workflows on DaVinci Resolve, creating rich cinematic color and brand tonality.",
    img: "/images/services/4.webp",
    tools: ["DaVinci Resolve", "Color Science"],
  },
  {
    id: "fashion",
    number: "05",
    title: "Fashion Shows & Bridal Campaigns",
    description: "Runway fashion shows and bridal collection launch films designed to elevate brand presence.",
    img: "/images/services/5.webp",
    tools: ["3 Fashion Shows", "Lookbooks"],
  },
  {
    id: "social",
    number: "06",
    title: "Meta Ads & Social Media Content",
    description: "Social media content optimization and Meta Ads campaign execution to drive audience reach.",
    img: "/images/services/6.webp",
    tools: ["Meta Ads", "SMM", "WordPress"],
  },
];

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
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

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
            Array.from(gridRef.current.children),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 80%",
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
      className="py-12 sm:py-16 lg:py-20 px-5 sm:px-8 bg-[#080B09] scroll-mt-20 relative"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div ref={headerRef} className="mb-7 sm:mb-9 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-[1px] bg-[#67685D]" />
              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8D8B82]">
                What I Offer
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F1EDE3] font-normal tracking-tight leading-[1.1]">
              Services &amp; Expertise
            </h2>
          </div>
        </div>

        {/* 6 Services Cards Grid — Compact Box Sizes */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8 sm:mb-10"
        >
          {SERVICES.map((serv) => (
            <div
              key={serv.id}
              className="group relative overflow-hidden rounded-xl border border-[#F1EDE3]/[0.08] hover:border-[#F1EDE3]/25 bg-[#0D100E] transition-all duration-300 hover:shadow-xl"
            >
              {/* Compact Letterbox Image */}
              <div className="relative aspect-[16/7.5] overflow-hidden">
                <img
                  src={serv.img}
                  alt={serv.title}
                  className="w-full h-full object-cover filter brightness-75 contrast-105 transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D100E] via-black/25 to-transparent pointer-events-none" />

                {/* Number badge */}
                <div className="absolute top-2 right-2.5">
                  <span className="font-serif text-[11px] text-[#F1EDE3]/40 font-normal">{serv.number}</span>
                </div>
              </div>

              {/* Compact Content */}
              <div className="p-3.5 sm:p-4">
                <h3 className="font-serif text-base sm:text-[17px] text-[#F1EDE3] font-normal leading-snug mb-1 group-hover:text-white transition-colors duration-200">
                  {serv.title}
                </h3>
                <p className="text-[#8D8B82] text-xs leading-relaxed font-sans mb-2.5 line-clamp-2">
                  {serv.description}
                </p>

                {/* Tool tags */}
                <div className="flex flex-wrap gap-1">
                  {serv.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[8.5px] font-sans font-semibold uppercase tracking-wider text-[#D8D1C2] bg-[#F1EDE3]/[0.05] border border-[#F1EDE3]/[0.07] px-2 py-0.5 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Skills & Software Arsenal — Exact 9 CV Skills Only */}
        <div
          ref={skillsRef}
          className="rounded-2xl p-4 sm:p-6 bg-[#0D100E] border border-white/[0.08] shadow-lg"
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
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#080B09] border border-white/[0.06] hover:border-white/20 transition-all duration-200"
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
