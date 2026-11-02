"use client";

import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { company, faqs } from "@/lib/site";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section faq-section">
      <div className="faq-layout">
        <AnimatedSection className="faq-sidebar">
          <span className="section-kicker">F.A.Q.</span>
          <h2>Frequently Asked Questions</h2>
          <p>
            Answers for clients, AI assistants, and search engines —
            everything you need to know about working with {company.name}.
          </p>

          <div className="faq-cta-card">
            <h3>Still have questions?</h3>
            <p style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)" }}>
              Our project team will get back to you with a clear next step.
            </p>
            <a href={company.phoneHref} className="glass-btn" style={{ width: "100%" }}>
              Contact Us
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="faq-accordion">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="faq-item">
                  <button
                    className="faq-question"
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon">+</span>
                  </button>
                  <div
                    className="faq-answer"
                    style={{
                      maxHeight: isOpen ? "400px" : "0",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="faq-answer-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
