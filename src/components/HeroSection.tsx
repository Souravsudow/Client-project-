"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import HeroSequenceCanvas from "./HeroSequenceCanvas";
import HeroOverlay from "./HeroOverlay";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="hero-section" ref={containerRef} className="hero-section">
      {/* Sticky viewport-locked container — pinned while the user scrolls */}
      <div className="hero-sticky">
        <video
          className="hero-mobile-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/frames/001.webp"
          aria-hidden="true"
        >
          <source src="/imnaz-assets/hero-mobile.mp4" type="video/mp4" />
        </video>
        <HeroSequenceCanvas
          className="hero-desktop-sequence"
          scrollYProgress={scrollYProgress}
        />
        <HeroOverlay scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
