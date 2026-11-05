import React from "react";
import { Testimonial } from "../../types";

interface Props {
  testimonials: Testimonial[];
}

const StarIcon: React.FC = () => (
  <svg className="w-2.5 h-2.5 fill-[#D8D1C2]" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TestimonialsSection: React.FC<Props> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null;

  // Duplicate list to guarantee a mathematically seamless, non-stop loop
  const marqueeList = [...testimonials, ...testimonials];

  return (
    <section className="py-16 sm:py-20 bg-[#080B09] text-[#F1EDE3] overflow-hidden relative">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-10 text-center">
        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#8D8B82] mb-2">
          Kind Words
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#F1EDE3] font-normal tracking-wide">
          Love Notes <span className="text-[#D8D1C2] italic">from Couples</span>
        </h2>
      </div>

      {/* Marquee Row Container with Left & Right Vignette Fades */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Left Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#080B09] to-transparent z-20" />
        
        {/* Right Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#080B09] to-transparent z-20" />

        {/* Continuous Horizontal Ticker (1 Line) */}
        <div className="animate-marquee flex gap-4 sm:gap-5 py-2 px-3">
          {marqueeList.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="w-[260px] sm:w-[320px] lg:w-[340px] h-[170px] sm:h-[185px] flex-shrink-0 bg-[#111412] border border-[#F1EDE3]/[0.08] hover:border-[#F1EDE3]/25 rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-md cursor-default group"
            >
              {/* Star Rating & Quote mark */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, j) => (
                    <StarIcon key={j} />
                  ))}
                </div>
                <span className="font-serif text-xl text-[#F1EDE3]/20 group-hover:text-[#F1EDE3]/40 transition-colors leading-none select-none">
                  “
                </span>
              </div>

              {/* Review Text - Exact 3-line balanced height */}
              <p className="text-[#D8D1C2]/90 text-[12px] sm:text-[12.5px] leading-relaxed font-sans line-clamp-3 my-auto">
                "{t.text}"
              </p>

              {/* Client Profile */}
              <div className="flex items-center gap-3 pt-2.5 border-t border-[#F1EDE3]/[0.06]">
                <div className="w-8 h-8 rounded-full bg-[#F1EDE3] text-[#080B09] flex items-center justify-center font-serif font-bold text-xs flex-shrink-0 shadow-sm">
                  {t.client_name?.[0]?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-serif font-semibold text-[13.5px] text-[#F1EDE3] leading-tight truncate">
                    {t.client_name}
                  </p>
                  <p className="text-[#8D8B82] text-[10px] font-sans truncate mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
