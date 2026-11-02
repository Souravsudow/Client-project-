"use client";

import type { ReactNode } from "react";

interface GlassButtonProps {
  href?: string;
  variant?: "primary" | "neutral" | "light";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export default function GlassButton({
  href,
  variant = "primary",
  children,
  className = "",
  onClick,
  target,
  rel,
}: GlassButtonProps) {
  const variantClass =
    variant === "neutral"
      ? "glass-btn glass-btn-neutral"
      : variant === "light"
        ? "glass-btn glass-btn-light"
        : "glass-btn";

  if (href) {
    return (
      <a
        href={href}
        className={`${variantClass} ${className}`}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={`${variantClass} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
