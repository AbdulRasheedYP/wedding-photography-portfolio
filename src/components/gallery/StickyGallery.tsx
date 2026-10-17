import React, { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY_ITEMS, GalleryItem } from "../../data/galleryData";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  "All",
  "Weddings & Shoots",
  "Bridal & Fashion",
  "Travel & Landscapes",
  "Lifestyle & BTS",
] as const;

interface StickyCardProps {
  item: GalleryItem;
  onClick: () => void;
}

const StickyCard: React.FC<StickyCardProps> = ({ item, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="sticky-card cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
      style={{ transform: `rotate(${item.rotation}deg)` }}
      onClick={onClick}
    >
      <div className="sticky-tape-bar" />
      <div className="sticky-img-wrap relative overflow-hidden rounded-lg bg-[#111412]">
        {/* Shimmer skeleton placeholder */}
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#111412] via-[#1a1f1b] to-[#111412] animate-pulse pointer-events-none" />
        )}
        <picture>
          <source srcSet={item.thumb} type="image/webp" />
          <img
            src={item.thumb}
            alt={item.note}
            className={`sticky-img w-full h-full object-cover transition-all duration-500 hover:scale-105 ${
              loaded ? "opacity-100 filter-none" : "opacity-0 scale-95"
            }`}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={(e) => {
              if (e.currentTarget.src !== item.img) {
                e.currentTarget.src = item.img;
              }
              setLoaded(true);
            }}
          />
        </picture>
        <div className="sticky-img-overlay absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="sticky-hover-tag px-3 py-1 bg-black/70 text-[#F1EDE3] text-[10px] font-sans uppercase tracking-widest rounded border border-white/20">
            {item.tag}
          </span>
        </div>
      </div>
      <div className="sticky-note-text mt-2.5 flex items-center justify-between text-xs px-1 text-[#D8D1C2]">
        <span className="sticky-note-label font-serif tracking-wide truncate pr-2">{item.note}</span>
        <span className="sticky-note-dot w-1.5 h-1.5 rounded-full bg-[#67685D] flex-shrink-0" />
      </div>
    </div>
  );
};

const StickyGallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return GALLERY_ITEMS;
    }
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Distribute items into 3 columns for balanced masonry layout
  const cols = useMemo(() => {
    const columns: GalleryItem[][] = [[], [], []];
    filteredItems.forEach((item, i) => {
      columns[i % 3].push(item);
    });
    return columns;
  }, [filteredItems]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  // GSAP reveal animation on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".sticky-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );

        const header = sectionRef.current?.querySelector(".sticky-gallery-header");
        if (header) {
          gsap.fromTo(
            header,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: header, start: "top 85%", once: true },
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

  const activeLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section ref={sectionRef} id="gallery" className="sticky-gallery-section scroll-mt-20 py-16 px-4 sm:px-8">
      {/* Header */}
      <div className="sticky-gallery-header max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-6 h-[1px] bg-[#67685D]" />
          <p className="sticky-eyebrow text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8D8B82]">
            Visual Journal
          </p>
          <span className="w-6 h-[1px] bg-[#67685D]" />
        </div>
        <h2 className="sticky-title font-serif text-3xl sm:text-5xl text-[#F1EDE3] tracking-tight">
          Our <span className="sticky-gradient-text text-[#D8D1C2]">Story Wall</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#8D8B82] mt-3 font-sans">
          Curated archive of {GALLERY_ITEMS.length} original photographs · Click any photo for full-screen view
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map((cat) => {
          const count =
            cat === "All"
              ? GALLERY_ITEMS.length
              : GALLERY_ITEMS.filter((i) => i.category === cat).length;
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-300 border ${
                isActive
                  ? "bg-[#F1EDE3] text-[#080B09] border-[#F1EDE3] font-semibold shadow-md"
                  : "bg-white/[0.03] text-[#8D8B82] border-[#F1EDE3]/15 hover:border-[#F1EDE3]/40 hover:text-[#F1EDE3]"
              }`}
            >
              {cat} <span className="opacity-60 text-[10px]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* 3-Column Masonry Story Wall */}
      <div className="sticky-columns-wrap">
        {cols.map((colItems, colIdx) => (
          <div key={colIdx} className="sticky-column">
            {colItems.map((item) => {
              const fullIndex = filteredItems.findIndex((fi) => fi.id === item.id);
              return (
                <StickyCard
                  key={item.id}
                  item={item}
                  onClick={() => setLightboxIndex(fullIndex)}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Lightbox Full-screen Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-6xl flex items-center justify-between py-3 px-4 text-[#F1EDE3] z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#8D8B82]">
                {activeLightboxItem.category} · {activeLightboxItem.tag}
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-[#F1EDE3]">
                {activeLightboxItem.note}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-sans text-[#8D8B82]">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#F1EDE3] flex items-center justify-center transition-colors"
                aria-label="Close photo"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Main Photo Container */}
          <div
            className="relative flex-1 w-full max-w-6xl flex items-center justify-center my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
                )
              }
              className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all duration-200"
              aria-label="Previous photo"
            >
              ❮
            </button>

            {/* Photo */}
            <div className="max-h-[82vh] max-w-full flex items-center justify-center overflow-hidden rounded-xl shadow-2xl">
              <picture>
                <source srcSet={activeLightboxItem.full} type="image/webp" />
                <img
                  src={activeLightboxItem.full}
                  alt={activeLightboxItem.note}
                  className="max-h-[82vh] w-auto max-w-full object-contain rounded-xl"
                  onError={(e) => {
                    if (e.currentTarget.src !== activeLightboxItem.img) {
                      e.currentTarget.src = activeLightboxItem.img;
                    }
                  }}
                />
              </picture>
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
              }
              className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all duration-200"
              aria-label="Next photo"
            >
              ❯
            </button>
          </div>

          {/* Bottom Caption / Controls hint */}
          <div
            className="py-2 text-[11px] text-[#8D8B82] font-sans flex items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white text-[10px]">ESC</kbd> to close</span>
            <span>·</span>
            <span>Use <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white text-[10px]">←</kbd> <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white text-[10px]">→</kbd> to navigate</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default StickyGallery;
