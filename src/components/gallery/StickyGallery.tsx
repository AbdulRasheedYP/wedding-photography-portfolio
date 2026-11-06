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
      className="sticky-card cursor-pointer transition-transform duration-300 hover:scale-[1.02] min-w-0 w-full"
      style={{ transform: `rotate(${item.rotation}deg)` }}
      onClick={onClick}
    >
      <div className="sticky-tape-bar" />
      <div className="sticky-img-wrap relative overflow-hidden rounded-lg bg-[#0a0a0a] min-w-0 w-full">
        {/* Shimmer skeleton placeholder */}
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#1f1f1f] to-[#141414] animate-pulse pointer-events-none" />
        )}
        <img
          src={item.thumb}
          alt={item.note}
          className={`sticky-img w-full h-full object-cover transition-all duration-500 hover:scale-105 ${
            loaded ? "opacity-100 filter-none" : "opacity-0 scale-95"
          }`}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
        <div className="sticky-img-overlay absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="sticky-hover-tag px-3 py-1 bg-black/70 text-[#F1EDE3] text-[10px] font-sans uppercase tracking-widest rounded border border-white/20">
            {item.tag}
          </span>
        </div>
      </div>
      <div className="sticky-note-text mt-2 sm:mt-2.5 flex items-center justify-between text-xs px-1 text-[#D8D1C2] min-w-0 w-full">
        <span className="sticky-note-label font-serif tracking-wide truncate pr-2 min-w-0 flex-1">{item.note}</span>
        <span className="sticky-note-dot w-1.5 h-1.5 rounded-full bg-[#67685D] flex-shrink-0" />
      </div>
    </div>
  );
};

const INITIAL_VISIBLE_COUNT = 30;

const StickyGallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return GALLERY_ITEMS;
    }
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [selectedCategory]);

  // Only take visibleCount items for display
  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  // Responsive column count: 2 on mobile/tablet (<768px), 3 on desktop
  const [columnCount, setColumnCount] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? 2 : 3
  );

  useEffect(() => {
    const handleResize = () => {
      const nextCount = window.innerWidth < 768 ? 2 : 3;
      setColumnCount((prev) => (prev !== nextCount ? nextCount : prev));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Distribute items dynamically into columns so both sides are perfectly balanced
  const cols = useMemo(() => {
    const columns: GalleryItem[][] = Array.from({ length: columnCount }, () => []);
    displayedItems.forEach((item, i) => {
      columns[i % columnCount].push(item);
    });
    return columns;
  }, [displayedItems, columnCount]);

  // Refresh GSAP scroll metrics when item count changes
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [displayedItems.length]);

  const handleViewMore = () => {
    setVisibleCount((prev) => {
      const next = prev + 30;
      if (filteredItems.length - next <= 10) {
        return filteredItems.length;
      }
      return next;
    });
  };

  // Idle prefetch: pre-warm images in browser memory during idle CPU time
  useEffect(() => {
    const idlePrefetch = () => {
      const toWarm = displayedItems.slice(0, 15);
      toWarm.forEach((item) => {
        const img = new Image();
        img.src = item.thumb;
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number }).requestIdleCallback(idlePrefetch, { timeout: 2000 });
      return () => (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(idlePrefetch, 800);
      return () => clearTimeout(timer);
    }
  }, [displayedItems]);

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

  // Keep all gallery cards immediately visible with zero opacity lag

  const activeLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section ref={sectionRef} id="gallery" className="sticky-gallery-section scroll-mt-20 py-12 sm:py-16 px-3 sm:px-8 w-full overflow-hidden">
      {/* Header */}
      <div className="sticky-gallery-header max-w-4xl mx-auto text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-6 h-[1px] bg-[#67685D]" />
          <p className="sticky-eyebrow text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8D8B82]">
            Visual Journal
          </p>
          <span className="w-6 h-[1px] bg-[#67685D]" />
        </div>
        <h2 className="sticky-title font-serif text-3xl sm:text-5xl text-[#F1EDE3] tracking-tight">
          The <span className="sticky-gradient-text text-[#D8D1C2]">Visual Wall</span>
        </h2>
      </div>

      {/* Category Filter Pills — Smooth Horizontal Scroll on Mobile, Centered Wrap on Desktop */}
      <div className="w-full max-w-4xl mx-auto mb-8 sm:mb-12">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-2 sm:px-0 sm:flex-wrap sm:justify-center">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? GALLERY_ITEMS.length
                : GALLERY_ITEMS.filter((i) => i.category === cat).length;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                }}
                className={`flex-shrink-0 whitespace-nowrap px-4 py-2 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-sans uppercase tracking-wider transition-all duration-200 border cursor-pointer active:scale-95 ${
                  isActive
                    ? "bg-[#F1EDE3] text-black border-[#F1EDE3] font-bold shadow-md scale-[1.02]"
                    : "bg-[#141414] text-[#A8A499] border-white/10 hover:border-white/30 hover:text-[#F1EDE3]"
                }`}
              >
                {cat} <span className="opacity-60 text-[9.5px] ml-1">({count})</span>
              </button>
            );
          })}
        </div>
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

      {/* View More Button */}
      {visibleCount < filteredItems.length && (
        <div className="mt-14 mb-4 flex flex-col items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleViewMore}
            className="group inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-black bg-[#F1EDE3] hover:bg-white transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>View More</span>
            <svg
              className="w-3 h-3 text-black/70 group-hover:translate-y-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <p className="text-[10px] text-[#67685D] font-sans tracking-wide">
            {displayedItems.length} of {filteredItems.length} photos
          </p>
        </div>
      )}

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
              <img
                src={activeLightboxItem.full}
                alt={activeLightboxItem.note}
                className="max-h-[82vh] w-auto max-w-full object-contain rounded-xl"
              />
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
