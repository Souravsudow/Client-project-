"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

interface Props {
  className?: string;
  scrollYProgress: MotionValue<number>;
}

const FRAME_COUNT = 506;

export default function HeroSequenceCanvas({ className, scrollYProgress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mobileBackdropRef = useRef<HTMLCanvasElement | null>(null);
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

      // On portrait screens, keep the complete 16:9 frame (including the
      // baked-in IMNAZ wordmark) sharp, and use a dimmed blurred crop behind it
      // to fill the tall viewport. Desktop keeps the original cover treatment.
      if (canvasRatio < 0.75) {
        const backdrop = mobileBackdropRef.current ?? document.createElement("canvas");
        mobileBackdropRef.current = backdrop;

        const backdropWidth = Math.min(240, Math.max(160, Math.round(canvas.width * 0.3)));
        const backdropHeight = Math.round(backdropWidth / canvasRatio);
        if (backdrop.width !== backdropWidth || backdrop.height !== backdropHeight) {
          backdrop.width = backdropWidth;
          backdrop.height = backdropHeight;
        }

        const backdropContext = backdrop.getContext("2d");
        if (!backdropContext) return;

        const backdropScale = Math.max(backdropWidth / img.naturalWidth, backdropHeight / img.naturalHeight);
        const backdropDrawWidth = img.naturalWidth * backdropScale;
        const backdropDrawHeight = img.naturalHeight * backdropScale;
        backdropContext.clearRect(0, 0, backdropWidth, backdropHeight);
        backdropContext.filter = "blur(8px) brightness(0.58) saturate(0.88)";
        backdropContext.drawImage(
          img,
          (backdropWidth - backdropDrawWidth) / 2,
          (backdropHeight - backdropDrawHeight) / 2,
          backdropDrawWidth,
          backdropDrawHeight
        );
        backdropContext.filter = "none";

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backdrop, 0, 0, canvas.width, canvas.height);
        const shade = ctx.createLinearGradient(0, 0, 0, canvas.height);
        shade.addColorStop(0, "rgba(8, 11, 18, 0.2)");
        shade.addColorStop(0.5, "rgba(8, 11, 18, 0.08)");
        shade.addColorStop(1, "rgba(8, 11, 18, 0.25)");
        ctx.fillStyle = shade;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const fitScale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        // A slight 8% oversize gives the landscape band more presence while
        // leaving enough side safe-area for the full IMNAZ wordmark.
        const mobileFitScale = fitScale * 1.08;
        const fitWidth = img.naturalWidth * mobileFitScale;
        const fitHeight = img.naturalHeight * mobileFitScale;
        const fitX = (canvas.width - fitWidth) / 2;
        const fitY = (canvas.height - fitHeight) / 2;
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 18;
        ctx.drawImage(img, fitX, fitY, fitWidth, fitHeight);
        ctx.restore();
        return;
      }

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
    // Mobile uses the dedicated portrait MP4 instead of downloading 506 frames.
    if (window.matchMedia("(max-width: 767px), (max-height: 600px) and (pointer: coarse)").matches) return;

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
    <div className={className} style={{ position: "absolute", inset: 0, backgroundColor: "#000" }}>
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
