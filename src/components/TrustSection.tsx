"use client";

import AnimatedSection from "./AnimatedSection";
import { company, trustPoints } from "@/lib/site";

export default function TrustSection() {
  return (
    <section id="trust" className="section trust-section">
      <AnimatedSection className="trust-heading">
        <span className="section-kicker">Credentials &amp; Verification</span>
        <h2>Licensed. Registered. Verified.</h2>
        <p>
          {company.name} holds an active commercial license issued by the
          Dubai Department of Economy and Tourism, covering {company.activities.length}{" "}
          activity categories across technical services and interior works.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="license-card">
          <div className="license-watermark">IM</div>
          <svg className="license-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
          <div className="license-number">{company.license}</div>
          <div className="license-issuer">
            Issued by Dubai Department of Economy &amp; Tourism
          </div>
          
          <div className="activity-pills stagger">
            {company.activities.map((activity) => (
              <span key={activity} className="activity-pill">
                {activity}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="trust-badges stagger">
          {[
            { label: "Dubai Based", desc: "Headquartered in Dubai, UAE" },
            { label: "UAE Coverage", desc: "Serving clients across the UAE" },
            { label: "DET Verified", desc: "Govt. licensed & registered" },
            { label: "Safety Compliant", desc: "Full HSE adherence" },
          ].map((badge) => (
            <div key={badge.label} className="trust-badge">
              <div className="badge-check">✓</div>
              <h3>{badge.label}</h3>
              <p>{badge.desc}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.3} className="trust-points-wrap">
        <h2 className="trust-points-heading">Why Clients Trust Us</h2>
        <div className="trust-points stagger">
          {trustPoints.map((point) => (
            <div key={point} className="trust-point">
              <span className="trust-point-check">✓</span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
