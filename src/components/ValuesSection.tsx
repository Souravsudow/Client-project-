"use client";

import AnimatedSection from "./AnimatedSection";
import { AnimatedStagger } from "./AnimatedStagger";
import { values, company } from "@/lib/site";

export default function ValuesSection() {
  return (
    <section id="values" className="section values-section">
      <AnimatedSection className="values-heading">
        <span className="section-kicker">Our Values</span>
        <h2>The Standards We Live By</h2>
        <p>
          Five principles that guide every project we take on — from the first
          site visit to the final handover.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <AnimatedStagger className="values-grid">
          {values.map((value) => (
            <div key={value.title} className="value-card">
              <div className="value-marker" />
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </div>
          ))}
        </AnimatedStagger>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <blockquote className="commitment-quote">
          <span className="commitment-kicker">Our Commitment</span>
          <p>{company.commitment}</p>
          <cite>{company.slogan}</cite>
        </blockquote>
      </AnimatedSection>
    </section>
  );
}
