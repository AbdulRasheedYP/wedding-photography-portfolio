import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
  highlight?: boolean;
}

const MILESTONES: Milestone[] = [
  {
    year: "2020",
    role: "Foundation",
    company: "CMM Higher Secondary School",
    location: "Calicut, Kerala",
    description: "Higher Secondary completed. The spark for visual storytelling was already alive — capturing moments on a phone, learning light and composition through instinct.",
    tags: ["Calicut", "Beginnings"],
  },
  {
    year: "2023",
    role: "Digital Marketing Intern",
    company: "Quadcubes",
    location: "Kerala",
    description: "First professional step. Planned and executed Meta Ads campaigns, managed social media accounts, conducted SMM audits, and assisted with Google Ads and WordPress management.",
    tags: ["Meta Ads", "Social Media", "Google Ads"],
  },
  {
    year: "2023",
    role: "Digital Marketing Graduate",
    company: "CDA Academy",
    location: "Calicut, Kerala",
    description: "Completed a focused course in Digital Marketing — the bridge between creative vision and strategic content distribution.",
    tags: ["Digital Marketing", "Strategy"],
  },
  {
    year: "2024–2025",
    role: "Videographer & Content Creator",
    company: "Shobhika Weddings",
    location: "Calicut, Kerala",
    description: "Over a year producing promotional and fashion videos for a leading bridal and wedding-collection brand. Filmed and edited 3 full fashion shows, managed all post-production — color grading, correction, reel creation — and built content for seasonal collection launches.",
    tags: ["Bridal Films", "Fashion Shows", "DaVinci Resolve", "Reels"],
    highlight: true,
  },
  {
    year: "2026",
    role: "Photographer · Videographer · Reel Editor",
    company: "Jovial Events",
    location: "Dubai, UAE",
    description: "Stepped into Dubai — capturing photography and videography across corporate, cultural, and social events. Delivering fast-turnaround content for marketing and social media campaigns at an international scale.",
    tags: ["Dubai", "Events", "Corporate", "International"],
    highlight: true,
  },
];

const JourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Animate the vertical timeline line drawing
        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                once: true,
              },
            }
          );
        }

        // Stagger each milestone card
        itemsRef.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(
            el,
            {
              opacity: 0,
              x: i % 2 === 0 ? -30 : 30,
              y: 10,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
              },
              delay: i * 0.05,
            }
          );
        });
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
      id="journey"
      className="py-16 sm:py-24 lg:py-28 px-5 sm:px-8 bg-[#141414] scroll-mt-20 relative overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/[0.015] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-6 h-[1px] bg-[#67685D]" />
            <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8D8B82]">
              The Road So Far
            </p>
            <span className="w-6 h-[1px] bg-[#67685D]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] text-[#F1EDE3] font-normal leading-[1.1] tracking-tight">
            A journey told in{" "}
            <span className="italic text-[#C8BFB0]">frames.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line — desktop only */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#F1EDE3]/15 to-transparent"
          />

          {/* Mobile left line */}
          <div className="lg:hidden absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#F1EDE3]/10 to-transparent" />

          <div className="space-y-10 sm:space-y-12 lg:space-y-0">
            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  ref={(el) => { itemsRef.current[i] = el; }}
                  className={`relative lg:flex lg:items-start ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} lg:gap-0`}
                >
                  {/* Desktop: left or right card container */}
                  <div className={`hidden lg:block lg:w-[calc(50%-2.5rem)] ${isLeft ? "lg:pr-10 text-right" : "lg:pl-10"}`}>
                    <div
                      className={`group bg-black border ${m.highlight ? "border-white/20 hover:border-white/35" : "border-white/[0.08] hover:border-white/20"} rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-0.5`}
                    >
                      {/* Year badge */}
                      <div className={`inline-flex items-center gap-2 mb-3 ${isLeft ? "flex-row-reverse" : ""}`}>
                        <span className={`text-[10px] font-sans font-bold uppercase tracking-[0.25em] px-2.5 py-1 rounded-full ${m.highlight ? "bg-[#F1EDE3]/10 text-[#D8D1C2]" : "bg-[#F1EDE3]/[0.05] text-[#8D8B82]"}`}>
                          {m.year}
                        </span>
                        <span className="w-4 h-[1px] bg-[#67685D]" />
                      </div>

                      <h3 className="font-serif text-lg text-[#F1EDE3] font-normal leading-snug mb-0.5">
                        {m.role}
                      </h3>
                      <p className={`text-[11px] font-sans font-semibold uppercase tracking-widest mb-3 ${m.highlight ? "text-[#A8A499]" : "text-[#67685D]"}`}>
                        {m.company} · {m.location}
                      </p>
                      <p className="text-[#67685D] text-[13px] leading-relaxed font-sans">
                        {m.description}
                      </p>

                      {/* Tags */}
                      <div className={`flex flex-wrap gap-1.5 mt-4 ${isLeft ? "justify-end" : "justify-start"}`}>
                        {m.tags.map((tag) => (
                          <span key={tag} className="text-[9px] font-sans font-medium uppercase tracking-wider text-[#67685D] border border-[#F1EDE3]/[0.07] px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center dot — desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-6 w-5 h-5 items-center justify-center z-10">
                    <div className={`rounded-full border-2 ${m.highlight ? "w-4 h-4 border-[#F1EDE3]/50 bg-[#F1EDE3]/20" : "w-3 h-3 border-[#67685D] bg-black"}`} />
                  </div>

                  {/* Desktop spacer for other side */}
                  <div className="hidden lg:block lg:w-[calc(50%-2.5rem)]" />

                  {/* Mobile Card */}
                  <div className="lg:hidden flex gap-5 pl-14">
                    {/* Mobile dot */}
                    <div className="absolute left-4 top-6 w-4 h-4 flex items-center justify-center">
                      <div className={`rounded-full ${m.highlight ? "w-4 h-4 border-2 border-[#F1EDE3]/40 bg-[#F1EDE3]/15" : "w-2.5 h-2.5 bg-[#67685D]"}`} />
                    </div>

                    <div className={`group bg-black border ${m.highlight ? "border-white/20" : "border-white/[0.08]"} rounded-2xl p-5 w-full transition-all duration-500`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-sans font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full ${m.highlight ? "bg-[#F1EDE3]/10 text-[#D8D1C2]" : "bg-[#F1EDE3]/[0.05] text-[#8D8B82]"}`}>
                          {m.year}
                        </span>
                      </div>
                      <h3 className="font-serif text-base text-[#F1EDE3] font-normal leading-snug mb-0.5">
                        {m.role}
                      </h3>
                      <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#67685D] mb-2">
                        {m.company} · {m.location}
                      </p>
                      <p className="text-[#67685D] text-xs leading-relaxed font-sans">
                        {m.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {m.tags.map((tag) => (
                          <span key={tag} className="text-[9px] font-sans uppercase tracking-wider text-[#67685D] border border-[#F1EDE3]/[0.07] px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-3">
            <p className="text-[#67685D] text-xs font-sans uppercase tracking-widest">The story continues</p>
            <div className="w-[1px] h-10 bg-gradient-to-b from-[#67685D] to-transparent" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default JourneySection;
