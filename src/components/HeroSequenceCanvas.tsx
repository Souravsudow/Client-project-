"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const FRAME_COUNT = 506;

export default function HeroSequenceCanvas({ scrollYProgress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const readyRef = useRef(false);
  const frameIndexRef = useRef(0);

  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Map scroll progress to frame index
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, FRAME_COUNT - 1]
  );

  // Draw an image to the canvas mimicking object-fit: cover
  const drawImageCover = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      canvas: HTMLCanvasElement
    ) => {
      if (!img.naturalWidth || !img.naturalHeight) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;

      let drawWidth: number;
      let drawHeight: number;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    []
  );

  // Size the canvas to the viewport at device pixel ratio, capped at 2 so
  // high-DPR screens don't allocate an oversized drawing buffer.
  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.round(window.innerWidth * dpr);
    const height = Math.round(window.innerHeight * dpr);

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }, []);

  // Draw the requested frame, falling back to the nearest decoded frame so
  // scrolling stays responsive while the rest of the sequence arrives.
  const drawFrame = useCallback(
    (target: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(target)));
      const images = imagesRef.current;

      for (let i = idx; i >= 0; i--) {
        const img = images[i];
        if (img?.complete && img.naturalWidth) {
          drawImageCover(ctx, img, canvas);
          return;
        }
      }
    },
    [drawImageCover]
  );

  // Preload the sequence, painting frame 1 as soon as it decodes instead of
  // waiting for all 506 frames.
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);

    const handleFrame = (index: number) => {
      if (cancelled) return;

      loadedCount += 1;
      setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));

      if (!readyRef.current && index === 0) {
        sizeCanvas();
        drawFrame(0);
        readyRef.current = true;
        setReady(true);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = `/frames/${String(i + 1).padStart(3, "0")}.webp`;

      img.onload = () => handleFrame(i);
      img.onerror = () => {
        console.warn(`Failed to load frame ${i + 1}.webp`);
        handleFrame(i);
      };

      images[i] = img;
    }

    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, [drawFrame, sizeCanvas]);

  // Keep the canvas sharp and correctly framed on resize/orientation change
  useEffect(() => {
    const handleResize = () => {
      sizeCanvas();
      drawFrame(frameIndexRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame, sizeCanvas]);

  // Render the correct frame on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    frameIndexRef.current = latest;
    if (!readyRef.current) return;
    drawFrame(latest);
  });

  return (
    <div style={{ position: "absolute", inset: 0, backgroundColor: "#000" }}>
      {/* Loading indicator */}
      {!ready && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 30,
            gap: "16px",
          }}
        >
          <span
            style={{
              color: "#555",
              fontSize: "12px",
              letterSpacing: "0.2em",
              fontFamily: "var(--font-sans), sans-serif",
              textTransform: "uppercase",
            }}
          >
            Loading Sequence
          </span>
          <div
            style={{
              width: "200px",
              height: "2px",
              backgroundColor: "#1a1a1a",
              borderRadius: "1px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${loadProgress}%`,
                height: "100%",
                backgroundColor: "#c9a96e",
                transition: "width 0.15s ease-out",
              }}
            />
          </div>
          <span
            style={{
              color: "#444",
              fontSize: "11px",
              fontFamily: "var(--font-sans), monospace",
            }}
          >
            {loadProgress}%
          </span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
