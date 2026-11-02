"use client";

import AnimatedSection from "./AnimatedSection";

interface SectionDividerProps {
  image?: string;
  stats?: Array<{ number: string; label: string }>;
}

export default function SectionDivider({ 
  image = "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?w=1600&h=600&fit=crop&q=80",
  stats = [
    { number: "10", label: "Licensed Activities" },
    { number: "3", label: "Core Expertise Areas" },
    { number: "100%", label: "Client Satisfaction Focus" }
  ]
}: SectionDividerProps) {
  return (
    <div className="parallax-divider" style={{ backgroundImage: `url(${image})` }}>
      <AnimatedSection>
        <div className="divider-stats">
          {stats.map((stat, i) => (
            <div key={i} className="divider-stat">
              <span className="big-number">{stat.number}</span>
              <span className="stat-desc">{stat.label}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
