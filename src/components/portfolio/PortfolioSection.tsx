import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project, Category } from "../../types";

gsap.registerPlugin(ScrollTrigger);

interface SlideItem {
  id: string | number;
  img: string;
  title: string;
  category: string;
  project?: Project;
}

const FALLBACK_SLIDES: SlideItem[] = [
  { id: "f1", img: "/images/gallery/thumbnails/2W6A3149.webp",    title: "The Royal Knot",         category: "Wedding" },
  { id: "f2", img: "/images/gallery/thumbnails/2W6A8657.webp",    title: "Calicut Twilight Shore", category: "Fashion" },
  { id: "f3", img: "/images/gallery/thumbnails/DSC00565.webp",    title: "Bridal Splendor in Red", category: "Wedding" },
  { id: "f4", img: "/images/gallery/thumbnails/DSC04238.webp",    title: "Golden Hour Lehenga",    category: "Wedding" },
  { id: "f5", img: "/images/gallery/thumbnails/DSC02662.webp",    title: "Kerala Backwaters",      category: "Aerial" },
  { id: "f6", img: "/images/gallery/thumbnails/IMG_3124.webp",    title: "Kashmir Valley Vista",   category: "Travel" },
  { id: "f7", img: "/images/gallery/thumbnails/DSCF0445.webp",    title: "Dubai Marina Twilight",  category: "Commercial" },
  { id: "f8", img: "/images/gallery/thumbnails/IMG_2688.webp",    title: "Director at Dusk",       category: "BTS" },
];

interface Props {
  projects: Project[];
  categories: Category[];
  onSelectProject: (project: Project) => void;
}

const PortfolioSection: React.FC<Props> = ({ projects, onSelectProject }) => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides: SlideItem[] = projects.length > 0
    ? projects.map((p) => ({
        id: p.id,
        img: p.thumbnail,
        title: p.title,
        category: p.category?.name || "Film",
        project: p,
      }))
    : FALLBACK_SLIDES;

  const totalSlides = slides.length;

  const getVisibleSlides = useCallback(() => {
    if (typeof window === "undefined") return 4;
    const vw = window.innerWidth;
    if (vw < 640) return 1;
    if (vw < 1024) return 2;
    return 4;
  }, []);

  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides);
  const maxIndex = Math.max(0, totalSlides - visibleSlides);

  useEffect(() => {
    const handleResize = () => {
      const v = getVisibleSlides();
      setVisibleSlides(v);
      const newMax = Math.max(0, totalSlides - v);
      setCurrent((prev) => Math.min(prev, newMax));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [totalSlides, getVisibleSlides]);

  const goTo = useCallback((index: number) => {
    setCurrent(Math.max(0, Math.min(index, maxIndex)));
  }, [maxIndex]);

  const next = useCallback(() => {
    setCurrent((prevVal) => (prevVal >= maxIndex ? 0 : prevVal + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((prevVal) => (prevVal <= 0 ? maxIndex : prevVal - 1));
  }, [maxIndex]);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;
    
    // Check if horizontal swipe was dominant and beyond 35px threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX > 0) {
        next();
      } else {
        prev();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Faster Auto-Advance (1.9s) & Immediately Rewinds to Left when Full on the Side
  useEffect(() => {
    if (isHovered || !isInView) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrent((prevVal) => {
        // When side is full (reaches maxIndex), immediately loops back to left (0)
        if (prevVal >= maxIndex) {
          return 0;
        }
        return prevVal + 1;
      });
    }, 1900);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, isInView, maxIndex]);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!trackRef.current) return;
    
    const slidePercent = 100 / visibleSlides;

    gsap.to(trackRef.current, {
      x: `${-current * slidePercent}%`,
      duration: current === 0 ? 0.75 : 0.5,
      ease: current === 0 ? "power3.inOut" : "power2.out",
      force3D: true, // Forces GPU acceleration to prevent horizontal slider stutter
    });
  }, [current, visibleSlides]);

  useEffect(() => {
    // Skip GSAP layout calculation on mobile
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const header = sectionRef.current?.querySelector(".gallery-header");
        if (header) {
          gsap.fromTo(header,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 1, ease: "power3.out",
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

  return (
    <section ref={sectionRef} id="work" className="py-14 sm:py-18 lg:py-16 bg-[#080B09] scroll-mt-20 overflow-hidden">
      <div className="gallery-header max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-5 h-[1px] bg-[#67685D]" />
            <p className="text-[10px] font-display font-semibold uppercase tracking-[0.25em] text-[#8D8B82]">
              Selected Portfolio
            </p>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#F1EDE3] uppercase leading-none">
            Our Gallery
          </h2>
        </div>
        <div className="flex items-center gap-2.5">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-[#F1EDE3]/15 flex items-center justify-center hover:border-[#F1EDE3]/40 hover:text-[#F1EDE3] hover:bg-white/5 transition-all duration-300 text-[#8D8B82]" aria-label="Previous slide">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={next} className="w-10 h-10 rounded-full border border-[#F1EDE3]/15 flex items-center justify-center hover:border-[#F1EDE3]/40 hover:text-[#F1EDE3] hover:bg-white/5 transition-all duration-300 text-[#8D8B82]" aria-label="Next slide">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div
        className="relative px-5 sm:px-8 max-w-7xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={trackRef} className="flex transition-none" style={{ willChange: "transform" }}>
          {slides.map((slide) => (
            <div key={slide.id} className="gallery-slide flex-shrink-0 px-2 sm:px-2.5 w-full sm:w-1/2 lg:w-1/4">
              <div
                className="relative overflow-hidden rounded-2xl bg-[#111412] border border-[#F1EDE3]/10 hover:border-[#F1EDE3]/30 cursor-pointer group shadow-lg transition-all duration-500"
                style={{ aspectRatio: "4 / 5" }}
                onClick={() => slide.project && onSelectProject(slide.project as Project)}
              >
                <img src={slide.img} alt={slide.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-4.5">
                  <p className="text-[#D8D1C2]/60 text-[9px] font-display font-medium uppercase tracking-[0.2em] mb-1">{slide.category}</p>
                  <h3 className="text-[#F1EDE3] font-serif font-normal text-base sm:text-lg group-hover:text-white transition-colors duration-300 leading-snug">{slide.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots matching actual slide positions */}
      <div className="flex items-center justify-center gap-1.5 mt-6 sm:mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`transition-all duration-300 rounded-full ${i === current ? "w-6 h-1.5 bg-[#F1EDE3]" : "w-1.5 h-1.5 bg-[#F1EDE3]/20 hover:bg-[#F1EDE3]/40"}`} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
