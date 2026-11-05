import React, { useState } from "react";

const FAQS = [
  {
    q: "What type of work do you specialise in?",
    a: "Event videography & photography, fashion and bridal content, Instagram Reels, short-form video editing, and color grading on DaVinci Resolve. I've worked across corporate events, cultural galas, bridal campaigns, and social media content — from Calicut to Dubai."
  },
  {
    q: "Are you available for shoots outside Kerala and Dubai?",
    a: "Yes, absolutely. I'm based between Calicut, Kerala and Dubai, UAE, and I'm fully available for shoots anywhere internationally. Travel logistics are always coordinated in advance."
  },
  {
    q: "What's your post-production setup?",
    a: "My primary editing tool is DaVinci Resolve (Advanced). I handle full color correction, color grading, sound design, and reel creation in-house. For short-form content, I also use CapCut for rapid-turnaround social media content."
  },
  {
    q: "How fast do you deliver content?",
    a: "For event highlights and social media reels, I deliver fast-turnaround edits — often within 24 to 72 hours depending on scope. Full post-production projects with grading and sound design are typically delivered within 1–2 weeks."
  },
  {
    q: "Can you manage our social media content end-to-end?",
    a: "Yes. Beyond shooting and editing, I have a background in digital marketing — including Meta Ads, content scheduling, and social media strategy. I can produce, edit, and optimise content for Instagram and other platforms."
  },
  {
    q: "How do we get started?",
    a: "Simply reach out via the contact form, WhatsApp (+971 56 870 9412), or Instagram (@adilmubarackk). Let me know your project type, dates, and location — and I'll get back to you within 24 hours."
  },
];

const ProcessFaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 sm:py-24 px-5 sm:px-8 bg-[#060908] scroll-mt-20">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-[#67685D]" />
            <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8D8B82]">
              Have Questions?
            </p>
            <span className="w-6 h-[1px] bg-[#67685D]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F1EDE3] font-normal tracking-tight">
            Frequently Asked <span className="italic text-[#C8BFB0]">Questions</span>
          </h2>
          <p className="text-sm text-[#67685D] font-sans mt-4 max-w-sm mx-auto leading-relaxed">
            Everything you need to know before we work together.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-2.5">
          {FAQS.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#F1EDE3]/20 bg-[#0D100E]"
                    : "border-[#F1EDE3]/[0.06] bg-[#0D100E] hover:border-[#F1EDE3]/15"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                >
                  <span className="font-sans font-medium text-sm text-[#F1EDE3] leading-snug">{f.q}</span>
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 text-sm ${
                      isOpen
                        ? "border-[#F1EDE3]/40 text-[#F1EDE3] rotate-45"
                        : "border-[#F1EDE3]/15 text-[#8D8B82]"
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <p className="px-5 pb-5 text-[#8D8B82] text-[13px] leading-relaxed font-sans border-t border-[#F1EDE3]/[0.06] pt-4">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-[#67685D] text-xs font-sans mb-3">Still have questions?</p>
          <a
            href="https://wa.me/971568709412?text=Hi%20Adil,%20I%20have%20a%20question%20about%20your%20work."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold uppercase tracking-widest text-[#D8D1C2] border border-[#F1EDE3]/15 hover:border-[#F1EDE3]/40 px-5 py-2.5 rounded-full transition-all duration-300 hover:text-[#F1EDE3]"
          >
            <svg className="w-3.5 h-3.5 fill-current text-[#25D366]" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
            </svg>
            Ask on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProcessFaqSection;
