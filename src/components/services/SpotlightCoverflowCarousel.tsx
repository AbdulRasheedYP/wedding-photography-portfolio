import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ServiceCardItem {
  id: string;
  number: string;
  title: string;
  description?: string;
  img: string;
  tools?: string[];
}

export const DEFAULT_SERVICES: ServiceCardItem[] = [
  {
    id: "videography",
    number: "01",
    title: "Videography & Cinematography",
    description: "Cinematic event, bridal, and promotional video coverage with professional 4K camera operation.",
    img: "/images/services/1.webp",
    tools: ["4K Cinema", "Gimbal", "Drone"],
  },
  {
    id: "photography",
    number: "02",
    title: "Photography & Editorial",
    description: "Editorial portraits, bridal fashion campaigns, and social event stills with natural light mastery.",
    img: "/images/services/2.webp",
    tools: ["Editorial", "Bridal", "Events"],
  },
  {
    id: "reels",
    number: "03",
    title: "Reel Editing & Short-Form",
    description: "Instagram Reels and digital campaign videos with fast-paced cuts and rhythmic sound sync.",
    img: "/images/services/3.webp",
    tools: ["Viral Reels", "CapCut", "Sound Design"],
  },
  {
    id: "colorgrading",
    number: "04",
    title: "Color Correction & Grading",
    description: "High-end post-production workflows on DaVinci Resolve, creating rich cinematic color and brand tonality.",
    img: "/images/services/4.webp",
    tools: ["DaVinci Resolve", "Color Science", "LUTs"],
  },
  {
    id: "fashion",
    number: "05",
    title: "Fashion Shows & Bridal",
    description: "Runway fashion shows and bridal collection launch films designed to elevate brand presence.",
    img: "/images/services/5.webp",
    tools: ["3 Fashion Shows", "Lookbooks", "Runway"],
  },
  {
    id: "social",
    number: "06",
    title: "Meta Ads & Social Content",
    description: "Social media content optimization and Meta Ads campaign execution to drive audience reach.",
    img: "/images/services/6.webp",
    tools: ["Meta Ads", "SMM Audits", "WordPress"],
  },
];

interface SpotlightCoverflowCarouselProps {
  cards?: ServiceCardItem[];
  onCardCtaClick?: (card: ServiceCardItem) => void;
  className?: string;
}

export const SpotlightCoverflowCarousel: React.FC<SpotlightCoverflowCarouselProps> = ({
  cards = DEFAULT_SERVICES,
  onCardCtaClick,
  className = "",
}) => {
  // Start on the 3rd card (index 2: "03 | Reel Editing & Short-Form Content")
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const activeIndexRef = useRef<number>(2);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const currentDragRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  const isCenteringRef = useRef<boolean>(false);

  // Sync ref with state for event listeners
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Responsive stepX check (desktop: 230px, mobile: 190px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalCards = cards.length;
  const stepX = isMobile ? 190 : 230;

  // Bounded navigation (stops at first/last card, no repeating)
  const nextCard = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, totalCards - 1));
  }, [totalCards]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, [totalCards]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevCard();
      if (e.key === "ArrowRight") nextCard();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextCard, prevCard]);

  // Mouse Wheel & Trackpad scroll listener
  // Scrolling down (deltaY > 0) -> move to next card (right)
  // Scrolling up (deltaY < 0) -> move to prev card (left)
  // When at last card (card 6), let page scroll down to next section (projects)!
  // When at first card (card 1), let page scroll up to previous section!
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let accumulatedDelta = 0;
    let isCoolingDown = false;
    let cooldownTimer: ReturnType<typeof setTimeout> | null = null;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;

    // Helper to auto-center the carousel cards in the screen viewport when scrolling starts
    const centerCarouselInViewport = () => {
      if (isCenteringRef.current) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const diff = elementCenter - viewportCenter;

      // If cards are more than 40px away from screen center, glide smoothly into center
      if (Math.abs(diff) > 40) {
        isCenteringRef.current = true;
        if (typeof (window as any).__lenis?.scrollTo === "function") {
          (window as any).__lenis.scrollTo(el, {
            offset: -(window.innerHeight - rect.height) / 2,
            duration: 0.55,
            onComplete: () => {
              isCenteringRef.current = false;
            },
          });
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => {
            isCenteringRef.current = false;
          }, 500);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      // 1. Boundary check:
      // If at last card (index 5) and scrolling down -> pass through to scroll page down to projects!
      if (delta > 0 && activeIndexRef.current >= totalCards - 1) {
        return;
      }

      // If at first card (index 0) and scrolling up -> pass through to scroll page up!
      if (delta < 0 && activeIndexRef.current <= 0) {
        return;
      }

      // Auto-center cards in the center of the screen when user starts scrolling
      centerCarouselInViewport();

      // 2. In-between cards: intercept and advance carousel cards horizontally
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function") {
        e.stopImmediatePropagation();
      }

      if (isCoolingDown) return;
      if (Math.abs(delta) < 4) return;

      accumulatedDelta += delta;
      // Faster, snappy threshold
      const threshold = 12;

      if (accumulatedDelta > threshold) {
        if (activeIndexRef.current < totalCards - 1) {
          nextCard();
          accumulatedDelta = 0;
          isCoolingDown = true;
          cooldownTimer = setTimeout(() => {
            isCoolingDown = false;
          }, 160); // 160ms fast fluid transition
        }
      } else if (accumulatedDelta < -threshold) {
        if (activeIndexRef.current > 0) {
          prevCard();
          accumulatedDelta = 0;
          isCoolingDown = true;
          cooldownTimer = setTimeout(() => {
            isCoolingDown = false;
          }, 160); // 160ms fast fluid transition
        }
      }

      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        accumulatedDelta = 0;
      }, 110);
    };

    container.addEventListener("wheel", handleWheel, { passive: false, capture: true });

    return () => {
      container.removeEventListener("wheel", handleWheel, true);
      if (cooldownTimer) clearTimeout(cooldownTimer);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [nextCard, prevCard, totalCards]);

  // Touch / Drag event handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    hasDraggedRef.current = false;
    startXRef.current = clientX;
    currentDragRef.current = 0;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    let delta = clientX - startXRef.current;
    if (Math.abs(delta) > 8) {
      hasDraggedRef.current = true;
    }

    // Elastic resistance when dragging past boundaries
    if (activeIndexRef.current === 0 && delta > 0) {
      delta *= 0.25;
    } else if (activeIndexRef.current === totalCards - 1 && delta < 0) {
      delta *= 0.25;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      currentDragRef.current = delta;
      setDragOffset(delta);
    });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const delta = currentDragRef.current;
    const swipeThreshold = isMobile ? 22 : 32;

    if (delta < -swipeThreshold) {
      nextCard();
    } else if (delta > swipeThreshold) {
      prevCard();
    }

    setDragOffset(0);
    currentDragRef.current = 0;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none py-2 cursor-grab active:cursor-grabbing ${className}`}
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      {/* 3D Carousel Stage */}
      <div className="relative h-[410px] sm:h-[450px] w-full max-w-5xl mx-auto flex items-center justify-center overflow-visible">
        {/* Floating Navigation Arrows (Disabled at boundaries) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevCard();
          }}
          disabled={activeIndex === 0}
          aria-label="Previous service"
          className={`absolute left-1 sm:left-4 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#121212]/90 hover:bg-[#1A1A1A] border border-white/10 hover:border-[#DDD6C8]/60 text-[#DDD6C8] hover:text-white backdrop-blur-md flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.8)] transition-all duration-200 cursor-pointer ${
            activeIndex === 0
              ? "opacity-20 pointer-events-none border-white/5 text-white/20"
              : "hover:scale-105 active:scale-95"
          }`}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextCard();
          }}
          disabled={activeIndex === totalCards - 1}
          aria-label="Next service"
          className={`absolute right-1 sm:right-4 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#121212]/90 hover:bg-[#1A1A1A] border border-white/10 hover:border-[#DDD6C8]/60 text-[#DDD6C8] hover:text-white backdrop-blur-md flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.8)] transition-all duration-200 cursor-pointer ${
            activeIndex === totalCards - 1
              ? "opacity-20 pointer-events-none border-white/5 text-white/20"
              : "hover:scale-105 active:scale-95"
          }`}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Carousel Cards */}
        {cards.map((card, i) => {
          // Linear relative offset without repeating
          const diff = i - activeIndex;

          const isActive = diff === 0;
          const absDiff = Math.abs(diff);

          // Calculate transform properties
          const dynamicOffset = isDragging ? dragOffset : 0;
          const translateX = diff * stepX + dynamicOffset;

          // Scaling & Opacity based on distance from center
          let scale = 1.05;
          let opacity = 1;
          let zIndex = 30;

          if (!isActive) {
            scale = Math.max(0.65, 0.78 - (absDiff - 1) * 0.16);
            opacity = Math.max(0, 0.38 - (absDiff - 1) * 0.22);
            zIndex = Math.max(1, 20 - absDiff * 5);
          }

          // If too far off-screen, keep invisible
          if (absDiff > 2) {
            opacity = 0;
            zIndex = 0;
          }

          return (
            <div
              key={card.id}
              onClick={() => {
                if (!hasDraggedRef.current && !isActive) {
                  setActiveIndex(i);
                }
              }}
              style={{
                transform: `translate3d(calc(-50% + ${translateX}px), -50%, 0) scale(${scale})`,
                opacity,
                zIndex,
                transition: isDragging
                  ? "none"
                  : "transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease, border-color 300ms ease",
              }}
              className={`absolute left-1/2 top-1/2 w-[260px] h-[345px] sm:w-[275px] sm:h-[365px] rounded-2xl overflow-hidden cursor-pointer will-change-transform transform-gpu backface-hidden ${
                isActive
                  ? "border border-[#DDD6C8]/60 shadow-[0_25px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(221,214,200,0.18)] bg-[#141414]"
                  : "border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.7)] hover:border-white/20 bg-[#121212]"
              }`}
            >
              {/* Background Image with Dark Tint */}
              <img
                src={card.img}
                alt={card.title}
                className={`w-full h-full object-cover filter transition-transform duration-700 ease-out ${
                  isActive
                    ? "brightness-[0.75] contrast-[1.08] scale-105"
                    : "brightness-[0.5] contrast-[1.05]"
                }`}
                loading="lazy"
                decoding="async"
                draggable={false}
              />

              {/* Subtle Luxury Gradient Overlay (from black/90 via black/35 to black/50) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/55 pointer-events-none" />

              {/* Ambient Active Card Champagne Sheen */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-tr from-[#DDD6C8]/[0.08] via-transparent to-[#DDD6C8]/[0.05] pointer-events-none" />
              )}

              {/* Top-Left: Mono-Spaced Index Number */}
              <div className="absolute top-4 left-4 z-10">
                <span className="font-mono text-xs sm:text-[13px] font-semibold tracking-widest text-[#DDD6C8] bg-black/65 backdrop-blur-md px-3 py-1 rounded-full border border-[#DDD6C8]/30 select-none shadow-md">
                  {card.number}
                </span>
              </div>

              {/* Bottom Content Area: Bold Service Title & Tool Badges */}
              <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#F1EDE3] leading-snug mb-2.5 drop-shadow-md">
                  {card.title}
                </h3>

                {/* Tool Pill Badges */}
                {card.tools && card.tools.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {card.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[8.5px] sm:text-[9px] font-sans font-semibold uppercase tracking-wider text-[#D8D1C2] bg-white/[0.07] border border-white/10 px-2.5 py-0.5 rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Horizontal Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-6 z-30 relative">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeIndex === i
                ? "w-8 h-2 bg-[#DDD6C8] shadow-[0_0_12px_rgba(221,214,200,0.45)]"
                : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SpotlightCoverflowCarousel;
