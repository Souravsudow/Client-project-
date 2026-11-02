"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const processSteps = [
  {
    title: "Consultation & Site Visit",
    description: "We assess the space, understand your functional requirements, and define the technical scope of the project.",
  },
  {
    title: "Design & Planning",
    description: "Our engineers and interior specialists develop detailed plans, selecting materials that match your aesthetic and budget.",
  },
  {
    title: "Approvals & Preparation",
    description: "We handle necessary permits with Dubai authorities and prepare the site for safe, efficient execution.",
  },
  {
    title: "Execution & Installation",
    description: "Our skilled teams carry out electromechanical, carpentry, painting, and fit-out works with strict quality control.",
  },
  {
    title: "Handover & Maintenance",
    description: "Final deep clean, client walkthrough, and handover. We also offer AMC contracts to protect your investment long-term.",
  },
];

function StaggeredStep({ step, index }: { step: typeof processSteps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const shouldReduceMotion = useReducedMotion();
  const fromLeft = index % 2 === 0;
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      className="process-step"
      initial={shouldReduceMotion ? false : { opacity: 0, x: fromLeft ? -60 : 60 }}
      animate={shouldReduceMotion || isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: fromLeft ? -60 : 60 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="step-spacer" />
      <div className="step-dot" />
      <div className="step-content">
        <div className="step-number">{number}</div>
        <h3>{step.title}</h3>
        <p style={{ fontSize: "0.9rem" }}>{step.description}</p>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  return (
    <section id="process" className="section process-section">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="process-heading"
      >
        <span className="section-kicker">How We Work</span>
        <h2>The Delivery Process</h2>
        <p>From initial site inspection to final handover, our workflow is designed to eliminate delays and guarantee precision.</p>
      </motion.div>

      <div className="process-timeline">
        {processSteps.map((step, index) => (
          <StaggeredStep key={step.title} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}
