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
  const [activeSection, setActiveSection] = useState("hero-section");

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

  // Keep a quiet section indicator in sync with the content currently in view.
  useEffect(() => {
    const sectionIds = ["hero-section", ...navLinks
      .map(({ to }) => to.slice(1))
      .filter((id) => id && id !== "#")];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header className={`fixed left-1/2 -translate-x-1/2 z-50 w-full max-w-[1400px] px-4 md:px-8 transition-[top] duration-500 ${isScrolled ? "top-3" : "top-6"}`}>
      <motion.div
        animate={{
          backgroundColor: isScrolled
            ? "rgba(24, 19, 16, 0.95)"
            : "rgba(255, 255, 255, 0.03)",
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.08)",
          boxShadow: isScrolled ? "0 10px 30px rgba(0, 0, 0, 0.2)" : "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.3 }}
        className={`flex items-center justify-between px-6 lg:px-8 backdrop-blur-2xl rounded-[3rem] border border-transparent transition-[padding] duration-500 ${isScrolled ? "py-2" : "py-3"}`}
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
            <div className="flex flex-col">
              <span className="text-white text-[13px] sm:text-[17px] tracking-wide leading-none font-display font-bold">
                IMNAZ MOON
              </span>
              <span className="text-white text-[7px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-1 font-sans">
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
              aria-current={activeSection === (l.to === "#" ? "hero-section" : l.to.slice(1)) ? "location" : undefined}
              className={`nav-link px-4 py-2 rounded-full text-white/75 hover:text-white hover:bg-white/10 hover:backdrop-blur-md text-[10px] font-black tracking-[0.25em] uppercase transition-all ${activeSection === (l.to === "#" ? "hero-section" : l.to.slice(1)) ? "is-active" : ""}`}
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
            className="nav-consult hidden md:inline-flex items-center justify-center gap-2 px-6 py-2.5 text-[11px] font-black text-white rounded-full"
          >
            Consultation <span aria-hidden="true" className="nav-cta-arrow">↗</span>
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
                className="nav-consult mt-4 rounded-2xl px-4 py-4 text-sm font-semibold uppercase tracking-widest text-center"
              >
                Request a Consultation <span aria-hidden="true" className="nav-cta-arrow ml-2">↗</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
