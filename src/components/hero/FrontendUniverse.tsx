/**
 * FrontendUniverse.tsx
 *
 * Interactive engineering identity visual for a React / Next.js portfolio hero.
 * Tech nodes travel on individual circular offset-paths (one ring per card),
 * staying upright via offset-rotate while revolving around the core.
 * No overflow clipping — cards float into the page backdrop.
 */

"use client";

import { HTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface NodeItem {
  id: string;
  label: string;
  detail: string;
  angle: number;
  accent: "yellow" | "pink" | "purple" | "cyan";
  orbitOffset: number;
  orbitDuration: number;
  orbitReverse: boolean;
}

interface FrontendUniverseProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

const nodes: NodeItem[] = [
  { id: "react", label: "REACT", detail: "Components · Systems", angle: -68, accent: "cyan", orbitOffset: -12, orbitDuration: 30, orbitReverse: false },
  { id: "next", label: "NEXT.JS", detail: "App architecture", angle: -22, accent: "yellow", orbitOffset: -6, orbitDuration: 24, orbitReverse: true },
  { id: "typescript", label: "TYPESCRIPT", detail: "Safe · Scalable", angle: 23, accent: "pink", orbitOffset: 0, orbitDuration: 34, orbitReverse: false },
  { id: "motion", label: "MOTION", detail: "Micro interactions", angle: 66, accent: "purple", orbitOffset: 6, orbitDuration: 22, orbitReverse: true },
  { id: "ux", label: "UX / UI", detail: "Clarity · Detail", angle: 135, accent: "cyan", orbitOffset: 12, orbitDuration: 28, orbitReverse: false },
  { id: "aws", label: "AWS", detail: "Deploy · Scale", angle: 184, accent: "yellow", orbitOffset: 18, orbitDuration: 26, orbitReverse: true },
  { id: "testing", label: "QUALITY", detail: "Perf · Testing", angle: 224, accent: "pink", orbitOffset: 24, orbitDuration: 32, orbitReverse: false },
  { id: "design", label: "DESIGN SYSTEM", detail: "Tokens · Patterns", angle: -135, accent: "purple", orbitOffset: 30, orbitDuration: 20, orbitReverse: true },
];

const accentMap = {
  yellow: { text: "#B9824A", glow: "rgba(185,130,74,.28)", border: "rgba(185,130,74,.22)" },
  pink: { text: "#C87886", glow: "rgba(200,120,134,.28)", border: "rgba(200,120,134,.22)" },
  purple: { text: "#8067A1", glow: "rgba(128,103,161,.28)", border: "rgba(128,103,161,.22)" },
  cyan: { text: "#4B9AA5", glow: "rgba(75,154,165,.28)", border: "rgba(75,154,165,.22)" },
};

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

function distanceForWidth(w: number) {
  if (w < 380) return 26;
  if (w < 460) return 28;
  if (w < 540) return 30;
  return 32;
}

function coreSizeForWidth(w: number) {
  if (w < 380) return 90;
  if (w < 460) return 110;
  if (w < 540) return 130;
  return 150;
}

export default function FrontendUniverse({ interactive = true, className = "", ...props }: FrontendUniverseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(32);
  const [coreSize, setCoreSize] = useState(90);
  const [stageBox, setStageBox] = useState({ w: 320, h: 320 });
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const el = stageRef.current ?? containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth || 320;
      const h = el.clientHeight || w;
      const size = Math.min(w, h);
      setStageBox({ w, h });
      setDistance(distanceForWidth(size));
      setCoreSize(coreSizeForWidth(size));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setPointer({ x: clamp(x * 30, -15, 15), y: clamp(y * 22, -11, 11) });
  }, [interactive]);

  const handleLeave = useCallback(() => {
    setPointer({ x: 0, y: 0 });
    setActive(null);
  }, []);

  return (
    <div
      {...props}
      ref={containerRef}
      className={`fu-root group relative w-full select-none ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handleLeave}
    >
      {/* Ambient lighting — extends into backdrop */}
      <div className="pointer-events-none absolute -inset-20">
        <div
          className="fu-ambient absolute left-[18%] top-[22%] h-64 w-64 rounded-full blur-[100px] transition-transform duration-500"
          style={{
            background: "radial-gradient(circle, rgba(185,130,74,.18), rgba(200,120,134,.04) 48%, transparent 72%)",
            transform: `translate3d(${pointer.x * 0.35}px, ${pointer.y * 0.3}px, 0)`,
          }}
        />
        <div
          className="fu-ambient absolute bottom-[18%] right-[11%] h-72 w-72 rounded-full blur-[110px] transition-transform duration-500"
          style={{
            background: "radial-gradient(circle, rgba(128,103,161,.16), rgba(75,154,165,.06) 45%, transparent 72%)",
            transform: `translate3d(${pointer.x * -0.28}px, ${pointer.y * -0.25}px, 0)`,
          }}
        />
        <div
          className="fu-ambient absolute left-[50%] top-[50%] h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] transition-transform duration-500"
          style={{
            background: "radial-gradient(circle, rgba(128,103,161,.08), rgba(75,154,165,.04) 40%, transparent 65%)",
            transform: `translate(calc(-50% + ${pointer.x * 0.15}px), calc(-50% + ${pointer.y * 0.15}px))`,
          }}
        />
      </div>

      {/* Universe stage — keep square so orbit %/px geometry stays circular */}
      <div
        ref={stageRef}
        className="relative mx-auto aspect-square w-full max-w-[560px] min-h-[280px] transition-transform duration-500 ease-out"
        style={{ transform: `perspective(1200px) rotateX(${pointer.y * -0.18}deg) rotateY(${pointer.x * 0.2}deg)` }}
      >
        {/* Central core — the "sun" with glow */}
        <div
          className="hero-core absolute left-1/2 top-1/2 grid place-items-center rounded-full border border-white/[0.14] bg-[#101218]/84 backdrop-blur-2xl transition-all duration-500"
          style={{
            width: coreSize,
            height: coreSize,
            transform: `translate(-50%, -50%) translate(${pointer.x * 0.42}px, ${pointer.y * 0.42}px)`,
            boxShadow: `
              0 0 60px 10px rgba(185,130,74,.25),
              0 0 120px 30px rgba(128,103,161,.18),
              0 0 200px 60px rgba(75,154,165,.08),
              0 20px 70px rgba(0,0,0,.5)
            `,
          }}
        >
          <div
            className="pointer-events-none absolute inset-[-30%] rounded-full opacity-60"
            style={{
              background: "radial-gradient(circle, rgba(185,130,74,.15), rgba(128,103,161,.08) 40%, transparent 70%)",
            }}
          />
          <div className="relative grid place-items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={150}
              className="h-full w-full object-cover rounded-full"
              priority
              style={{ objectFit: "cover" }}
            />
            <div className="absolute -bottom-2 h-20 w-40 rounded-full bg-[#8067A1]/10 blur-xl" />
          </div>
          <div className="hero-status-badge absolute bottom-[11%] flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4B9AA5] shadow-[0_0_12px_#4B9AA5]" />
            <span className="hero-label-muted text-[7px] font-semibold tracking-[0.22em] text-white/45">ONLINE · BUILDING</span>
          </div>
        </div>

        {/* Orbiting tech nodes — offset-path keeps each card locked to its ring */}
        {nodes.map((node, index) => {
          const accent = accentMap[node.accent];
          const isActive = active === node.id;
          const stageSize = Math.min(stageBox.w, stageBox.h) || 320;
          const orbitRadiusPct = distance + node.orbitOffset;
          const orbitRadiusPx = (orbitRadiusPct / 100) * stageSize;
          const orbitDiameterPx = orbitRadiusPx * 2;
          // Design angles are clockwise-from-top; CSS circle() paths start at 3 o'clock.
          const startFromTop = ((node.angle + 90) % 360 + 360) % 360;
          const startFromEast = (startFromTop + 270) % 360;
          // With animation-direction: reverse, negative delay seeks the mirrored phase.
          const phase = node.orbitReverse ? (360 - startFromEast) % 360 : startFromEast;
          const delay = -(phase / 360) * node.orbitDuration;

          return (
            <div key={node.id}>
              <div
                className="fu-orbit-path pointer-events-none absolute rounded-full border border-dashed"
                style={{
                  width: orbitDiameterPx,
                  height: orbitDiameterPx,
                  left: `calc(50% - ${orbitRadiusPx}px)`,
                  top: `calc(50% - ${orbitRadiusPx}px)`,
                  borderWidth: "1.5px",
                  borderColor: `${accent.text}33`,
                }}
              />

              <div
                className="fu-orbit-traveler pointer-events-none absolute left-0 top-0 h-0 w-0"
                style={{
                  offsetPath: `circle(${orbitRadiusPx}px at ${stageBox.w / 2}px ${stageBox.h / 2}px)`,
                  offsetRotate: "0deg",
                  offsetAnchor: "center",
                  animation: `fu-orbit-travel ${node.orbitDuration}s linear infinite`,
                  animationDelay: `${delay}s`,
                  animationDirection: node.orbitReverse ? "reverse" : "normal",
                }}
              >
                <button
                  type="button"
                  aria-label={`${node.label}: ${node.detail}`}
                  onPointerEnter={() => setActive(node.id)}
                  onPointerLeave={() => setActive(null)}
                  className={`hero-tech-node pointer-events-auto min-w-[80px] sm:min-w-[95px] md:min-w-[110px] max-w-[120px] sm:max-w-[134px] rounded-2xl border bg-[#0D0F15]/84 px-2 py-2 sm:px-2.5 sm:py-2.5 md:px-3 md:py-3 text-left backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,.32)] transition-[transform,box-shadow,border-color] duration-500 ease-out ${isActive ? "scale-[1.08]" : ""}`}
                  style={{
                    transform: "translate(-50%, -50%)",
                    width: "max(16%, 80px)",
                    borderColor: isActive ? accent.border : "rgba(255,255,255,.09)",
                    boxShadow: isActive ? `0 20px 60px rgba(0,0,0,.42), 0 0 30px ${accent.glow}` : "0 20px 50px rgba(0,0,0,.32)",
                  }}
                >
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full shadow-[0_0_11px_currentColor]" style={{ color: accent.text, background: "currentColor" }} />
                      <span className="hero-label-bold text-[7px] sm:text-[8px] font-bold tracking-[0.23em] text-white/48">{node.label}</span>
                    </div>
                    <span className="hero-label-faint text-[7px] sm:text-[8px] text-white/20">{index + 1}</span>
                  </div>
                  <div className="hero-label-detail text-[9px] sm:text-[10px] font-medium text-white/74">{node.detail}</div>
                  <div className={`mt-1.5 h-px w-full transition-all duration-500 ${isActive ? "opacity-70" : "opacity-15"}`} style={{ background: `linear-gradient(90deg, ${accent.text}, transparent)` }} />
                </button>
              </div>
            </div>
          );
        })}

        {/* Stars */}
        {[
          ["18%", "14%", "#B9824A"],
          ["88%", "26%", "#4B9AA5"],
          ["10%", "51%", "#8067A1"],
          ["84%", "83%", "#C87886"],
          ["47%", "91%", "#B9824A"],
        ].map(([left, top, color], i) => (
          <span
            key={i}
            className="hero-star absolute h-1 w-1 animate-pulse rounded-full"
            style={{
              left,
              top,
              background: color,
              color,
              boxShadow: `0 0 14px ${color}`,
              animationDelay: `${i * 270}ms`,
            }}
          />
        ))}
      </div>

      <div className="hero-caption absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
        <div className="mb-1 flex items-center justify-center gap-2">
          <span className="hero-divider h-px w-6 bg-white/10" />
          <span className="hero-label-faint text-[8px] font-semibold tracking-[0.3em] text-white/25">FRONTEND UNIVERSE</span>
          <span className="hero-divider h-px w-6 bg-white/10" />
        </div>
        <p className="hero-label-faint text-[10px] text-white/24">systems · interfaces · experiences</p>
      </div>
    </div>
  );
}
