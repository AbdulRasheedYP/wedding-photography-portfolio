import React, { useState } from "react";

interface LegalModalContent {
  title: string;
  subtitle: string;
  sections: { heading: string; body: string }[];
}

const LEGAL_DOCS: Record<string, LegalModalContent> = {
  terms: {
    title: "Terms & Conditions",
    subtitle: "Booking Guidelines, Creative Process & Deliverables",
    sections: [
      {
        heading: "1. Booking & Date Reservation",
        body: "Dates are reserved on mutual agreement upon receipt of an advance booking deposit. Because I take on a limited number of projects to give each story my full creative attention, the deposit secures your calendar slot exclusively.",
      },
      {
        heading: "2. Creative Vision & Style",
        body: "Every project is crafted with my personal visual aesthetic — natural light, cinematic pacing, and nuanced color grading. Bookings are made based on trust in this creative direction and storytelling approach.",
      },
      {
        heading: "3. Delivery Timelines",
        body: "Social media edits and reels are typically delivered within 7 to 14 business days. Full wedding films, event highlights, and complete photo series are delivered within 4 to 6 weeks, allowing time for meticulous editing and color polish.",
      },
      {
        heading: "4. Review & Refinements",
        body: "You will receive a private preview link for feedback. Each project includes a consolidated review round for music sync, select shot adjustments, and minor trim requests prior to final 4K master export.",
      },
      {
        heading: "5. Travel & Destination Logistics",
        body: "For shoots outside Calicut or across Kerala, other states, and international destinations, travel and stay logistics are coordinated transparently with the client in advance.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "Client Discretion, Media Usage & Personal Information",
    sections: [
      {
        heading: "1. Personal Information",
        body: "Your contact details (name, email, phone/WhatsApp) shared via the contact form or direct message are used strictly for project inquiries, shoot logistics, and communication. Your information is never sold, shared, or used for spam.",
      },
      {
        heading: "2. Portfolio & Social Media Display",
        body: "As a visual creator, selected photographs or short cinematic clips may be featured on this portfolio or Instagram to showcase my work. If you prefer your wedding, shoot, or event to remain completely private, simply let me know beforehand and your request will be fully respected.",
      },
      {
        heading: "3. Private Events & Client Discretion",
        body: "Strict discretion is maintained for intimate family ceremonies, private functions, and brand projects. Any requested non-disclosure (NDA) or delayed release dates will be completely honored.",
      },
      {
        heading: "4. File Archival & Safe Storage",
        body: "Final delivered high-resolution photo sets and video edits are kept safely backed up for at least 6 months following handover, giving you ample time to download and preserve your files.",
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
      <footer className="py-10 sm:py-12 px-5 sm:px-8 bg-black border-t border-white/10 relative z-10 text-[#F1EDE3]">
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
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#141414] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl text-[#F1EDE3]"
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
                className="px-6 py-2.5 rounded-full bg-[#F1EDE3] text-black font-display font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md"
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
