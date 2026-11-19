import React, { useState, useRef, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleEnd);
      window.addEventListener("touchcancel", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
      window.removeEventListener("touchcancel", handleEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  const startDrag = (clientX: number) => {
    setIsDragging(true);
    handleMove(clientX);
  };

  return (
    <div className={`w-full select-none ${className}`}>
      {/* Slider Viewport */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl cursor-ew-resize group touch-none"
        onMouseDown={(e) => startDrag(e.clientX)}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      >
        {/* Layer 1: After Image (Full background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="eager"
        />

        {/* Layer 2: Before Image (Clipped to left portion) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none max-w-none"
            style={{
              width: containerRef.current
                ? `${containerRef.current.clientWidth}px`
                : "100%",
            }}
          />
        </div>

        {/* Before Label Badge */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] sm:text-xs font-medium tracking-wider uppercase text-neutral-300 border border-white/10 shadow-sm">
            {beforeLabel}
          </span>
        </div>

        {/* After Label Badge */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] sm:text-xs font-medium tracking-wider uppercase text-[#E5A853] border border-[#E5A853]/20 shadow-sm">
            {afterLabel}
          </span>
        </div>

        {/* Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none will-change-[left]"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical white/gold line */}
          <div className="w-[2px] h-full bg-gradient-to-b from-white/90 via-[#E5A853] to-white/90 shadow-[0_0_12px_rgba(229,168,83,0.6)] -translate-x-1/2" />

          {/* Central Handle Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-neutral-900 shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center justify-center border-2 border-[#E5A853] transition-transform duration-150 group-active:scale-110">
            <div className="flex items-center gap-0.5">
              <svg
                className="w-3.5 h-3.5 text-neutral-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <svg
                className="w-3.5 h-3.5 text-neutral-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Caption under slider */}
      <p className="mt-2 text-center text-xs sm:text-sm text-neutral-400 font-sans tracking-wide">
        Same clip. Drag slider to compare color grade.
      </p>
    </div>
  );
};

export default BeforeAfterSlider;
