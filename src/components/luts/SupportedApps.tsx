import React from "react";

interface AppIcon {
  name: string;
  badge: React.ReactNode;
}

const apps: AppIcon[] = [
  {
    name: "Premiere Pro",
    badge: (
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#00005b] border border-[#9999ff]/50 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
        <span className="text-[#9999ff] font-bold text-xs sm:text-sm font-sans tracking-tight">
          Pr
        </span>
      </div>
    ),
  },
  {
    name: "Final Cut Pro",
    badge: (
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden shadow-lg border border-white/20 relative bg-neutral-900 transition-transform hover:scale-105">
        <div 
          className="absolute inset-0 opacity-95"
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #10b981 35%, #f59e0b 70%, #ec4899 100%)",
          }}
        />
        {/* Clapper stripes */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-neutral-950 flex items-center justify-around px-0.5">
          <div className="w-1.5 h-full bg-white -skew-x-12" />
          <div className="w-1.5 h-full bg-white -skew-x-12" />
          <div className="w-1.5 h-full bg-white -skew-x-12" />
        </div>
      </div>
    ),
  },
  {
    name: "DaVinci Resolve",
    badge: (
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#181b20] border border-white/20 flex items-center justify-center shadow-lg transition-transform hover:scale-105 relative overflow-hidden">
        <div className="w-5 h-5 relative flex items-center justify-center">
          <span className="absolute top-0 w-2 h-2.5 rounded-full bg-[#38bdf8]" />
          <span className="absolute bottom-0 left-0 w-2 h-2.5 rounded-full bg-[#facc15]" />
          <span className="absolute bottom-0 right-0 w-2 h-2.5 rounded-full bg-[#f43f5e]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#181b20] z-10" />
        </div>
      </div>
    ),
  },
  {
    name: "Color Lab",
    badge: (
      <div 
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shadow-lg border border-amber-500/40 overflow-hidden transition-transform hover:scale-105"
        style={{
          background: "radial-gradient(circle at 75% 25%, #ea580c 0%, #7c2d12 45%, #18181b 90%)",
        }}
      >
        <span className="text-white font-black text-xs sm:text-sm font-sans tracking-tight">
          CL
        </span>
      </div>
    ),
  },
  {
    name: "VN Video Editor",
    badge: (
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-neutral-300 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
        <span className="text-neutral-950 font-black text-xs sm:text-sm font-sans tracking-tight">
          VN
        </span>
      </div>
    ),
  },
  {
    name: "CapCut",
    badge: (
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black border border-white/20 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 7 L12 12 L4 17 Z" fill="currentColor" stroke="none" />
          <path d="M20 7 L12 12 L20 17 Z" fill="currentColor" stroke="none" />
          <line x1="6" y1="12" x2="18" y2="12" stroke="#000" strokeWidth="2" />
        </svg>
      </div>
    ),
  },
];

export const SupportedApps: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-1">
      <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
        {apps.map((app) => (
          <div
            key={app.name}
            className="flex flex-col items-center gap-1 cursor-pointer"
            title={`Compatible with ${app.name}`}
          >
            {app.badge}
            <span className="text-[10px] text-neutral-400 font-medium">
              {app.name === "VN Video Editor" ? "VN" : app.name === "DaVinci Resolve" ? "DaVinci" : app.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportedApps;
