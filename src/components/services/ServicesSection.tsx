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
    description: "Cinematic event, bridal, and commercial coverage. High-production camera movement and intentional framing calibrated for impactful visual storytelling.",
    img: "/images/services/1.webp",
    tools: ["Cinema Line", "Gimbal", "4K / 60fps"],
  },
  {
    id: "photography",
    number: "02",
    title: "Editorial & Event Photography",
    description: "Portraits and stills that speak volumes. High-fashion lookbooks, bridal campaigns, and cultural galas with a sharp eye for light and raw emotion.",
    img: "/images/services/2.webp",
    tools: ["Editorial", "Bridal", "Lighting"],
  },
  {
    id: "reels",
    number: "03",
    title: "Reel Editing & Short-Form Video",
    description: "Instagram Reels and TikToks engineered to stop the scroll. Dynamic pacing, rhythmic cuts, and immersive audio synced for peak audience engagement.",
    img: "/images/services/3.webp",
    tools: ["Instagram Reels", "CapCut Pro", "Pacing"],
  },
  {
    id: "colorgrading",
    number: "04",
    title: "DaVinci Resolve Color Grading",
    description: "Advanced color correction and grading. Transforming raw LOG footage into rich, filmic palettes that define your brand identity across all screens.",
    img: "/images/services/4.webp",
    tools: ["DaVinci Resolve", "10-Bit Log", "Color Science"],
  },
  {
    id: "fashion",
    number: "05",
    title: "Fashion Shows & Bridal Campaigns",
    description: "Experienced in filming runway fashion shows and seasonal collection launches. Fast-paced multi-angle coverage that brings garments to life.",
    img: "/images/services/5.webp",
    tools: ["3 Fashion Shows", "Lookbooks", "Runway"],
  },
  {
    id: "social",
    number: "06",
    title: "Digital Strategy & Meta Ads",
    description: "Full-funnel digital content strategy. From campaign reels to Meta Ads management, ensuring visual content generates tangible reach and engagement.",
    img: "/images/services/6.webp",
    tools: ["Meta Ads", "Content Strategy", "SMM"],
  },
];

const SKILL_GROUPS = [
  {
    category: "Camera & Cinematography",
    icon: "📹",
    skills: [
      "Videography & Cinematography",
      "Editorial & Bridal Photography",
      "Professional Camera Operation",
      "Runway & Multi-Camera Setup",
      "Gimbal & Motion Stabilization",
      "Creative Lighting & Framing",
    ],
  },
  {
    category: "Post-Production & Color",
    icon: "🎨",
    skills: [
      "DaVinci Resolve (Advanced)",
      "10-Bit Color Correction & Grading",
      "Reel Editing & Short-Form Video",
      "CapCut Pro & Kinetic Cuts",
      "Audio Sync & Dynamic Sound Design",
      "Custom LUT Creation & Color Science",
    ],
  },
  {
    category: "Marketing & Digital Strategy",
    icon: "📈",
    skills: [
      "Social Media Content Optimization",
      "Meta Ads Campaign Execution",
      "SMM Audits & Performance Growth",
      "WordPress Website Management",
      "High-Turnaround Social Delivery",
      "Creative Brand Identity Building",
    ],
  },
];

interface Props {
  onSelectService?: (category: string) => void;
}

const ServicesSection: React.FC<Props> = ({ onSelectService }) => {
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
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.07,
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
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
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

  const handleCardClick = (id: string) => {
    if (onSelectService) {
      onSelectService(id);
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-16 sm:py-24 lg:py-28 px-5 sm:px-8 bg-[#080B09] scroll-mt-20 relative"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div ref={headerRef} className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[1px] bg-[#67685D]" />
              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8D8B82]">
                What I Offer
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F1EDE3] font-normal tracking-tight leading-[1.1]">
              Services &amp; Expertise
            </h2>
          </div>
          <p className="text-sm text-[#8D8B82] font-sans max-w-sm hidden sm:block leading-relaxed">
            Six comprehensive production areas built on real hands-on experience across Dubai, UAE and Kerala.
          </p>
        </div>

        {/* 6 Services Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-14 sm:mb-20"
        >
          {SERVICES.map((serv) => (
            <div
              key={serv.id}
              onClick={() => handleCardClick(serv.id)}
              className="group relative overflow-hidden rounded-2xl border border-[#F1EDE3]/[0.08] hover:border-[#F1EDE3]/25 bg-[#0D100E] cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-0.5"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={serv.img}
                  alt={serv.title}
                  className="w-full h-full object-cover filter brightness-75 contrast-105 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D100E] via-black/20 to-transparent pointer-events-none" />

                {/* Number badge */}
                <div className="absolute top-3 right-3">
                  <span className="font-serif text-xs text-[#F1EDE3]/40 font-normal">{serv.number}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif text-lg sm:text-xl text-[#F1EDE3] font-normal leading-snug mb-2 group-hover:text-white transition-colors duration-300">
                  {serv.title}
                </h3>
                <p className="text-[#8D8B82] text-[13px] leading-relaxed font-sans mb-4">
                  {serv.description}
                </p>

                {/* Tool tags */}
                <div className="flex flex-wrap gap-1.5">
                  {serv.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[9px] font-sans font-semibold uppercase tracking-wider text-[#D8D1C2] bg-[#F1EDE3]/[0.05] border border-[#F1EDE3]/[0.08] px-2 py-1 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Hover CTA */}
                <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#F1EDE3]">
                    Book Shoot
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Technical Skills & Toolkit (Direct from CV) */}
        <div
          ref={skillsRef}
          className="rounded-3xl p-6 sm:p-9 bg-gradient-to-br from-[#121614]/80 via-[#0D100E]/90 to-[#0A0D0B] border border-white/[0.08] shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-[1px] bg-[#67685D]" />
                <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8D8B82]">
                  Capabilities
                </p>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F1EDE3] font-normal tracking-tight">
                Technical Skills &amp; Software Arsenal
              </h3>
            </div>
            <p className="text-xs text-[#8D8B82] font-sans max-w-xs leading-relaxed">
              Every tool and methodology mastered through hands-on campaign execution.
            </p>
          </div>

          {/* 3 Skill Clusters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl p-5 bg-[#080B09]/80 border border-white/[0.06] hover:border-white/[0.15] transition-all duration-300"
              >
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/[0.06]">
                  <span className="text-lg">{group.icon}</span>
                  <h4 className="font-serif text-base text-[#F1EDE3] font-normal">
                    {group.category}
                  </h4>
                </div>

                <ul className="space-y-2.5">
                  {group.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-xs font-sans text-[#A8A499]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]/70 flex-shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Action strip */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-sans text-[#8D8B82] text-center sm:text-left">
              Looking for a custom video production, reel package, or fashion show coverage?
            </p>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-2.5 rounded-full border border-white/20 hover:border-white/50 text-[#F1EDE3] text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-white/5 flex-shrink-0"
            >
              Start a Conversation &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
