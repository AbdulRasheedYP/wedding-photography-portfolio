import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: "100+", label: "Visual Projects" },
  { number: "3+", label: "Fashion Shows" },
  { number: "2+", label: "Countries" },
  { number: "4+", label: "Languages" },
];

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxImgRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Parallax on main image
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

        // Content reveal
        if (contentRef.current) {
          gsap.fromTo(
            Array.from(contentRef.current.children),
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
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

        // Stats count-up feel
        if (statsRef.current) {
          gsap.fromTo(
            Array.from(statsRef.current.children),
            { opacity: 0, y: 20, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 85%",
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
      className="py-16 sm:py-24 lg:py-28 px-5 sm:px-8 bg-[#080B09] scroll-mt-20 relative overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#F1EDE3]/[0.025] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-72 h-72 bg-[#8D8B82]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* Section eyebrow */}
        <div className="flex items-center gap-3 mb-10 sm:mb-14">
          <span className="w-8 h-[1px] bg-[#67685D]" />
          <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8D8B82]">
            About The Artist
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* LEFT — Story */}
          <div ref={contentRef} className="space-y-7">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] text-[#F1EDE3] font-normal leading-[1.1] tracking-tight">
              Every frame is{" "}
              <span className="italic text-[#C8BFB0]">a deliberate act.</span>
            </h2>

            <p className="font-serif text-lg sm:text-xl text-[#D8D1C2] font-normal leading-relaxed italic border-l-2 border-[#67685D] pl-5 py-1">
              "Light, motion, truth — captured in a single breath."
            </p>

            <p className="text-[#8D8B82] text-sm sm:text-[15px] leading-[1.85] font-sans">
              I'm <strong className="text-[#F1EDE3] font-medium">Adil Mubarak</strong> — a creative Videographer, Photographer, and Reel Editor operating between{" "}
              <strong className="text-[#F1EDE3] font-medium">Dubai, UAE</strong> and Calicut, Kerala. With over{" "}
              <strong className="text-[#F1EDE3] font-medium">100+ visual projects</strong> across fashion campaigns, bridal shows, corporate events, and social media — I merge cinematic storytelling with editorial precision.
            </p>

            <p className="text-[#8D8B82] text-sm sm:text-[15px] leading-[1.85] font-sans">
              My post-production home is <strong className="text-[#F1EDE3] font-medium">DaVinci Resolve</strong>. From color grading cinematic wedding films to crafting reels that stop the scroll — every project is built with intention. Whether it's a fashion show runway in Calicut or an event across Dubai, the approach stays the same: make it real, make it beautiful.
            </p>

            {/* Skills chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {["Videography", "Photography", "Reel Editing", "Color Grading", "DaVinci Resolve", "Fashion Campaigns", "Social Media Content"].map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#8D8B82] border border-[#F1EDE3]/10 px-3 py-1.5 rounded-full hover:border-[#F1EDE3]/30 hover:text-[#D8D1C2] transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Identity card */}
            <div className="pt-3 flex items-center gap-4 border-t border-[#F1EDE3]/[0.07]">
              <div className="w-11 h-11 rounded-full border border-[#F1EDE3]/15 overflow-hidden bg-[#111412] flex-shrink-0">
                <img
                  src="/images/about/founder.webp"
                  alt="Adil Mubarak"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <p className="font-serif text-base text-[#F1EDE3] font-semibold leading-tight">
                  Adil Mubarak MK
                </p>
                <p className="text-[10px] font-sans text-[#67685D] uppercase tracking-widest mt-0.5">
                  Videographer & Photographer — Dubai, UAE
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Visual + Stats */}
          <div className="space-y-8">

            {/* Main editorial image */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-[#F1EDE3]/10 shadow-2xl bg-[#111412]">
              <img
                ref={parallaxImgRef}
                src="/images/about/camera_rig.webp"
                alt="Behind the Lens — Adil Mubarak"
                className="w-full h-[115%] object-cover -translate-y-[7%] filter brightness-90 contrast-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-[#080B09]/90 backdrop-blur-sm border border-[#F1EDE3]/10 rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#67685D] flex-shrink-0 animate-pulse" />
                  <div>
                    <p className="text-[11px] font-sans font-semibold text-[#F1EDE3] uppercase tracking-widest">Currently Based In</p>
                    <p className="text-[10px] font-sans text-[#8D8B82] mt-0.5">Dubai, UAE · Available Worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#0D100E] border border-[#F1EDE3]/[0.07] rounded-xl px-5 py-4 hover:border-[#F1EDE3]/20 transition-colors duration-300"
                >
                  <p className="font-serif text-3xl text-[#F1EDE3] font-normal">{stat.number}</p>
                  <p className="text-[10px] font-sans uppercase tracking-widest text-[#67685D] mt-1.5">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
