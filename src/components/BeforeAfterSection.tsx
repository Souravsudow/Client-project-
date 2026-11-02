"use client";

import { useState, useRef } from "react";
import AnimatedSection from "./AnimatedSection";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

function BeforeAfterSlider({ beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After" }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return; // Only when left mouse button is pressed
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div 
      className="ba-slider-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={(e) => handleMove(e.clientX)}
    >
      <img src={beforeImage} alt={beforeLabel} className="ba-image before" />
      <img 
        src={afterImage} 
        alt={afterLabel} 
        className="ba-image after" 
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      />
      <div className="ba-slider-handle" style={{ left: `${sliderPosition}%` }} />
      <span className="ba-label label-before">{beforeLabel}</span>
      <span className="ba-label label-after">{afterLabel}</span>
    </div>
  );
}

export default function BeforeAfterSection() {
  return (
    <section id="transformations" className="section before-after-section">
      <AnimatedSection>
        <div className="before-after-heading">
          <span className="section-kicker">Transformations</span>
          <h2>Before & After</h2>
          <p>
            Slide to see the difference. We transform spaces with precision, turning outdated or raw structures into premium environments.
          </p>
        </div>
      </AnimatedSection>
      
      <AnimatedSection delay={0.2}>
        <div className="ba-showcase">
          <BeforeAfterSlider 
            beforeImage="https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=600&fit=crop&q=80" 
            afterImage="https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&h=600&fit=crop&q=80" 
          />
          <BeforeAfterSlider 
            beforeImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop&q=80" 
            afterImage="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop&q=80" 
          />
        </div>
        <div className="ba-project-info">
          <span className="ba-info-pill">Luxury Villa Renovation</span>
          <span className="ba-info-pill">Commercial Fit-out</span>
        </div>
      </AnimatedSection>
    </section>
  );
}
