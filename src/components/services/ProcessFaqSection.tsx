import React from "react";

const FAQS = [
  {
    q: "How would you describe your photography style?",
    a: "Candid, emotional, and timeless. I don't believe in stiff posing or intrusive directing. My goal is to capture your day naturally as it unfolds — the quiet glances, genuine laughter, happy tears, and celebration."
  },
  {
    q: "Do you travel for destination weddings?",
    a: "Yes, absolutely! Based in Kerala, I regularly travel across India, to the UAE, and worldwide. Travel logistics and accommodation are seamlessly coordinated for every destination."
  },
  {
    q: "How far in advance should we reserve our date?",
    a: "Because I take on a limited number of weddings each season to give each couple my full artistic devotion, most couples book 3 to 6 months in advance."
  },
  {
    q: "When and how will our photos and films be delivered?",
    a: "You will receive a curated set of preview photographs within 10–14 days. The complete high-resolution gallery and 4K cinema film are delivered within 6 to 8 weeks."
  },
  {
    q: "How do we confirm our booking?",
    a: "A 30% retainer along with a simple digital agreement reserves your date exclusively on my calendar. The remainder is scheduled around your wedding milestones."
  },
];

const ProcessFaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-24 px-5 sm:px-8 bg-[#080B09] scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#A8A499] mb-2">
            The Experience
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#F1EDE3] font-normal tracking-wide">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#8D8B82] font-sans mt-3">
            Everything you need to know about having me preserve your wedding story.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <details
              key={i}
              className="bg-[#111412] border border-[#F1EDE3]/5 hover:border-[#F1EDE3]/15 transition-colors p-5 rounded-2xl group [&_summary::-webkit-details-marker]:hidden cursor-pointer"
            >
              <summary className="flex items-center justify-between font-sans font-medium text-sm text-[#F1EDE3] select-none">
                <span>{f.q}</span>
                <span className="text-[#A8A499] text-xl ml-4 flex-shrink-0 group-open:rotate-45 transition-transform duration-200">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[#D8D1C2] text-xs leading-relaxed border-t border-[#F1EDE3]/5 pt-3 font-sans">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessFaqSection;
