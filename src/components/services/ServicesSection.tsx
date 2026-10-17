import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardData {
  id: string;
  title: string;
  img: string;
  categoryValue: string;
}

const CORE_SERVICES: ServiceCardData[] = [
  {
    id: "weddings",
    title: "Weddings",
    img: "/images/gallery/thumbnails/2W6A3149.webp",
    categoryValue: "wedding",
  },
  {
    id: "prewedding",
    title: "Pre-Weddings",
    img: "/images/gallery/thumbnails/2W6A8657.webp",
    categoryValue: "wedding",
  },
  {
    id: "portraits",
    title: "Portraits & Editorial",
    img: "/images/gallery/thumbnails/DSC04238.webp",
    categoryValue: "other",
  },
  {
    id: "commercial",
    title: "Commercial & Brands",
    img: "/images/gallery/thumbnails/DSCF0445.webp",
    categoryValue: "corporate",
  },
  {
    id: "travel",
    title: "Travel & Aerial",
    img: "/images/gallery/thumbnails/DSC02662.webp",
    categoryValue: "other",
  },
  {
    id: "events",
    title: "Events & Celebrations",
    img: "/images/gallery/thumbnails/DSC00565.webp",
    categoryValue: "event",
  },
  {
    id: "fashion",
    title: "Fashion & Lifestyle",
    img: "/images/gallery/thumbnails/DSC00293.webp",
    categoryValue: "advertisement",
  },
  {
    id: "documentaries",
    title: "Documentaries",
    img: "/images/gallery/thumbnails/IMG_2688.webp",
    categoryValue: "corporate",
  },
];

const ADDITIONAL_SERVICES: ServiceCardData[] = [
  {
    id: "albums",
    title: "Fine-Art Print Albums",
    img: "/images/gallery/thumbnails/DSC01011.webp",
    categoryValue: "other",
  },
];

interface Props {
  onSelectService?: (category: string) => void;
}

const ServicesSection: React.FC<Props> = ({ onSelectService }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const extraGridRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // Skip GSAP layout calculation on mobile to prevent main-thread blocking
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        if (gridRef.current) {
          gsap.fromTo(
            Array.from(gridRef.current.children),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.06,
              ease: "power2.out",
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

  useEffect(() => {
    if (showMore && extraGridRef.current) {
      gsap.fromTo(
        Array.from(extraGridRef.current.children),
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" }
      );
    }
  }, [showMore]);

  const handleCardClick = (categoryValue: string) => {
    if (onSelectService) {
      onSelectService(categoryValue);
    } else {
      const contactEl = document.getElementById("contact");
      contactEl?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-12 sm:py-16 lg:py-12 px-5 sm:px-8 bg-[#080B09] scroll-mt-20 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header - Sleek & Compact */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-[1px] bg-[#67685D]" />
              <p className="text-[10px] font-display font-semibold uppercase tracking-[0.25em] text-[#8D8B82]">
                What We Do
              </p>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F1EDE3] font-normal tracking-tight">
              Our Services
            </h2>
          </div>
          <p className="text-xs text-[#8D8B82] font-sans max-w-md hidden sm:block leading-relaxed">
            Bespoke visual storytelling, cinematography, and editorial photography crafted with cinematic precision.
          </p>
        </div>

        {/* Unified 8-Service Grid: 2 columns on mobile, 4 columns on laptop */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-4"
        >
          {CORE_SERVICES.map((svc, i) => (
            <div
              key={svc.id}
              onClick={() => handleCardClick(svc.categoryValue)}
              className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-[#F1EDE3]/10 hover:border-[#F1EDE3]/30 bg-[#111412] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Background Photo with subtle zoom on hover */}
              <img
                src={svc.img}
                alt={svc.title}
                className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />

              {/* Cinematic Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent group-hover:from-black/95 transition-colors duration-500 pointer-events-none" />

              {/* Bottom Content Bar */}
              <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 z-10">
                <span className="text-[8px] sm:text-[9px] font-display font-medium tracking-[0.2em] uppercase text-[#D8D1C2]/60 mb-0.5 sm:mb-1 block">
                  0{i + 1}
                </span>
                <h3 className="font-serif text-[13px] sm:text-base lg:text-[1.2rem] text-[#F1EDE3] font-normal leading-snug tracking-wide drop-shadow-md group-hover:text-white transition-colors duration-300">
                  {svc.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Expandable Additional Services (Reveals only when user clicks View More) */}
        {showMore && (
          <div
            ref={extraGridRef}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-4 mt-2.5 sm:mt-4"
          >
            {ADDITIONAL_SERVICES.map((svc, i) => (
              <div
                key={svc.id}
                onClick={() => handleCardClick(svc.categoryValue)}
                className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-[#F1EDE3]/10 hover:border-[#F1EDE3]/30 bg-[#111412] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={svc.img}
                  alt={svc.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent group-hover:from-black/95 transition-colors duration-500 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4 z-10">
                  <span className="text-[8px] sm:text-[9px] font-display font-medium tracking-[0.2em] uppercase text-[#D8D1C2]/60 mb-0.5 sm:mb-1 block">
                    {i + 9 < 10 ? `0${i + 9}` : `${i + 9}`}
                  </span>
                  <h3 className="font-serif text-[13px] sm:text-base lg:text-[1.2rem] text-[#F1EDE3] font-normal leading-snug tracking-wide drop-shadow-md group-hover:text-white transition-colors duration-300">
                    {svc.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Centered Small Non-Round "View More" Text Link */}
        <div className="mt-6 sm:mt-7 flex justify-center">
          <button
            onClick={() => setShowMore((prev) => !prev)}
            className="group inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-[#8D8B82] hover:text-[#F1EDE3] transition-colors pb-0.5 border-b border-[#F1EDE3]/20 hover:border-[#F1EDE3]"
          >
            <span>{showMore ? "View Less" : "View More"}</span>
            <svg
              viewBox="0 0 24 24"
              className={`w-3 h-3 stroke-current fill-none stroke-[2] transition-transform duration-300 ${
                showMore ? "rotate-180" : "group-hover:translate-y-0.5"
              }`}
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
