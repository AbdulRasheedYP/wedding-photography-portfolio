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

const DISCIPLINES: DisciplineCard[] = [
  {
    id: "videography",
    number: "01",
    title: "Videography & Cinema",
    description: "Cinematic event and fashion coverage. Every scene composed with intention — from golden-hour exteriors to intimate interior moments.",
    img: "/images/services/1.webp",
    tools: ["Sony / Canon", "Gimbal", "DaVinci Resolve"],
  },
  {
    id: "photography",
    number: "02",
    title: "Photography",
    description: "Stills that tell full stories. Editorial portraits, bridal campaigns, event coverage — with a sharp eye for light and authentic emotion.",
    img: "/images/services/2.webp",
    tools: ["Editorial", "Bridal", "Events"],
  },
  {
    id: "reels",
    number: "03",
    title: "Reel Editing & Short-Form",
    description: "Instagram Reels and short-form video built to stop the scroll. Fast-paced cuts, immersive sound design, optimised for digital platforms.",
    img: "/images/services/3.webp",
    tools: ["Instagram Reels", "CapCut", "Transitions"],
  },
  {
    id: "colorgrading",
    number: "04",
    title: "Color Grading & Post",
    description: "Advanced color correction and grading on DaVinci Resolve. Setting the final mood — cinematic, editorial, or vibrant brand identity.",
    img: "/images/services/4.webp",
    tools: ["DaVinci Resolve", "LUTs", "Color Science"],
  },
  {
    id: "fashion",
    number: "05",
    title: "Fashion & Bridal Campaigns",
    description: "Three full fashion shows filmed and edited. Promotional content for bridal and clothing brands that captures the essence of the collection.",
    img: "/images/services/5.webp",
    tools: ["Fashion Shows", "Lookbooks", "Brand Content"],
  },
  {
    id: "social",
    number: "06",
    title: "Social Media Content",
    description: "End-to-end content creation for Instagram and social campaigns — from shooting to editing to delivery. Built for engagement and aesthetics.",
    img: "/images/services/6.webp",
    tools: ["Meta Ads", "Content Strategy", "Scheduling"],
  },
];

interface Props {
  onSelectService?: (category: string) => void;
}

const ServicesSection: React.FC<Props> = ({ onSelectService }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
      className="py-16 sm:py-24 lg:py-28 px-5 sm:px-8 bg-[#080B09] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[1px] bg-[#67685D]" />
              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8D8B82]">
                What I Do
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F1EDE3] font-normal tracking-tight leading-[1.1]">
              Creative Disciplines
            </h2>
          </div>
          <p className="text-sm text-[#67685D] font-sans max-w-xs hidden sm:block leading-relaxed">
            Six areas of craft — each built on years of hands-on production across events, fashion, and social media.
          </p>
        </div>

        {/* Grid — 2 col mobile, 3 col desktop */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {DISCIPLINES.map((disc) => (
            <div
              key={disc.id}
              onClick={() => handleCardClick(disc.id)}
              className="group relative overflow-hidden rounded-2xl border border-[#F1EDE3]/[0.07] hover:border-[#F1EDE3]/20 bg-[#0D100E] cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-0.5"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={disc.img}
                  alt={disc.title}
                  className="w-full h-full object-cover filter brightness-75 contrast-105 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D100E] via-black/20 to-transparent pointer-events-none" />

                {/* Number overlay */}
                <div className="absolute top-3 right-3">
                  <span className="font-serif text-xs text-[#F1EDE3]/30 font-normal">{disc.number}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif text-lg sm:text-xl text-[#F1EDE3] font-normal leading-snug mb-2 group-hover:text-white transition-colors duration-300">
                  {disc.title}
                </h3>
                <p className="text-[#67685D] text-[13px] leading-relaxed font-sans mb-4">
                  {disc.description}
                </p>

                {/* Tool tags */}
                <div className="flex flex-wrap gap-1.5">
                  {disc.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[9px] font-sans font-semibold uppercase tracking-wider text-[#8D8B82] bg-[#F1EDE3]/[0.05] border border-[#F1EDE3]/[0.07] px-2 py-1 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Hover CTA */}
                <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#D8D1C2]">Enquire</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
