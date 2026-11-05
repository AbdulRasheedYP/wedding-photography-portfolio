import React from "react";

interface Organization {
  id: string;
  name: string;
  subtitle: string;
  type: string;
  typeBadgeColor: string;
  period: string;
  location: string;
  role: string;
  description: string;
  deliverables: string[];
  logo: React.ReactNode;
}

const ORGANIZATIONS: Organization[] = [
  {
    id: "jovial-events",
    name: "Jovial Events",
    subtitle: "Luxury Event Management & Production",
    type: "Current Company",
    typeBadgeColor: "bg-[#25D366]/10 text-[#25D366] border-[#25D366]/30",
    period: "2026 – Present",
    location: "Dubai, United Arab Emirates",
    role: "Photographer · Videographer · Reel Editor",
    description:
      "Leading photography and videography for corporate galas, cultural events, and high-profile social gatherings across the UAE. Producing fast-turnaround content tailored for international marketing and social media campaigns.",
    deliverables: ["Corporate Galas", "Cultural Events", "Event Photography", "Fast-Turnaround Reels"],
    logo: (
      <svg viewBox="0 0 160 48" className="h-10 w-auto fill-current text-[#F1EDE3]" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4, 4)">
          <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
          <path d="M12 28L15 15L20 22L25 15L28 28H12Z" fill="currentColor" opacity="0.85" />
          <circle cx="20" cy="11" r="2" fill="currentColor" />
          <circle cx="14" cy="13" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="26" cy="13" r="1.5" fill="currentColor" opacity="0.6" />
        </g>
        <text x="54" y="24" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="17" fontWeight="600" letterSpacing="0.18em">
          JOVIAL
        </text>
        <text x="55" y="37" fontFamily="'Inter', sans-serif" fontSize="7.5" fontWeight="600" letterSpacing="0.32em" opacity="0.5">
          EVENTS · DUBAI
        </text>
      </svg>
    ),
  },
  {
    id: "shobhika-weddings",
    name: "Shobhika Weddings",
    subtitle: "Bridal Wear, Couture & Fashion Shows",
    type: "Previous Company",
    typeBadgeColor: "bg-[#F1EDE3]/10 text-[#D8D1C2] border-[#F1EDE3]/20",
    period: "2024 – 2025",
    location: "Calicut, Kerala",
    role: "Videographer & Content Creator",
    description:
      "Spearheaded promotional video production for premier bridal and festive collections. Filmed and edited 3 full-scale runway fashion shows, handled all post-production color grading on DaVinci Resolve, and built launch campaigns.",
    deliverables: ["3 Runway Fashion Shows", "Bridal Campaigns", "DaVinci Resolve Grading", "Seasonal Launch Reels"],
    logo: (
      <svg viewBox="0 0 170 48" className="h-10 w-auto fill-current text-[#F1EDE3]" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4, 4)">
          <rect x="2" y="2" width="36" height="36" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
          <path
            d="M13 14C13 14 18 11 23 15C28 19 23 23 18 24C13 25 12 29 17 31C22 33 27 29 27 29"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
        <text x="54" y="24" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="17" fontWeight="600" letterSpacing="0.16em">
          SHOBHIKA
        </text>
        <text x="55" y="37" fontFamily="'Inter', sans-serif" fontSize="7.5" fontWeight="600" letterSpacing="0.28em" opacity="0.5">
          WEDDINGS · CALICUT
        </text>
      </svg>
    ),
  },
  {
    id: "quadcubes",
    name: "Quadcubes",
    subtitle: "Digital Marketing & Creative Agency",
    type: "Agency Experience",
    typeBadgeColor: "bg-[#F1EDE3]/10 text-[#D8D1C2] border-[#F1EDE3]/20",
    period: "2023",
    location: "Calicut / Kochi, Kerala",
    role: "Digital Marketing & Media Intern",
    description:
      "Planned and executed high-ROI Meta Ads campaigns, managed social media profiles, performed comprehensive SMM audits, and assisted with Google Ads management and digital content distribution.",
    deliverables: ["Meta Ads Architecture", "SMM Audits", "Social Content Strategy", "Google Ads Operations"],
    logo: (
      <svg viewBox="0 0 160 48" className="h-10 w-auto fill-current text-[#F1EDE3]" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(6, 6)">
          <polygon points="18,4 32,11 18,18 4,11" fill="currentColor" opacity="0.9" />
          <polygon points="4,13 18,20 18,34 4,27" fill="currentColor" opacity="0.5" />
          <polygon points="18,20 32,13 32,27 18,34" fill="currentColor" opacity="0.7" />
        </g>
        <text x="50" y="24" fontFamily="'Inter', sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.08em">
          QUADCUBES
        </text>
        <text x="51" y="37" fontFamily="'Inter', sans-serif" fontSize="7.5" fontWeight="600" letterSpacing="0.26em" opacity="0.5">
          DIGITAL AGENCY · KERALA
        </text>
      </svg>
    ),
  },
  {
    id: "cda-academy",
    name: "CDA Academy",
    subtitle: "Creating Digital Aspirants — Media Institute",
    type: "Training Institute",
    typeBadgeColor: "bg-[#F1EDE3]/10 text-[#D8D1C2] border-[#F1EDE3]/20",
    period: "2023",
    location: "Calicut, Kerala",
    role: "Digital Marketing & Content Strategy Graduate",
    description:
      "Graduated from an intensive, agency-style digital marketing academy. Trained in digital campaign architecture, social media algorithms, visual storytelling, and strategic content syndication.",
    deliverables: ["Digital Marketing Mastery", "Content Syndication", "Campaign Architecture", "Agency-Style Training"],
    logo: (
      <svg viewBox="0 0 160 48" className="h-10 w-auto fill-current text-[#F1EDE3]" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(6, 6)">
          <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
          <text x="18" y="22" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="10" fontWeight="900" fill="currentColor">
            CDA
          </text>
        </g>
        <text x="50" y="24" fontFamily="'Inter', sans-serif" fontSize="15" fontWeight="700" letterSpacing="0.12em">
          CDA ACADEMY
        </text>
        <text x="51" y="37" fontFamily="'Inter', sans-serif" fontSize="7" fontWeight="600" letterSpacing="0.2em" opacity="0.5">
          DIGITAL ASPIRANTS · CALICUT
        </text>
      </svg>
    ),
  },
  {
    id: "cmm-school",
    name: "CMM Higher Secondary",
    subtitle: "Foundational Education & Creative Spark",
    type: "Academic Foundation",
    typeBadgeColor: "bg-[#F1EDE3]/10 text-[#8D8B82] border-white/10",
    period: "2020",
    location: "Calicut, Kerala",
    role: "Higher Secondary Completion",
    description:
      "Completed Higher Secondary education. The formative foundation where the passion for photography, camera work, composition, and visual framing first developed.",
    deliverables: ["Higher Secondary Completed", "Calicut Foundation", "Creative Arts Genesis"],
    logo: (
      <svg viewBox="0 0 160 48" className="h-10 w-auto fill-current text-[#F1EDE3]" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(6, 6)">
          <path d="M18 2L32 7V19C32 27 18 34 18 34C18 34 4 27 4 19V7L18 2Z" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
          <path d="M18 10V24M13 17H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <text x="50" y="24" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="16" fontWeight="600" letterSpacing="0.1em">
          CMM SCHOOL
        </text>
        <text x="51" y="37" fontFamily="'Inter', sans-serif" fontSize="7" fontWeight="600" letterSpacing="0.22em" opacity="0.5">
          CALICUT · KERALA
        </text>
      </svg>
    ),
  },
];

const TICKER_ITEMS = [
  "JOVIAL EVENTS · DUBAI",
  "SHOBHIKA WEDDINGS · CALICUT",
  "QUADCUBES · KERALA",
  "CDA ACADEMY",
  "CMM HIGHER SECONDARY",
  "3 RUNWAY FASHION SHOWS",
  "BRIDAL COUTURE CAMPAIGNS",
  "DAVINCI RESOLVE COLOR GRADING",
  "CORPORATE & CULTURAL EVENTS UAE",
];

interface Props {
  testimonials?: unknown;
}

const TestimonialsSection: React.FC<Props> = () => {
  // Seamless loop marquee
  const tickerLoop = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section id="experience" className="py-16 sm:py-24 bg-black text-[#F1EDE3] overflow-hidden relative scroll-mt-20">
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.015] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#67685D]" />
            <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8D8B82]">
              Network &amp; Affiliations
            </p>
            <span className="w-6 h-[1px] bg-[#67685D]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F1EDE3] font-normal tracking-tight leading-[1.1]">
            Companies, Brands <span className="italic text-[#C8BFB0]">&amp; Institutions</span>
          </h2>
          <p className="text-[#8D8B82] text-xs sm:text-sm font-sans max-w-xl mx-auto mt-3 leading-relaxed">
            Organizations, brands, and academic institutes from Adil's professional career across Dubai and Kerala.
          </p>
        </div>

        {/* Primary Verified Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {ORGANIZATIONS.slice(0, 4).map((org) => (
            <div
              key={org.id}
              className="group relative rounded-2xl p-6 sm:p-7 bg-[#141414] hover:bg-[#181818] border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Header: Logo & Status Badge */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center">
                    {org.logo}
                  </div>
                  <span
                    className={`text-[9.5px] font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${org.typeBadgeColor} flex items-center gap-1.5 flex-shrink-0`}
                  >
                    {org.type === "Current Company" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    )}
                    {org.type}
                  </span>
                </div>

                {/* Role & Timeline */}
                <div className="mb-3">
                  <h3 className="font-serif text-lg sm:text-xl text-[#F1EDE3] font-normal leading-snug">
                    {org.role}
                  </h3>
                  <p className="text-[11px] font-sans text-[#8D8B82] tracking-wide mt-1">
                    {org.period} · {org.location}
                  </p>
                </div>

                {/* Bio / Scope */}
                <p className="text-[#A8A499] text-xs sm:text-[13px] font-sans leading-relaxed mb-4">
                  {org.description}
                </p>
              </div>

              {/* Deliverables / Scope Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.04]">
                {org.deliverables.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-sans font-medium uppercase tracking-wider text-[#D8D1C2] bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full-width Endless Infinite Logo Ticker with Left & Right Vignettes */}
      <div className="relative w-full overflow-hidden py-3.5 border-y border-white/[0.06] bg-[#141414]">
        {/* Left Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-black to-transparent z-20" />
        {/* Right Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-black to-transparent z-20" />

        {/* Continuous Marquee Ribbon */}
        <div className="animate-marquee flex gap-8 sm:gap-12 items-center whitespace-nowrap">
          {tickerLoop.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8D1C2]/60" />
              <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#D8D1C2]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
