import React from "react";

interface BrandItem {
  id: string;
  name: string;
  logo: string;
  alt: string;
  tag: string;
  className: string;
}

const BRANDS: BrandItem[] = [
  {
    id: "jovial",
    name: "Jovial Events",
    logo: "/images/brands/jovial-events.png",
    alt: "Jovial Events Dubai",
    tag: "Dubai, UAE",
    className: "h-7 sm:h-9 w-auto object-contain",
  },
  {
    id: "shobhika",
    name: "Shobhika Weddings",
    logo: "/images/brands/shobhika-weddings.png",
    alt: "Shobhika Weddings",
    tag: "Calicut, Kerala",
    className: "h-8 sm:h-10 w-auto object-contain",
  },
  {
    id: "quadcubes",
    name: "Quadcubes",
    logo: "/images/brands/quadcubes.png",
    alt: "Quadcubes Agency",
    tag: "Digital Agency",
    className: "h-6 sm:h-8 w-auto object-contain",
  },
  {
    id: "cda",
    name: "CDA Academy",
    logo: "/images/brands/cda-academy.svg",
    alt: "CDA Academy",
    tag: "Media Institute",
    className: "h-7 sm:h-9 w-auto object-contain",
  },
];

const BrandMarquee: React.FC = () => {
  // Multiply items for smooth continuous infinite loop
  const loopItems = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="py-10 sm:py-12 bg-black text-[#F1EDE3] overflow-hidden relative border-t border-white/[0.06]">
      {/* Subtle Ambient Background Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none" />

      {/* Clean Editorial Minimal Header */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-6 sm:mb-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-1.5">
          <span className="w-5 h-[1px] bg-[#67685D]" />
          <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8D8B82]">
            Collaborations &amp; Work History
          </p>
          <span className="w-5 h-[1px] bg-[#67685D]" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl lg:text-[2rem] text-[#F1EDE3] font-normal tracking-tight">
          Brands &amp; Creative Studios
        </h3>
      </div>

      {/* Continuous Horizontal Logo Ribbon with Left & Right Vignette Masks */}
      <div className="relative w-full overflow-hidden py-4 sm:py-5 bg-[#141414]/60 border-y border-white/[0.06] backdrop-blur-sm">
        {/* Left Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-black to-transparent z-20" />
        {/* Right Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-black to-transparent z-20" />

        {/* Marquee Animation */}
        <div className="animate-marquee flex items-center gap-10 sm:gap-16 whitespace-nowrap">
          {loopItems.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex items-center gap-3.5 sm:gap-5 flex-shrink-0 opacity-80 hover:opacity-100 transition-all duration-300 group"
            >
              <img
                src={brand.logo}
                alt={brand.alt}
                className={`${brand.className} filter brightness-100 contrast-105 group-hover:scale-105 transition-transform duration-300`}
                loading="lazy"
              />
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8D8B82]/80 group-hover:text-[#D8D1C2] transition-colors border-l border-white/10 pl-3 sm:pl-4 hidden sm:inline-block">
                {brand.tag}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#67685D]/50 ml-3 sm:ml-5 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
