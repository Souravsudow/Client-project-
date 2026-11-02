"use client";

import AnimatedSection from "./AnimatedSection";

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

export default function ProcessSection() {
  return (
    <section id="process" className="section process-section">
      <AnimatedSection className="process-heading">
        <span className="section-kicker">How We Work</span>
        <h2>The Delivery Process</h2>
        <p>From initial site inspection to final handover, our workflow is designed to eliminate delays and guarantee precision.</p>
      </AnimatedSection>

      <div className="process-timeline">
        {processSteps.map((step, index) => {
          const number = String(index + 1).padStart(2, "0");
          return (
            <AnimatedSection key={step.title} delay={0.1}>
              <div className="process-step">
                <div className="step-spacer" />
                <div className="step-dot" />
                <div className="step-content">
                  <div className="step-number">{number}</div>
                  <h3>{step.title}</h3>
                  <p style={{ fontSize: "0.9rem" }}>{step.description}</p>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
