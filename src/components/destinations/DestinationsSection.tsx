import React, { useState } from "react";

interface Pin {
  id: string;
  name: string;
  region: string;
  flight: string;
  tag: string;
  x: number; // SVG viewBox x (out of 1000)
  y: number; // SVG viewBox y (out of 562.5)
  isBase?: boolean;
}

const PINS: Pin[] = [
  {
    id: "kerala",
    name: "Kerala",
    region: "Origin & Home",
    flight: "Home Base",
    tag: "Calicut HQ",
    x: 675,
    y: 300,
    isBase: true,
  },
  {
    id: "dubai",
    name: "Dubai",
    region: "United Arab Emirates",
    flight: "Current Base",
    tag: "Now Based Here",
    x: 588,
    y: 242,
  },
  {
    id: "india",
    name: "Pan-India",
    region: "Available Nationwide",
    flight: "Domestic Travel",
    tag: "Events & Fashion",
    x: 658,
    y: 265,
  },
  {
    id: "worldwide",
    name: "Worldwide",
    region: "International",
    flight: "Available Globally",
    tag: "On Request",
    x: 400,
    y: 200,
  },
];

const FLIGHT_PATHS = [
  { to: "dubai",     d: "M 675 300 Q 625 240 588 242" },
  { to: "india",     d: "M 675 300 Q 668 275 658 265" },
  { to: "worldwide", d: "M 675 300 Q 540 220 400 200" },
];

interface Props {
  onInquireDestination?: (destination: string) => void;
}

const DestinationsSection: React.FC<Props> = ({ onInquireDestination }) => {
  const [activePin, setActivePin] = useState<Pin>(PINS[1]); // Default to Dubai to show flight arc

  const handleSelect = (pin: Pin) => {
    setActivePin(pin);
    if (onInquireDestination) {
      onInquireDestination(pin.name);
    }
  };

  const handleInquireClick = () => {
    if (onInquireDestination) {
      onInquireDestination(activePin.name);
    } else {
      const contactEl = document.getElementById("contact");
      contactEl?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="destinations"
      className="py-16 sm:py-24 px-5 sm:px-8 bg-[#080B09] relative overflow-hidden scroll-mt-20"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#67685D]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Minimal Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-[#67685D]" />
              <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8D8B82]">Availability</p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F1EDE3] font-normal tracking-tight leading-[1.1]">
              Based in Dubai, <span className="italic font-light text-[#D8D1C2]">rooted in Kerala.</span>
            </h2>
            <p className="text-[#67685D] text-sm font-sans mt-3 max-w-sm leading-relaxed">
              Available for projects worldwide — events, fashion, bridal, and social media content.
            </p>
          </div>

          <button
            onClick={handleInquireClick}
            className="self-start sm:self-auto px-6 py-3 rounded-full bg-[#F1EDE3] text-[#080B09] font-display font-semibold text-xs uppercase tracking-widest hover:bg-[#D8D1C2] transition-colors whitespace-nowrap shadow-lg"
          >
            Check Availability &rarr;
          </button>
        </div>

        {/* Authentic High-Definition World Map Display */}
        <div className="relative rounded-3xl border border-[#F1EDE3]/15 bg-[#080B09] overflow-hidden shadow-2xl">
          
          {/* 16:9 Realistic World Map Layer */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[2.1/1] overflow-hidden bg-[#080B09]">
            <img
              src="/images/destinations/world_map.webp"
              alt="World Destination Map"
              className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.1]"
              loading="lazy"
              decoding="async"
            />

            {/* Subtle Vignette & Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-60" />

            {/* Interactive SVG Radar & Flight Route Overlay */}
            <svg
              viewBox="0 0 1000 562.5"
              className="absolute inset-0 w-full h-full select-none"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="flightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F1EDE3" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#D8D1C2" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Flight Arcs Radiating from Kerala */}
              {FLIGHT_PATHS.map((path) => {
                const isSelected = activePin.id === path.to;
                return (
                  <path
                    key={path.to}
                    d={path.d}
                    fill="none"
                    stroke={isSelected ? "#F1EDE3" : "url(#flightGrad)"}
                    strokeWidth={isSelected ? "2.5" : "1.2"}
                    strokeDasharray={isSelected ? "none" : "4,5"}
                    className="transition-all duration-300 pointer-events-none"
                  />
                );
              })}

              {/* Destination Nodes on the Map */}
              {PINS.map((pin) => {
                const isSelected = activePin.id === pin.id;
                return (
                  <g
                    key={pin.id}
                    onClick={() => handleSelect(pin)}
                    className="cursor-pointer group"
                    transform={`translate(${pin.x}, ${pin.y})`}
                  >
                    {/* Radar Ring */}
                    <circle
                      r={pin.isBase ? "18" : isSelected ? "15" : "9"}
                      className={`fill-none ${
                        pin.isBase
                          ? "stroke-white/70"
                          : isSelected
                          ? "stroke-[#F1EDE3]"
                          : "stroke-white/30 group-hover:stroke-white/60"
                      }`}
                      strokeWidth="1.2"
                      opacity={pin.isBase || isSelected ? 0.8 : 0.4}
                    />

                    {/* Central Glowing Dot */}
                    <circle
                      r={pin.isBase ? "7" : isSelected ? "6" : "4"}
                      className={`transition-all duration-300 ${
                        pin.isBase
                          ? "fill-[#F1EDE3] stroke-black stroke-2"
                          : isSelected
                          ? "fill-[#F1EDE3] stroke-white stroke-2 shadow-lg"
                          : "fill-[#D8D1C2]/70 group-hover:fill-white"
                      }`}
                    />

                    {/* Map Marker Label */}
                    <text
                      y={pin.y > 330 ? 20 : -14}
                      x="0"
                      textAnchor="middle"
                      className={`font-display text-[11px] tracking-wider select-none pointer-events-none transition-all duration-300 ${
                        isSelected
                          ? "fill-[#F1EDE3] font-bold drop-shadow-md text-[12px]"
                          : "fill-[#D8D1C2]/75 group-hover:fill-white font-medium"
                      }`}
                    >
                      {pin.name.split(" ")[0]} {pin.isBase ? "★" : ""}
                    </text>
                  </g>
                );
              })}
            </svg>

          </div>
        </div>

        {/* Mobile & Quick Destination Selector Pills */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {PINS.map((pin) => {
            const isSelected = activePin.id === pin.id;
            return (
              <button
                key={pin.id}
                onClick={() => handleSelect(pin)}
                className={`px-4 py-2 rounded-full text-xs font-display font-medium uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? "bg-[#F1EDE3] text-[#080B09] font-bold shadow-md scale-105"
                    : "bg-[#111412] text-[#8D8B82] border border-[#F1EDE3]/10 hover:border-[#F1EDE3]/30 hover:text-[#F1EDE3]"
                }`}
              >
                {pin.name} {pin.isBase ? "★ (HQ)" : ""}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default DestinationsSection;
