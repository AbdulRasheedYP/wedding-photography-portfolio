import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { id: "hero",     label: "Home"        },
  { id: "about",    label: "About"       },
  { id: "services", label: "Services"    },
  { id: "journey",  label: "Journey"     },
  { id: "work",     label: "Portfolio"   },
  { id: "contact",  label: "Contact"     },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { rootMargin: "-25px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, observerOptions);

    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 pt-4 sm:pt-5 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div
            className={`rounded-full px-5 py-2.5 flex items-center justify-between relative transition-all duration-500 ${
              scrolled
                ? "bg-[#141414] md:bg-[#141414]/90 md:backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/70"
                : "bg-[#141414]/90 md:bg-black/50 md:backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
            }`}
          >

            {/* Logo */}
            <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 group focus:outline-none" aria-label="Adil Mubarak Home">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#F1EDE3]/30 group-hover:border-[#F1EDE3]/80 group-hover:scale-105 transition-all duration-300 shadow-sm flex-shrink-0 bg-[#141414]">
                <img
                  src="/images/about/founder.webp"
                  alt="Adil Mubarak"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <p className="font-serif font-semibold text-base tracking-tight text-[#F1EDE3] leading-none">Adil Mubarak</p>
            </button>

            {/* Desktop Nav — absolutely centered */}
            <nav className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative text-xs font-display tracking-wider py-1 transition-colors ${
                    active === link.id
                      ? "text-[#F1EDE3] font-bold drop-shadow-sm"
                      : "text-[#D8D1C2]/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.div
                      layoutId="navDot"
                      className="w-1.5 h-1.5 rounded-full bg-[#F1EDE3] mx-auto mt-0.5 shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* CTA + Mobile trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollTo("contact")}
                className="hidden sm:inline-flex items-center gap-2 bg-[#F1EDE3] text-black font-display font-semibold text-xs py-2 px-5 rounded-full hover:bg-white hover:scale-102 transition-all duration-200 shadow-md"
              >
                Contact
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 rounded-full bg-white/5 text-[#F1EDE3] flex items-center justify-center focus:outline-none border border-white/10 active:scale-95 transition-all"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {menuOpen ? (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2]">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2]">
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu — Simple, sleek pull-down card right below the navbar */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden mt-2.5 w-full max-w-[320px] ml-auto bg-[#141414]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden"
              >
                <nav className="flex flex-col space-y-0.5">
                  {NAV_LINKS.map((link) => {
                    const isActive = active === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => scrollTo(link.id)}
                        className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-left transition-all duration-200 active:scale-[0.98] ${
                          isActive
                            ? "bg-white/10 text-[#F1EDE3] font-semibold"
                            : "text-[#B0ACA0] hover:text-[#F1EDE3] hover:bg-white/5"
                        }`}
                      >
                        <span className="text-[13px] font-display tracking-wider">
                          {link.label}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F1EDE3] shadow-[0_0_8px_rgba(241,237,227,0.8)]" />
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Quick Contact CTA in dropdown */}
                <div className="mt-2 pt-2 border-t border-white/10">
                  <button
                    onClick={() => scrollTo("contact")}
                    className="w-full py-2.5 px-4 rounded-full bg-[#F1EDE3] text-black font-display font-semibold text-xs uppercase tracking-wider text-center hover:bg-white transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Contact · Let's Talk
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Backdrop to close when tapping outside */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
