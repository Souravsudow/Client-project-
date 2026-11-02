"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  as?: "section" | "div" | "article" | "footer";
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  id,
  as: Component = "div",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const shouldReduceMotion = useReducedMotion();

  // Make scroll reveals easy to notice while keeping reduced-motion users static.
  const hidden = shouldReduceMotion
    ? { opacity: 1, y: 0, scale: 1 }
    : { opacity: 0, y: 64, scale: 0.97 };
  const visible = { opacity: 1, y: 0, scale: 1 };

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={hidden}
      animate={shouldReduceMotion || isInView ? visible : hidden}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.9,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
