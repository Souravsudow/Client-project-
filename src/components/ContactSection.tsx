"use client";

import AnimatedSection from "./AnimatedSection";
import { company, siteUrl } from "@/lib/site";

export default function ContactSection() {
  const whatsappUrl = `https://wa.me/${company.phone.replace(/[^0-9]/g, "")}`;

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-layout">
        <AnimatedSection className="contact-text">
          <span className="section-kicker">Get in Touch</span>
          <h2>Ready to Transform Your Space?</h2>
          <p>
            Share your project details — site photos, scope, and location — and our team will follow up with a clear next step.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="contact-cards stagger">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-card whatsapp-card" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <div>
              <h3>WhatsApp</h3>
              <p>Send photos & voice notes for instant review.</p>
            </div>
            <div className="card-action">
              <span className="glass-btn" style={{ padding: "8px 16px", fontSize: "0.65rem", background: "rgba(37, 211, 102, 0.2)", borderColor: "rgba(37, 211, 102, 0.4)" }}>Message</span>
            </div>
          </a>

          <a href={company.phoneHref} className="contact-card" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div>
              <h3>Call Us</h3>
              <p>Speak directly with our project team.</p>
            </div>
            <div className="card-action">
              <span className="glass-btn-light" style={{ padding: "8px 16px", fontSize: "0.65rem" }}>{company.phone}</span>
            </div>
          </a>

          <a href={company.emailHref} className="contact-card" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div>
              <h3>Email Inquiry</h3>
              <p>Send a detailed inquiry for a structured response.</p>
            </div>
            <div className="card-action">
              <span className="glass-btn-light" style={{ padding: "8px 16px", fontSize: "0.65rem" }}>Email</span>
            </div>
          </a>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.2} as="footer" className="site-footer">
        <div className="footer-grid">
          <div>
            <h3>{company.shortName}</h3>
            <span className="footer-label">Technical Service LLC</span>
            <p style={{ maxWidth: "240px" }}>
              {company.mission}
            </p>
          </div>
          <div>
            <span className="footer-label">Company</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="#about">About Us</a>
              <a href="#services">Services</a>
              <a href="#sectors">Sectors</a>
              <a href="#process">Process</a>
            </div>
          </div>
          <div>
            <span className="footer-label">Legal & Trust</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href="#trust">Licenses & Verification</a>
              <span>DET License: {company.license}</span>
              <a href={siteUrl}>imnazmoontechnicalservices.com</a>
            </div>
          </div>
          <div>
            <span className="footer-label">Connect</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href={company.phoneHref}>Call Us</a>
              <a href={company.emailHref}>Email</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <p>Dubai, United Arab Emirates</p>
        </div>
      </AnimatedSection>
    </section>
  );
}
