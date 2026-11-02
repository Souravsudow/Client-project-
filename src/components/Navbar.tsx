"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

// ── Embedded Navigation Data (No external links required) ──
const navLinks = [
  { to: "#", label: "Home" },
  { to: "#about", label: "About" },
  { to: "#services", label: "Services" },
  { to: "#sectors", label: "Sectors" },
  { to: "#transformations", label: "Work" },
  { to: "#trust", label: "Trust" },
  { to: "#contact", label: "Contact" },
] as const;

export function Navbar({ onConsult }: { onConsult?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Default CTA behaviour: take the visitor to the contact section. Without a
  // fallback the Consultation buttons render but do nothing.
  const handleConsult =
    onConsult ??
    (() => {
      const target = document.getElementById("contact");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.hash = "#contact";
      }
    });

  // Switch to the solid state once the hero leaves the viewport. An observer
  // avoids reading layout on every scroll event, which janks on phones.
  useEffect(() => {
    const heroSection = document.getElementById("hero-section");

    if (!heroSection) {
      const onScroll = () => setIsScrolled(window.scrollY > 80);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1400px] px-4 md:px-8">
      <motion.div
        animate={{
          backgroundColor: isScrolled
            ? "rgba(24, 19, 16, 0.95)"
            : "rgba(255, 255, 255, 0.03)",
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.08)",
          boxShadow: isScrolled ? "0 10px 30px rgba(0, 0, 0, 0.2)" : "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between px-6 py-3 lg:px-8 lg:py-3 backdrop-blur-2xl rounded-[3rem] border border-transparent"
      >
        {/* Left: Logo Area */}
        <div className="flex items-center pl-2">
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                 e.preventDefault();
                 window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-4 group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-transparent flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
              <span className="text-white text-[10px] font-bold tracking-widest">IM</span>
            </div>
            <div className="flex-col hidden sm:flex">
              <span className="text-white text-[17px] tracking-wide leading-none font-display font-bold">
                IMNAZ MOON
              </span>
              <span className="text-white text-[10px] font-black tracking-[0.3em] uppercase mt-1 font-sans">
                TECHNICAL SERVICE LLC
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className="px-4 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 hover:backdrop-blur-md text-[10px] font-black tracking-[0.25em] uppercase transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right: CTA Button */}
        <div className="flex items-center gap-4 pr-1">
          <button
            type="button"
            onClick={handleConsult}
            className="hidden md:inline-flex items-center justify-center px-8 py-2 text-[13px] font-black text-white transition-all bg-white/5 backdrop-blur-md rounded-full hover:bg-white/10 border border-white/15"
          >
            Consultation
          </button>
          
          <button
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-transparent text-white lg:hidden"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </motion.div>

      {/* MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="mx-auto mt-4 max-w-[1440px] rounded-[2rem] border border-white/15 bg-ink/95 p-6 shadow-xl backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white/10"
                >
                  {l.label}
                </a>
              ))}
              
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  handleConsult();
                }}
                className="mt-4 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-4 text-sm font-semibold uppercase tracking-widest text-accent transition-colors hover:bg-accent/20 text-center"
              >
                Request a Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
