import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    // Desktop: punchy & prominent side slide-in
    mm.add("(min-width: 1024px)", () => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: -115 },
          {
            opacity: 1,
            x: 0,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: 115 },
          {
            opacity: 1,
            x: 0,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    });

    // Mobile / Tablet: responsive side slide-in
    mm.add("(max-width: 1023px)", () => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 sm:py-24 lg:py-28 px-5 sm:px-8 bg-black scroll-mt-20 relative overflow-hidden text-[#F1EDE3]"
    >
      {/* Soft Ambient Cinematic Glows — Zero GPU blur overhead */}
      <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full pointer-events-none opacity-25" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }} />

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
            {/* Primary Large Editorial Image with Interactive Hover Swap */}
            <div className="relative aspect-[10/11] max-w-[420px] mx-auto lg:max-w-none rounded-3xl overflow-hidden bg-[#141414] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group cursor-pointer">
              {/* Default Primary Image: Adil Mubarak Portrait in Dubai */}
              <img
                src="/images/about/owner.webp"
                alt="Adil Mubarak — Cinematographer & Photographer"
                className="w-full h-full object-cover object-[center_35%] filter brightness-[0.96] contrast-[1.04] transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
                loading="eager"
                decoding="async"
              />
              {/* On-Hover Reveal Image: Adil Mubarak On Set Camera Rig */}
              <img
                src="/images/about/camera_rig_hover.webp"
                alt="Adil Mubarak — On Set"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.94] contrast-[1.05] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-100 group-hover:scale-105 pointer-events-none"
                loading="lazy"
                decoding="async"
              />
              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
            </div>
          </div>

          {/* RIGHT: STORY, SKILLS, STATS & CV (Span 7) */}
          <div ref={contentRef} className="lg:col-span-7 space-y-7">
            
            {/* Main Headline — Professional & Grounded */}
            <div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#F1EDE3] font-normal leading-[1.2] tracking-tight">
                Creative Videographer, Photographer <span className="italic text-[#C8BFB0]">&amp; Reel Editor</span>
              </h3>
              <p className="text-xs sm:text-[13px] font-sans uppercase tracking-[0.22em] text-[#8D8B82] mt-3">
                Dubai, UAE · Calicut, Kerala
              </p>
            </div>

            {/* Narrative Bio — Strictly Verbatim & Factual from CV */}
            <div className="space-y-4 text-xs sm:text-[14.5px] text-[#A8A499] font-sans leading-[1.85]">
              <p>
                Creative <strong className="text-[#F1EDE3] font-medium">Videographer, Photographer, and Reel Editor</strong> with hands-on experience producing engaging visual content for bridal &amp; fashion campaigns, fashion shows, corporate events, and social media platforms across <strong className="text-[#F1EDE3] font-medium">Dubai, UAE</strong> and <strong className="text-[#F1EDE3] font-medium">Calicut, Kerala</strong>.
              </p>
              <p>
                Skilled in professional camera operation, visual storytelling, color grading, and end-to-end post-production with a strong focus on <strong className="text-[#F1EDE3] font-medium">DaVinci Resolve</strong>. Experienced in delivering high-quality content under tight deadlines and creating short-form videos optimized for Instagram Reels and digital marketing campaigns.
              </p>
              <p>
                Track record includes delivering <strong className="text-[#F1EDE3] font-medium">100+ video projects</strong>, filming and editing <strong className="text-[#F1EDE3] font-medium">3 runway fashion shows</strong>, leading visual coverage for bridal collections at Shobhika Weddings, and capturing high-profile corporate, cultural, and social events at Jovial Events, Dubai.
              </p>
            </div>

            {/* Profile Signature & Contact Info */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-3.5">
              {/* Round Profile DP Avatar */}
              <div className="w-12 h-12 rounded-full border border-white/20 p-0.5 bg-[#141414] shadow-md flex-shrink-0 overflow-hidden">
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

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
