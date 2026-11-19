import React from "react";

interface AppItem {
  name: string;
  shortName: string;
  iconSrc: string;
}

const apps: AppItem[] = [
  {
    name: "Premiere Pro",
    shortName: "Premiere",
    iconSrc: "/icons/apps/premiere-pro.webp",
  },
  {
    name: "Final Cut Pro",
    shortName: "Final Cut",
    iconSrc: "/icons/apps/final-cut-pro.webp",
  },
  {
    name: "DaVinci Resolve",
    shortName: "DaVinci",
    iconSrc: "/icons/apps/davinci-resolve.webp",
  },
  {
    name: "Colourlab AI",
    shortName: "Colourlab",
    iconSrc: "/icons/apps/colourlab.webp",
  },
  {
    name: "VN Video Editor",
    shortName: "VN",
    iconSrc: "/icons/apps/vn.webp",
  },
  {
    name: "CapCut",
    shortName: "CapCut",
    iconSrc: "/icons/apps/capcut.webp",
  },
];

export const SupportedApps: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-1">
      <div className="flex items-center justify-center gap-3 sm:gap-3.5 flex-wrap">
        {apps.map((app) => (
          <div
            key={app.name}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
            title={`Compatible with ${app.name}`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden shadow-md transition-all duration-200 group-hover:scale-110 group-hover:shadow-[0_0_16px_rgba(255,255,255,0.2)] flex items-center justify-center">
              <img
                src={app.iconSrc}
                alt={app.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <span className="text-[10px] text-neutral-400 font-medium group-hover:text-neutral-200 transition-colors">
              {app.shortName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportedApps;
