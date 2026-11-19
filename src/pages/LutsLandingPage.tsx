import React, { useState } from "react";
import BeforeAfterSlider from "../components/luts/BeforeAfterSlider";
import { ArrowUpRight, Download, CheckCircle, Film, Sparkles, Star } from "lucide-react";

interface LutsLandingPageProps {
  onNavigateHome: () => void;
}

export const LutsLandingPage: React.FC<LutsLandingPageProps> = ({ onNavigateHome }) => {
  const [downloadStarted, setDownloadStarted] = useState(false);

  // You can easily swap these two images with your own before/after photos:
  const beforeImage = "/images/luts/before.webp";
  const afterImage = "/images/luts/after.webp";
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
      {/* Background Cinematic Glows */}
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

      {/* Top Floating Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070908]/80 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div 
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src="/images/about/founder1.webp"
              alt="Adil Mubarak"
              className="w-9 h-9 rounded-full object-cover border border-[#E5A853]/40 group-hover:border-[#E5A853] transition-colors"
              onError={(e) => {
                // fallback if image not loaded
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <span className="font-heading font-serif text-lg tracking-wider block text-white group-hover:text-[#E5A853] transition-colors">
                ADIL MUBARAK
              </span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block -mt-1">
                Films & Presets
              </span>
            </div>
          </div>

          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#F1EDE3] bg-white/[0.05] hover:bg-[#E5A853]/15 border border-white/10 hover:border-[#E5A853]/40 transition-all duration-200 cursor-pointer"
          >
            <span>Visit Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#E5A853]" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-xl mx-auto px-4 py-6 sm:py-10 space-y-7">
        
        {/* Creator Info Header */}
        <div className="flex items-center gap-3.5">
          <img
            src="/images/about/founder1.webp"
            alt="Adil Mubarak"
            className="w-14 h-14 shrink-0 rounded-full object-cover border-2 border-[#E5A853]/50 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-base sm:text-lg font-semibold text-white">Adil Mubarak</h2>
              <span className="text-neutral-500">•</span>
              <span className="text-xs text-neutral-300 font-medium">Filmmaker & Colorist</span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Dubai • Calicut • Worldwide Projects
            </p>
          </div>
        </div>

        {/* Hero Card Container */}
        <div className="bg-[#101311]/90 rounded-3xl border border-white/[0.08] p-4 sm:p-6 shadow-2xl backdrop-blur-md space-y-5">
          
          {/* Badge & Title */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#22c55e]/15 text-[#4ade80] border border-[#22c55e]/30">
                <Sparkles className="w-3 h-3" />
                Free
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-400 font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.98 (Creator Pack)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
              2 Free Cinematic LUTs
            </h1>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              These 2 signature LUTs are taken from my private cinematic grade collection. Designed for wedding films, commercials, and travel reels to give you instant film-toned colors.
            </p>
          </div>

          {/* Software Compatibility Badges */}
          <div className="flex items-center gap-2 pt-1 pb-1 overflow-x-auto">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 mr-1 font-medium">
              Supports:
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 border border-white/10 text-xs text-neutral-200">
              <span className="w-2 h-2 rounded-full bg-[#E5A853]" />
              DaVinci Resolve
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 border border-white/10 text-xs text-neutral-200">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Premiere Pro
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 border border-white/10 text-xs text-neutral-200">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Final Cut Pro
            </div>
          </div>

          {/* Interactive Before / After Comparison Slider */}
          <div className="pt-2">
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="Raw / Log"
              afterLabel="Cinematic Grade"
            />
          </div>

          {/* Download Action Section */}
          <div className="pt-3 space-y-3">
            <button
              onClick={handleDownload}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-[#E5A853] via-[#f5c77e] to-[#E5A853] text-neutral-950 font-bold py-4 px-6 rounded-2xl shadow-[0_10px_30px_rgba(229,168,83,0.3)] hover:shadow-[0_12px_36px_rgba(229,168,83,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <Download className="w-5 h-5 text-neutral-950 stroke-[2.5]" />
              <span>Download 2 Free LUTs Now</span>
            </button>

            {downloadStarted && (
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm flex items-center gap-2.5 animate-fadeIn">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Your download has started! Unzip and load into Premiere or DaVinci.</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs text-neutral-400 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#E5A853]" />
                <span>Instant .cube file access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#E5A853]" />
                <span>Rec.709 & Log compatible</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#E5A853]" />
                <span>No sign-up required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#E5A853]" />
                <span>Commercial use allowed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Upsell & Portfolio Section */}
        <div className="space-y-3 pt-2">
          {/* Card: Portfolio Link */}
          <div 
            onClick={onNavigateHome}
            className="group p-4 sm:p-5 rounded-2xl bg-[#101311]/70 hover:bg-[#141815] border border-white/[0.08] hover:border-[#E5A853]/40 transition-all duration-200 cursor-pointer flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#E5A853]/10 border border-[#E5A853]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Film className="w-5 h-5 text-[#E5A853]" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold block">
                  Commercial & Wedding Films
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#E5A853] transition-colors">
                  View Adil's Complete Video Portfolio
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Explore luxury bridal films, brand campaigns & color grade reels.
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-[#E5A853] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </div>

          {/* Direct Booking Inquiries */}
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/40 border border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
            <span>Want Adil to shoot or grade your next project?</span>
            <button
              onClick={onNavigateHome}
              className="text-[#E5A853] hover:underline font-semibold cursor-pointer shrink-0 ml-2"
            >
              Get in Touch →
            </button>
          </div>
        </div>

        {/* Minimal Footer */}
        <footer className="pt-8 pb-12 text-center text-xs text-neutral-500 space-y-2">
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
