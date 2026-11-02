"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

/* ── Reusable scroll-animated section wrapper ──
 *
 * Two-wrapper approach:
 *  • Outer static div handles vertical centering via top-1/2 -translate-y-1/2
 *  • Inner motion.div handles Framer Motion opacity + y transforms
 *  This avoids conflicts between CSS transform (centering) and
 *  Framer Motion's transform (scroll animation).
 */
function ScrollSection({
  scrollYProgress,
  opacityInput,
  opacityOutput,
  yInput,
  yOutput,
  className = "",
  children,
}: {
  scrollYProgress: MotionValue<number>;
  opacityInput: number[];
  opacityOutput: number[];
  yInput: number[];
  yOutput: number[];
  className?: string;
  children: React.ReactNode;
}) {
  const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput);
  const y = useTransform(scrollYProgress, yInput, yOutput);

  return (
    <div 
      className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none"
      style={{ paddingLeft: '8vw', paddingRight: '8vw', boxSizing: 'border-box' }}
    >
      <motion.div className={className} style={{ opacity, y, width: '100%' }}>
        {children}
      </motion.div>
    </div>
  );
}

/* Font stack — uses the --font-inter CSS variable loaded via next/font/google */
const FONT = "var(--font-inter), 'Inter', system-ui, sans-serif";

/* ── Main Overlay ──
 *
 * Typography Design System (matching portfolio reference):
 *
 *  TWO-PART SENTENCE RULE
 *    Every line splits into primary (text-white) + accent (text-zinc-300/400).
 *
 *  DOT RULE
 *    The trailing "." is always in the accent color, never pure white.
 *
 *  ITALIC RULE
 *    Italic is used sparingly — only Section 2. This makes it pop.
 *
 *  WEIGHT HIERARCHY
 *    Section 1: font-bold (700) — maximum impact opener
 *    Sections 2–7: font-medium (500) — elegant, lighter statements
 *
 *  ALIGNMENT DANCE
 *    center → left → right → center → left → right → left
 *
 *  SCROLL ANIMATION
 *    Each section enters from +150px below, exits at -150px above.
 *    4-keyframe opacity: fade-in → hold → hold → fade-out.
 *    Ranges: frames 65–436 of 488 total = scroll 0.13–0.893.
 *    Distributed evenly, 7 sections, each ~0.11 wide with ~0.02 overlap.
 *
 *  PADDING
 *    The outer wrapper in ScrollSection enforces a strict px-8 md:px-16 lg:px-32 
 *    boundary, creating an invisible wall that text cannot cross.
 */
export default function HeroOverlay({ scrollYProgress }: Props) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none hero-overlay">

      {/* ━━ Section 1: "Technical & Interior Solutions." ━━ */}
      <ScrollSection
        scrollYProgress={scrollYProgress}
        opacityInput={[0.13, 0.16, 0.21, 0.25]}
        opacityOutput={[0, 1, 1, 0]}
        yInput={[0.13, 0.25]}
        yOutput={[150, -150]}
        className="flex justify-center text-center"
      >
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight max-w-5xl drop-shadow-2xl leading-[1.1] break-words"
          style={{ fontFamily: FONT }}
        >
          Technical &amp; Interior{" "}
          <span className="italic text-zinc-300">Solutions.</span>
        </h2>
      </ScrollSection>

      {/* ━━ Section 2: "UAE's Trusted Name in Technical Services." ━━ */}
      <ScrollSection
        scrollYProgress={scrollYProgress}
        opacityInput={[0.23, 0.27, 0.33, 0.37]}
        opacityOutput={[0, 1, 1, 0]}
        yInput={[0.23, 0.37]}
        yOutput={[150, -150]}
        className="flex justify-start"
      >
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight max-w-3xl drop-shadow-2xl leading-[1.1] break-words"
          style={{ fontFamily: FONT }}
        >
          UAE&apos;s Trusted Name{" "}
          <br className="md:hidden" />
          <span className="italic text-zinc-300">in Technical Services.</span>
        </h2>
      </ScrollSection>

      {/* ━━ Section 3: "Electromechanical Services." ━━ */}
      <ScrollSection
        scrollYProgress={scrollYProgress}
        opacityInput={[0.35, 0.39, 0.46, 0.50]}
        opacityOutput={[0, 1, 1, 0]}
        yInput={[0.35, 0.50]}
        yOutput={[150, -150]}
        className="flex justify-end text-right"
      >
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight max-w-3xl drop-shadow-2xl leading-[1.1] break-words"
          style={{ fontFamily: FONT }}
        >
          Electromechanical{" "}
          <br className="hidden md:block" />
          <span className="italic text-zinc-300">Services.</span>
        </h2>
      </ScrollSection>

      {/* ━━ Section 4: "Interior Fit-Out Solutions." ━━ */}
      <ScrollSection
        scrollYProgress={scrollYProgress}
        opacityInput={[0.48, 0.52, 0.58, 0.62]}
        opacityOutput={[0, 1, 1, 0]}
        yInput={[0.48, 0.62]}
        yOutput={[150, -150]}
        className="flex justify-center text-center"
      >
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight max-w-4xl drop-shadow-2xl leading-[1.1] break-words"
          style={{ fontFamily: FONT }}
        >
          Interior Fit-Out{" "}
          <br className="hidden md:block" />
          <span className="italic text-zinc-300">Solutions.</span>
        </h2>
      </ScrollSection>

      {/* ━━ Section 5: "Engineering Excellence." ━━ */}
      <ScrollSection
        scrollYProgress={scrollYProgress}
        opacityInput={[0.60, 0.64, 0.70, 0.74]}
        opacityOutput={[0, 1, 1, 0]}
        yInput={[0.60, 0.74]}
        yOutput={[150, -150]}
        className="flex justify-start"
      >
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight max-w-3xl drop-shadow-2xl leading-[1.1] break-words"
          style={{ fontFamily: FONT }}
        >
          Engineering{" "}
          <br className="hidden md:block" />
          <span className="italic text-zinc-300">Excellence.</span>
        </h2>
      </ScrollSection>

      {/* ━━ Section 6: "Built With Precision." ━━ */}
      <ScrollSection
        scrollYProgress={scrollYProgress}
        opacityInput={[0.72, 0.76, 0.80, 0.84]}
        opacityOutput={[0, 1, 1, 0]}
        yInput={[0.72, 0.84]}
        yOutput={[150, -150]}
        className="flex justify-end text-right"
      >
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight max-w-3xl drop-shadow-2xl leading-[1.1] break-words"
          style={{ fontFamily: FONT }}
        >
          Built With{" "}
          <br className="hidden md:block" />
          <span className="italic text-zinc-300">Precision.</span>
        </h2>
      </ScrollSection>

      {/* ━━ Section 7: "Maintenance & Repair." ━━ */}
      <ScrollSection
        scrollYProgress={scrollYProgress}
        opacityInput={[0.82, 0.85, 0.88, 0.893]}
        opacityOutput={[0, 1, 1, 0]}
        yInput={[0.82, 0.893]}
        yOutput={[150, -150]}
        className="flex justify-start"
      >
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight max-w-3xl drop-shadow-2xl leading-[1.1] break-words"
          style={{ fontFamily: FONT }}
        >
          Maintenance{" "}
          <br className="hidden md:block" />
          <span className="italic text-zinc-300">&amp; Repair.</span>
        </h2>
      </ScrollSection>

    </div>
  );
}
