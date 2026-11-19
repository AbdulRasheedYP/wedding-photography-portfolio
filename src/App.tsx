import React, { useState, useEffect } from "react";
import Navbar from "./components/shared/Navbar";
import ProgressBar from "./components/shared/ProgressBar";
import LandingPage from "./pages/LandingPage";
import LutsLandingPage from "./pages/LutsLandingPage";
import { SmoothScrollProvider } from "./lib/SmoothScroll";

const isLutPath = (path: string): boolean => {
  const clean = path.toLowerCase().replace(/\/+$/, "");
  // Do not intercept static downloads
  if (clean.endsWith(".zip") || clean.endsWith(".cube") || clean.endsWith(".webp") || clean.endsWith(".png")) {
    return false;
  }
  return (
    clean === "/downloads/luts" ||
    clean.startsWith("/downloads/luts/") ||
    clean === "/download/luts" ||
    clean.startsWith("/download/luts/") ||
    clean === "/luts" ||
    clean.startsWith("/luts/") ||
    clean === "/preset" ||
    clean.startsWith("/preset/") ||
    clean === "/presets" ||
    clean.startsWith("/presets/") ||
    clean === "/free-luts" ||
    clean.startsWith("/p/")
  );
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
