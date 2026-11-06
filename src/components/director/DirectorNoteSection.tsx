import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  onCommissionClick?: () => void;
}

const DirectorNoteSection: React.FC<Props> = ({ onCommissionClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Note remains immediately 100% visible with zero opacity lag

  return (
    <section
      ref={sectionRef}
      id="director"
      className="py-16 sm:py-28 px-5 sm:px-10 bg-[#060908] relative overflow-hidden scroll-mt-20 flex items-center justify-center"
    >
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#67685D]/[0.07] rounded-full blur-[160px] pointer-events-none" />

      <div ref={containerRef} className="max-w-4xl mx-auto text-center relative z-10">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-7 sm:mb-10">
          <span className="w-6 h-[1px] bg-[#67685D]" />
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-[#8D8B82]">
            The Artist's Note
          </span>
          <span className="w-6 h-[1px] bg-[#67685D]" />
        </div>

        {/* Adil's personal quote */}
        <blockquote className="font-serif text-xl sm:text-3xl lg:text-[2.75rem] text-[#F1EDE3] font-normal leading-[1.4] tracking-tight">
          &ldquo;I don&rsquo;t just film events —{" "}
          <br className="hidden sm:inline" />
          I <span className="italic font-light text-[#C8BFB0]">capture the feeling</span> that lives{" "}
          <br className="hidden sm:inline" />
          in every room, every frame, every breath.&rdquo;
        </blockquote>

        {/* Attribution */}
        <div className="mt-7 sm:mt-10 flex flex-col items-center gap-3">
          <div className="w-[1px] h-6 bg-[#67685D]" />
          <p className="text-[11px] font-sans uppercase tracking-[0.28em] text-[#8D8B82]">
            &mdash; Adil Mubarak, Videographer & Photographer
          </p>
        </div>

        {/* Optional CTA */}
        {onCommissionClick && (
          <button
            onClick={onCommissionClick}
            className="mt-10 sm:mt-12 group inline-flex items-center gap-2 text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#8D8B82] hover:text-[#F1EDE3] transition-colors duration-300 border-b border-[#F1EDE3]/15 hover:border-[#F1EDE3]/50 pb-1"
          >
            Work With Me
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        )}

      </div>
    </section>
  );
};

export default DirectorNoteSection;
