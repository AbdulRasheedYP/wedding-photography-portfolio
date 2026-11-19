import React, { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/shared/Navbar";
import ProgressBar from "./components/shared/ProgressBar";
import { SmoothScrollProvider } from "./lib/SmoothScroll";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const LutsLandingPage = lazy(() => import("./pages/LutsLandingPage"));

const PageLoadingFallback = () => (
  <div className="min-h-screen bg-[#070908] flex flex-col items-center justify-center select-none">
    <div className="text-[11px] font-semibold tracking-[0.35em] uppercase text-[#E5A853] mb-3.5 opacity-90 font-sans">
      Adil Mubarak
    </div>
    <div className="w-6 h-6 border-2 border-[#E5A853]/20 border-t-[#E5A853] rounded-full animate-spin" />
  </div>
);

/**
 * Validates secret LUT download URL.
 * Only accepts long, unguessable random codes under /downloads/luts/<BIG_CODE>.
 * Simple / guessable URLs (like /luts, /free, /preset, /downloads/luts/free) are strictly rejected
 * and will display the normal portfolio so nobody can randomly guess or access it.
 */
const isLutPath = (path: string): boolean => {
  const clean = path.toLowerCase().replace(/\/+$/, "");

  // Do not intercept static files (.zip, .cube, etc.)
  if (clean.endsWith(".zip") || clean.endsWith(".cube") || clean.endsWith(".webp") || clean.endsWith(".png")) {
    return false;
  }

  // Must strictly match /downloads/luts/<CODE> or /download/luts/<CODE>
  const match = clean.match(/^\/downloads?\/luts\/([a-z0-9_-]+)$/);
  if (!match) {
    return false;
  }

  const code = match[1];

  // Block short words and common guessable terms (e.g. "free", "preset", "test", "luts")
  const blockedTerms = ["free", "preset", "presets", "test", "luts", "pack", "download", "lut"];
  if (blockedTerms.includes(code) || code.length < 10) {
    return false;
  }

  return true;
};

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (isLutPath(currentPath)) {
      document.title = "Adil Mubarak — 2 Free Cinematic LUTs Pack";
    } else {
      document.title = "Adil Mubarak — Videographer & Photographer";
    }
  }, [currentPath]);

  const navigateToHome = () => {
    window.history.pushState({}, "", "/");
    setCurrentPath("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLutsView = isLutPath(currentPath);

  if (isLutsView) {
    return (
      <Suspense fallback={<PageLoadingFallback />}>
        <LutsLandingPage onNavigateHome={navigateToHome} />
      </Suspense>
    );
  }

  return (
    <SmoothScrollProvider>
      <ProgressBar />
      <Navbar />
      <Suspense fallback={<PageLoadingFallback />}>
        <LandingPage />
      </Suspense>
    </SmoothScrollProvider>
  );
};

export default App;
