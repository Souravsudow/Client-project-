"use client";

import AnimatedSection from "./AnimatedSection";
import { AnimatedStagger } from "./AnimatedStagger";
import { company, trustPoints } from "@/lib/site";

const activityIcons = [
  "M13 2 4 14h7l-1 8 10-12h-7l1-8Z",
  "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
  "m3 10 9-7 9 7v10h-6v-6H9v6H3V10Z",
  "m14 4 6 6-9 9-6-6 9-9ZM5 13l-2 2v6h6l2-2",
  "m4 7 8-4 8 4-8 4-8-4Zm0 5 8 4 8-4M4 17l8 4 8-4",
  "M4 5h16l-8 9-8-9Zm8 9v7",
  "M9 3v7m6-7v7M7 10h10v2a5 5 0 0 1-5 5v4m-3-11V7a3 3 0 0 1 6 0v3",
  "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  "M3 5h18M6 5v14m6-14v14m6-14v14M3 19h18",
  "M4 4v16m5-16v16m5-16v16m5-16v16M3 8h18m-18 8h18",
];

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
          
          <AnimatedStagger className="activity-grid">
            {company.activities.map((activity, index) => (
              <article key={activity} className="activity-card">
                <div className="activity-card-top">
                  <span className="activity-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d={activityIcons[index % activityIcons.length]} />
                    </svg>
                  </span>
                  <span className="activity-index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{activity}</h3>
              </article>
            ))}
          </AnimatedStagger>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <AnimatedStagger className="trust-badges">
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
        </AnimatedStagger>
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
