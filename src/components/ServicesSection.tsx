"use client";

import AnimatedSection from "./AnimatedSection";
import { AnimatedStagger } from "./AnimatedStagger";
import { services } from "@/lib/site";

export default function ServicesSection() {
  return (
    <section id="services" className="section services-section">
      <div className="services-heading">
        <AnimatedSection>
          <span className="section-kicker">What We Do</span>
          <h2>Technical & Interior Mastery</h2>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <p>
            We provide specialized technical and interior fit-out solutions designed to enhance performance, durability, and aesthetics across every project phase.
          </p>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.2}>
        <div 
          className="service-hero-card"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1504307651254-35680f356f12?w=1600&h=800&fit=crop&q=80)` }}
        >
          <div className="service-hero-inner">
            <div className="service-number">01</div>
            <div className="service-label">{services[0].tier}</div>
            <h3>{services[0].title}</h3>
            <p>{services[0].summary}</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedStagger className="services-grid">
        {services.slice(1).map((service, index) => {
          const number = String(index + 2).padStart(2, "0");
          const accents = ["accent-bronze", "accent-teal", "accent-oxide", "accent-bronze", "accent-teal"];
          const accent = accents[index % accents.length];
          
          return (
              <div key={service.title} className="service-card">
                <div className={`card-accent ${accent}`} />
                <div className="card-bg-number">{number}</div>
                <div className="service-number">{number}</div>
                <div className="service-label">{service.tier}</div>
                <h3>{service.title}</h3>
                <p style={{ fontSize: "0.88rem" }}>{service.summary}</p>
              </div>
          );
        })}
      </AnimatedStagger>
    </section>
  );
}
