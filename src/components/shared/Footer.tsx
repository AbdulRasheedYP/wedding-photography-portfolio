import React, { useState } from "react";

interface LegalModalContent {
  title: string;
  subtitle: string;
  sections: { heading: string; body: string }[];
}

const LEGAL_DOCS: Record<string, LegalModalContent> = {
  terms: {
    title: "Terms & Conditions",
    subtitle: "Production Agreements, Booking Policies & Deliverables",
    sections: [
      {
        heading: "1. Reservation & Deposit",
        body: "A non-refundable 30% retainer confirms your calendar dates across Kerala, UAE, and international destinations.",
      },
      {
        heading: "2. Artistic Discretion",
        body: "Adil Mubarak operates with distinct cinematic and editorial sensibilities. Final decisions regarding editing rhythm and color grading palettes remain at the artist's creative discretion.",
      },
      {
        heading: "3. Delivery Timeline",
        body: "Editorial social teasers are delivered within 14 business days. Full 4K master films and photo galleries are delivered within 6 to 8 weeks post-production.",
      },
      {
        heading: "4. Revisions",
        body: "Clients receive a private link for one consolidated round of timestamped refinement requests prior to master export.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "Discretion, Image Protection & Data Safeguards",
    sections: [
      {
        heading: "1. Confidentiality & NDAs",
        body: "We respect the discretion of our clients. Private ceremonies, royal celebrations, and celebrity events can request strict non-disclosure (NDA) coverage prior to filming.",
      },
      {
        heading: "2. Data Protection",
        body: "Personal information gathered through inquiry forms is utilized solely for project correspondence, travel logistics, and invoicing.",
      },
      {
        heading: "3. Archival Storage",
        body: "Raw cinema footage and edited 4K masters are maintained in dual-redundant cold storage for 12 months following project handover.",
      },
    ],
  },
};

const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <footer className="py-10 sm:py-12 px-5 sm:px-8 bg-[#080B09] border-t border-[#F1EDE3]/10 relative z-10 text-[#F1EDE3]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-[#F1EDE3]">
              Adil Mubarak
            </span>
            <span className="hidden sm:inline-block text-[#8D8B82]/40">•</span>
            <span className="text-xs font-sans text-[#8D8B82]">
              &copy; {new Date().getFullYear()} All rights reserved.
            </span>
          </div>

          {/* Essential Legal & Contact Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-sans text-[#8D8B82]">
            <button
              onClick={() => setActiveModal("terms")}
              className="py-1 hover:text-[#F1EDE3] transition-colors"
            >
              Terms &amp; Conditions
            </button>
            <button
              onClick={() => setActiveModal("privacy")}
              className="py-1 hover:text-[#F1EDE3] transition-colors"
            >
              Privacy Policy
            </button>
            <a
              href="mailto:adilmubarack03@gmail.com"
              className="py-1 hover:text-[#F1EDE3] transition-colors"
            >
              Email
            </a>
            <a
              href="https://instagram.com/adilmubarackk"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 hover:text-[#F1EDE3] transition-colors"
            >
              Instagram
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={() => scrollToSection("hero")}
            className="py-1 inline-flex items-center gap-1.5 text-xs font-sans text-[#8D8B82] hover:text-[#F1EDE3] transition-colors group"
          >
            <span>Back to top</span>
            <span className="transform group-hover:-translate-y-0.5 transition-transform duration-200">&uarr;</span>
          </button>
        </div>
      </footer>

      {/* Interactive Luxury Legal & Policy Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#111412] border border-[#F1EDE3]/20 rounded-3xl p-6 sm:p-10 shadow-2xl text-[#F1EDE3]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center hover:bg-white/5 transition-all text-[#8D8B82] hover:text-[#F1EDE3]"
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2]">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <span className="text-[10px] font-display font-bold uppercase tracking-[0.25em] text-[#8D8B82] block mb-1">
                Adil Mubarak Legal
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F1EDE3] font-normal tracking-wide">
                {LEGAL_DOCS[activeModal]?.title}
              </h3>
              <p className="text-xs text-[#8D8B82] font-sans mt-1">
                {LEGAL_DOCS[activeModal]?.subtitle}
              </p>
            </div>

            {/* Policy Sections */}
            <div className="space-y-5 border-t border-white/10 pt-5">
              {LEGAL_DOCS[activeModal]?.sections.map((sec, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h4 className="font-display font-semibold text-sm text-[#D8D1C2] tracking-wide">
                    {sec.heading}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#8D8B82] font-sans leading-relaxed">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Bottom Action */}
            <div className="mt-8 pt-5 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-full bg-[#F1EDE3] text-[#080B09] font-display font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
