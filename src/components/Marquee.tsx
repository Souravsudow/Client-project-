"use client";

interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  // Duplicate for seamless loop
  const track = [...items, ...items];

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i}>
            <span className="marquee-dot">•</span>
            &nbsp;&nbsp;{item}&nbsp;&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
