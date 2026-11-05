import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { id: "hero",         label: "Home"         },
  { id: "about",        label: "The Artist"   },
  { id: "services",     label: "Offerings"    },
  { id: "work",         label: "Works"        },
  { id: "destinations", label: "Destinations" },
  { id: "contact",      label: "Inquire"      },
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
            className={`rounded-full px-5 py-2.5 flex items-center justify-between transition-all duration-500 ${
              scrolled
                ? "bg-[#080B09]/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/70"
                : "bg-black/25 backdrop-blur-xl backdrop-saturate-150 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_32px_0_rgba(0,0,0,0.37)]"
            }`}
          >

            {/* Logo */}
            <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 group focus:outline-none" aria-label="Adil Mubarak Photography Home">
              <div className="w-7 h-7 rounded-full bg-[#F1EDE3] flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[#080B09] fill-none stroke-[2]">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3L15 9M21 9.5L14.5 12M19.5 17.5L14 15M12 21L9 15M3 14.5L9.5 12M4.5 6.5L10 9" />
                </svg>
              </div>
              <div>
                <p className="font-serif font-semibold text-base tracking-tight text-[#F1EDE3] leading-none">Adil Mubarak</p>
                <p className="text-[8px] font-sans font-semibold text-[#8D8B82] uppercase tracking-[0.25em] leading-none mt-0.5">Photography &amp; Cinema</p>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7">
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
                className="hidden sm:inline-flex items-center gap-2 bg-[#F1EDE3] text-[#080B09] font-display font-semibold text-xs py-2 px-5 rounded-full hover:bg-white hover:scale-102 transition-all duration-200 shadow-md"
              >
                Inquire Date
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 rounded-full bg-[#F1EDE3]/5 text-[#F1EDE3] flex items-center justify-center text-base focus:outline-none border border-[#F1EDE3]/10"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#080B09]/98 backdrop-blur-2xl pt-28 px-7 pb-10 flex flex-col justify-between md:hidden"
          >
            <div className="flex flex-col justify-center flex-1 space-y-6">
              {NAV_LINKS.map((link, idx) => {
                const isActive = active === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="group flex items-center justify-between py-2 text-left transition-colors duration-300"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-[10px] font-display font-medium tracking-[0.25em] text-[#8D8B82]/60 uppercase">
                        0{idx + 1}
                      </span>
                      <span
                        className={`font-serif text-3xl sm:text-4xl tracking-tight transition-all duration-300 ${
                          isActive
                            ? "text-[#F1EDE3] italic font-normal"
                            : "text-[#8D8B82] group-hover:text-[#F1EDE3]"
                        }`}
                      >
                        {link.label}
                      </span>
                    </div>

                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F1EDE3] shadow-[0_0_8px_rgba(241,237,227,0.8)]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Subtle Minimal Personal Brand Mark */}
            <div className="pt-6 border-t border-[#F1EDE3]/10 flex items-center justify-between text-xs font-sans text-[#8D8B82]">
              <span className="tracking-wider uppercase text-[10px] font-display">
                Adil Mubarak Photography
              </span>
              <span className="text-[10px] font-sans">
                Kerala • Pan-India • UAE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
