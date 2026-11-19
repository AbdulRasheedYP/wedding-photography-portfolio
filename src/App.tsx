import React, { useState, useEffect } from "react";
import Navbar from "./components/shared/Navbar";
import ProgressBar from "./components/shared/ProgressBar";
import LandingPage from "./pages/LandingPage";
import LutsLandingPage from "./pages/LutsLandingPage";
import { SmoothScrollProvider } from "./lib/SmoothScroll";

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
    return <LutsLandingPage onNavigateHome={navigateToHome} />;
  }

  return (
    <SmoothScrollProvider>
      <ProgressBar />
      <Navbar />
      <LandingPage />
    </SmoothScrollProvider>
  );
};

export default App;
