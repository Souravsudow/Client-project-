"use client";

import AnimatedSection from "./AnimatedSection";
import Marquee from "./Marquee";
import AnimatedCounter from "./AnimatedCounter";
import { company } from "@/lib/site";

export default function AboutSection() {
  return (
    <>
      <section id="about" className="section about-section">
        <AnimatedSection>
          <span className="section-kicker">Company Overview</span>
        </AnimatedSection>

        <div className="about-layout">
          <AnimatedSection className="about-text" delay={0.1}>
            <h1>{company.tagline}</h1>
            <div className="intro-body">
              <p className="drop-cap">{company.overview[0]}</p>
              {company.overview.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>
                Registered with the Dubai Department of Economy and Tourism
                under License No. {company.license}, with{" "}
                <strong>{company.activities.length} licensed activity categories</strong>.
              </p>
            </div>

            <div className="about-stats stagger">
              <AnimatedSection className="about-stat" delay={0.1}>
                <span className="stat-number">
                  <AnimatedCounter target={company.activities.length} />
                </span>
                <span className="stat-label">Licensed Activities</span>
              </AnimatedSection>
              <AnimatedSection className="about-stat" delay={0.25}>
                <span className="stat-number">
                  <AnimatedCounter target={3} />
                </span>
                <span className="stat-label">Core Expertise</span>
              </AnimatedSection>
              <AnimatedSection className="about-stat" delay={0.4}>
                <span className="stat-number">
                  <AnimatedCounter target={100} suffix="%" />
                </span>
                <span className="stat-label">Satisfaction Focus</span>
              </AnimatedSection>
            </div>

            <div className="about-mission-vision stagger">
              <div className="mv-card">
                <h3>Our Mission</h3>
                <p style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>{company.mission}</p>
              </div>
              <div className="mv-card">
                <h3>Our Vision</h3>
                <p style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>{company.vision}</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="about-image-wrap" delay={0.2}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1200&fit=crop&q=80"
              alt="Premium interior renovation in Dubai — marble flooring and modern lighting by IMNAZ MOON Technical Services"
              loading="lazy"
            />
            <div className="about-stat-card">
              <strong>{company.activities.length}</strong>
              <span>Licensed Activity Categories</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Marquee
        items={[
          "Engineering Excellence",
          "Quality Workmanship",
          "Trusted Service",
          "On-Time Delivery",
          "Dubai Based",
          "UAE Coverage",
          "Quality First",
          "Safety Standards",
          "Transparent Pricing"
        ]}
      />
    </>
  );
}
