import React, { useState } from "react";
import BeforeAfterSlider from "../components/luts/BeforeAfterSlider";
import SupportedApps from "../components/luts/SupportedApps";
import { ArrowUpRight, Download, Check, Star } from "lucide-react";

interface LutsLandingPageProps {
  onNavigateHome: () => void;
}

const lutPreview = {
  beforeImage: "/images/luts/lut1_before.webp",
  afterImage: "/images/luts/lut1_after.webp",
};

export const LutsLandingPage: React.FC<LutsLandingPageProps> = ({ onNavigateHome }) => {
  const [downloadStarted, setDownloadStarted] = useState(false);

  const downloadUrl = "/downloads/Adil_Mubarak_Free_LUTs.zip";

  const handleDownload = () => {
    setDownloadStarted(true);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "Adil_Mubarak_Free_LUTs.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadStarted(false);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-[#070908] text-[#F1EDE3] selection:bg-[#E5A853]/30 selection:text-white relative overflow-x-hidden font-sans">
      {/* Background Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, #E5A853 0%, #153227 60%, transparent 80%)" }}
        />
        <div
          className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] rounded-full opacity-15 blur-[140px]"
          style={{ background: "radial-gradient(circle, #E5A853 0%, transparent 70%)" }}
        />
      </div>

      {/* Floating Pill Navbar matching Portfolio branding */}
      <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4 sm:pt-5 transition-all duration-300">
        <div className="max-w-xl mx-auto">
          <div className="rounded-full px-4 sm:px-5 py-2.5 flex items-center justify-between relative bg-[#141414]/90 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
            {/* Logo */}
            <button 
              onClick={onNavigateHome} 
              className="flex items-center gap-2.5 group focus:outline-none cursor-pointer"
              aria-label="Adil Mubarak Home"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#F1EDE3]/30 group-hover:border-[#E5A853] transition-all flex-shrink-0 bg-[#141414]">
                <img
                  src="/images/about/founder.webp"
                  alt="Adil Mubarak"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif font-semibold text-sm sm:text-base tracking-tight text-[#F1EDE3] group-hover:text-[#E5A853] transition-colors leading-none">
                Adil Mubarak
              </span>
            </button>

            {/* Compact Portfolio Pill Button */}
            <button
              onClick={onNavigateHome}
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold bg-[#F1EDE3] text-black hover:bg-[#E5A853] transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
            >
              <span>Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area with generous gap from floating navbar */}
      <main className="relative z-10 max-w-xl mx-auto px-4 pt-24 sm:pt-28 pb-12 space-y-7">
        
        {/* Main Product Card */}
        <div className="bg-[#101311]/90 rounded-3xl border border-white/[0.08] p-5 sm:p-7 shadow-2xl backdrop-blur-md space-y-5 text-center">
          
          {/* Badge & Title Header (Matching reference style) */}
          <div className="space-y-3 flex flex-col items-center">
            {/* FREE Green Badge */}
            <div className="inline-flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#4ade80] text-neutral-950 shadow-md">
                FREE
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-400 font-medium bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/10">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.98</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
               FREE CINEMATIC LUTS
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-neutral-300/90 uppercase tracking-wide font-medium leading-relaxed max-w-md mx-auto">
              These  LUTs are from my cinematic LUT pack and just a taste of some of the colour offerings from the full collection.
            </p>
          </div>

          {/* Software Compatibility Strip (Our 6 clean app icons) */}
          <div className="pt-1 pb-1">
            <SupportedApps />
          </div>

          {/* Interactive Before / After Comparison Slider */}
          <div className="pt-1 text-left">
            <BeforeAfterSlider
              beforeImage={lutPreview.beforeImage}
              afterImage={lutPreview.afterImage}
              beforeLabel="Before"
              afterLabel="After"
            />
          </div>

          {/* Download Action Section */}
          <div className="pt-3 space-y-3.5 text-left">
            <button
              onClick={handleDownload}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-[#E5A853] via-[#f5c77e] to-[#E5A853] text-neutral-950 font-bold py-4 px-6 rounded-2xl shadow-[0_10px_30px_rgba(229,168,83,0.3)] hover:shadow-[0_12px_36px_rgba(229,168,83,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <Download className="w-5 h-5 text-neutral-950 stroke-[2.5]" />
              <span>Download Free LUTs Now</span>
            </button>

            {downloadStarted && (
              <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center gap-2.5 animate-fadeIn">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                </div>
                <span>Your download has started! Unzip and import into Premiere, CapCut, or DaVinci.</span>
              </div>
            )}

            {/* 3 Bullet Points */}
            <div className="space-y-2 pt-1 px-1">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                <div className="w-4 h-4 rounded-full bg-neutral-800 border border-neutral-600 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                </div>
                <span>LUTs taken from my full pack, free</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                <div className="w-4 h-4 rounded-full bg-neutral-800 border border-neutral-600 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                </div>
                <span>Works in Premiere, Final Cut, DaVinci, CapCut and VN</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                <div className="w-4 h-4 rounded-full bg-neutral-800 border border-neutral-600 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                </div>
                <span>Instant download right after checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Creator Info Placed Directly Above View Portfolio */}
        <div className="pt-2 flex flex-col items-center space-y-3.5">
          <div className="flex items-center gap-3.5 px-1">
            <img
              src="/images/about/founder1.webp"
              alt="Adil Mubarak"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#E5A853]/50 shadow-md shrink-0"
            />
            <div className="text-left">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-sm sm:text-base font-semibold text-white">Adil Mubarak</h2>
                <span className="text-neutral-500">•</span>
                <span className="text-xs text-neutral-300 font-medium">Videographer & Photographer</span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Dubai • Calicut • Worldwide Projects
              </p>
            </div>
          </div>

          {/* Compact, Sleek View Portfolio Button */}
          <button
            onClick={onNavigateHome}
            className="px-6 py-2.5 rounded-full bg-white/[0.06] hover:bg-[#E5A853]/20 border border-white/15 hover:border-[#E5A853]/60 text-[#F1EDE3] hover:text-white text-xs font-semibold tracking-wide inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-md group"
          >
            <span>View Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#E5A853] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Minimal Footer */}
        <footer className="pt-6 pb-12 text-center text-xs text-neutral-500 space-y-2">
          <p>© {new Date().getFullYear()} Adil Mubarak Films. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 text-neutral-400">
            <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <span>•</span>
            <a 
              href="https://www.instagram.com/adilmubarak" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <span>•</span>
            <a 
              href="mailto:contact@adilmubarak.com" 
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LutsLandingPage;
