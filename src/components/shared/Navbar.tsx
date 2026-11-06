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
            className="fixed inset-0 z-40 bg-black/98 pt-28 px-7 pb-10 flex flex-col justify-between md:hidden"
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
                Adil Mubarak
              </span>
              <span className="text-[10px] font-sans">
                Dubai · Kerala · Worldwide
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
