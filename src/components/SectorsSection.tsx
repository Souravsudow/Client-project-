"use client";

import AnimatedSection from "./AnimatedSection";
import { AnimatedStagger } from "./AnimatedStagger";

const sectors = [
  {
    title: "Residential Spaces",
    description: "Interior finishing, maintenance, and electromechanical works for villas, apartments, and private residences.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1200&fit=crop&q=80",
  },
  {
    title: "Commercial Spaces",
    description: "Fit-out, painting, partitioning, and maintenance solutions for offices and commercial buildings.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=900&fit=crop&q=80",
  },
  {
    title: "Industrial Facilities",
    description: "Electromechanical installation, maintenance, and technical fit-out works for industrial facilities.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=1200&fit=crop&q=80",
  },
];

export default function SectorsSection() {
  return (
    <section id="sectors" className="section sectors-section">
      <AnimatedSection className="sectors-heading">
        <span className="section-kicker">Sectors & Industries</span>
        <h2>Spaces We Transform</h2>
      </AnimatedSection>

      <AnimatedStagger className="sectors-grid">
        {sectors.map((sector, index) => {
          const number = String(index + 1).padStart(2, "0");
          return (
              <div key={sector.title} className="sector-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sector.image}
                  alt={sector.title}
                  loading="lazy"
                />
                <div className="sector-overlay">
                  <div className="sector-number">{number}</div>
                  <h3>{sector.title}</h3>
                  <p>{sector.description}</p>
                </div>
              </div>
          );
        })}
      </AnimatedStagger>
    </section>
  );
}
