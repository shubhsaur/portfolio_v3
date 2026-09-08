/**
 * FrontendUniverse.tsx
 *
 * Interactive engineering identity visual for a React / Next.js portfolio hero.
 * No external dependencies.
 */

"use client";

import { CSSProperties, HTMLAttributes, useMemo, useState } from "react";
import Image from "next/image";

interface NodeItem {
  id: string;
  label: string;
  detail: string;
  angle: number;
  distance: number;
  accent: "yellow" | "pink" | "purple" | "cyan";
}

interface FrontendUniverseProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

const nodes: NodeItem[] = [
  { id: "react", label: "REACT", detail: "Components · Systems", angle: -68, distance: 42, accent: "cyan" },
  { id: "next", label: "NEXT.JS", detail: "App architecture", angle: -22, distance: 42, accent: "yellow" },
  { id: "typescript", label: "TYPESCRIPT", detail: "Safe · Scalable", angle: 23, distance: 42, accent: "pink" },
  { id: "motion", label: "MOTION", detail: "Micro interactions", angle: 66, distance: 42, accent: "purple" },
  { id: "ux", label: "UX / UI", detail: "Clarity · Detail", angle: 135, distance: 42, accent: "cyan" },
  { id: "aws", label: "AWS", detail: "Deploy · Scale", angle: 184, distance: 42, accent: "yellow" },
  { id: "testing", label: "QUALITY", detail: "Perf · Testing", angle: 224, distance: 42, accent: "pink" },
  { id: "design", label: "DESIGN SYSTEM", detail: "Tokens · Patterns", angle: -135, distance: 42, accent: "purple" },
];

const accentMap = {
  yellow: { text: "#FFD45C", glow: "rgba(255,212,92,.38)", border: "rgba(255,212,92,.28)" },
  pink: { text: "#F58AAA", glow: "rgba(245,138,170,.38)", border: "rgba(245,138,170,.28)" },
  purple: { text: "#9B7CFF", glow: "rgba(155,124,255,.38)", border: "rgba(155,124,255,.28)" },
  cyan: { text: "#66DFF5", glow: "rgba(102,223,245,.38)", border: "rgba(102,223,245,.28)" },
};

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

export default function FrontendUniverse({ interactive = true, className = "", ...props }: FrontendUniverseProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState<string | null>(null);

  const rootStyle = useMemo(
    () => ({ "--mx": `${pointer.x}px`, "--my": `${pointer.y}px` }) as CSSProperties,
    [pointer]
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setPointer({ x: clamp(x * 30, -15, 15), y: clamp(y * 22, -11, 11) });
  };

  const handleLeave = () => {
    setPointer({ x: 0, y: 0 });
    setActive(null);
  };

  return (
    <div
      {...props}
      className={`group relative aspect-square w-full min-h-[420px] max-h-[560px] select-none ${className}`}
      style={rootStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handleLeave}
    >
      {/* Ambient lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[18%] top-[22%] h-64 w-64 rounded-full blur-[100px] transition-transform duration-500"
          style={{
            background: "radial-gradient(circle, rgba(255,211,91,.24), rgba(255,112,143,.06) 48%, transparent 72%)",
            transform: `translate3d(${pointer.x * 0.35}px, ${pointer.y * 0.3}px, 0)`,
          }}
        />
        <div
          className="absolute bottom-[18%] right-[11%] h-72 w-72 rounded-full blur-[110px] transition-transform duration-500"
          style={{
            background: "radial-gradient(circle, rgba(105,121,255,.22), rgba(64,218,245,.08) 45%, transparent 72%)",
            transform: `translate3d(${pointer.x * -0.28}px, ${pointer.y * -0.25}px, 0)`,
          }}
        />
        <div
          className="absolute left-[50%] top-[50%] h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] transition-transform duration-500"
          style={{
            background: "radial-gradient(circle, rgba(155,124,255,.10), rgba(102,223,245,.06) 40%, transparent 65%)",
            transform: `translate(calc(-50% + ${pointer.x * 0.15}px), calc(-50% + ${pointer.y * 0.15}px))`,
          }}
        />
      </div>

      {/* Universe stage */}
      <div
        className="absolute inset-[4%] transition-transform duration-500 ease-out"
        style={{ transform: `perspective(1200px) rotateX(${pointer.y * -0.18}deg) rotateY(${pointer.x * 0.2}deg)` }}
      >
        {/* Fine orbital rings */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.13]"
          style={{ transform: `translate(calc(-50% + ${pointer.x * 0.2}px), calc(-50% + ${pointer.y * 0.2}px)) rotate(${pointer.x * 0.1}deg)` }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.15]"
          style={{ transform: `translate(calc(-50% + ${pointer.x * 0.35}px), calc(-50% + ${pointer.y * 0.35}px))` }}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.12]" />

        {/* Rotating orbit arcs */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 animate-[spin_26s_linear_infinite] rounded-full border border-dashed border-white/[0.12]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 animate-[spin_19s_linear_infinite_reverse] rounded-full border border-dashed border-white/[0.10]" />

        {/* Connections SVG */}
        <svg viewBox="0 0 500 500" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="universeLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFD45C" stopOpacity=".28" />
              <stop offset="40%" stopColor="#F58AAA" stopOpacity=".5" />
              <stop offset="72%" stopColor="#9B7CFF" stopOpacity=".45" />
              <stop offset="100%" stopColor="#66DFF5" stopOpacity=".22" />
            </linearGradient>
          </defs>
          {nodes.map((node) => {
            const radians = (node.angle * Math.PI) / 180;
            const x = 250 + Math.cos(radians) * (node.distance * 5);
            const y = 250 + Math.sin(radians) * (node.distance * 5);
            const isActive = active === node.id;
            return (
              <g key={node.id}>
                <line x1="250" y1="250" x2={x} y2={y} stroke="url(#universeLine)" strokeWidth={isActive ? "1.2" : ".65"} strokeDasharray={isActive ? "2 2" : "1.6 3"} opacity={isActive ? ".9" : ".4"} />
                {isActive && <circle cx={x} cy={y} r="4" fill="none" stroke={accentMap[node.accent].text} strokeOpacity=".6" strokeWidth="1" />}
              </g>
            );
          })}
        </svg>

        {/* Central core */}
        <div
          className="absolute left-1/2 top-1/2 grid min-h-[150px] min-w-[150px] max-h-[150px] max-w-[150px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/[0.14] bg-[#0A0C12]/84 shadow-[0_20px_70px_rgba(0,0,0,.5)] backdrop-blur-2xl transition-transform duration-500"
          style={{ transform: `translate(calc(-50% + ${pointer.x * 0.42}px), calc(-50% + ${pointer.y * 0.42}px))`, boxShadow: `0 0 80px rgba(155,124,255,.30), 0 20px 70px rgba(0,0,0,.5)` }}
        >
        {/* Central core logo */}
          <div className="relative grid place-items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={150}
              className="h-full w-full object-cover rounded-full"
              priority
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute -bottom-2 h-20 w-40 rounded-full bg-[#8D77FF]/10 blur-xl" />
          </div>
          <div className="absolute bottom-[11%] flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#69E0F5] shadow-[0_0_12px_#69E0F5]" />
            <span className="text-[8px] font-bold tracking-[0.27em] text-white/45">ENGINEERING CORE</span>
          </div>
        </div>

        {/* Technology nodes */}
        {nodes.map((node, index) => {
          const radians = (node.angle * Math.PI) / 180;
          const x = Math.cos(radians) * node.distance;
          const y = Math.sin(radians) * node.distance;
          const accent = accentMap[node.accent];
          const isActive = active === node.id;
          return (
            <button
              key={node.id}
              type="button"
              aria-label={`${node.label}: ${node.detail}`}
              onPointerEnter={() => setActive(node.id)}
              onPointerLeave={() => setActive(null)}
              className={`absolute w-[20%] min-w-[110px] max-w-[134px] rounded-2xl border bg-[#0D0F15]/84 px-3 py-3 text-left backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,.32)] transition-all duration-500 ease-out ${isActive ? "scale-[1.08]" : "hover:-translate-y-1"}`}
              style={{ 
                left: `calc(50% + ${x}%)`, 
                top: `calc(50% + ${y}%)`, 
                transform: `translate(-50%, -50%) translate(${pointer.x * (index % 2 ? -0.45 : 0.45)}px, ${pointer.y * (index % 2 ? -0.35 : 0.35)}px)`,
                borderColor: isActive ? accent.border : "rgba(255,255,255,.09)", 
                boxShadow: isActive ? `0 20px 60px rgba(0,0,0,.42), 0 0 30px ${accent.glow}` : "0 20px 50px rgba(0,0,0,.32)" 
              }}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full shadow-[0_0_11px_currentColor]" style={{ color: accent.text, background: "currentColor" }} />
                  <span className="text-[8px] font-bold tracking-[0.23em] text-white/48">{node.label}</span>
                </div>
                <span className="text-[8px] text-white/20">{index + 1}</span>
              </div>
              <div className="text-[10px] font-medium text-white/74">{node.detail}</div>
              <div className={`mt-2 h-px w-full transition-all duration-500 ${isActive ? "opacity-70" : "opacity-15"}`} style={{ background: `linear-gradient(90deg, ${accent.text}, transparent)` }} />
            </button>
          );
        })}

        {/* Floating status badge */}
        <div className="absolute right-[6%] top-[8%] rounded-full border border-white/[0.08] bg-[#0C0E14]/74 px-3 py-1.5 backdrop-blur-xl transition-transform duration-500" style={{ transform: `translate3d(${pointer.x * -0.28}px, ${pointer.y * -0.22}px, 0)` }}>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#67E8B0] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#67E8B0]" />
            </span>
            <span className="text-[8px] font-semibold tracking-[0.22em] text-white/38">ONLINE · BUILDING</span>
          </div>
        </div>

        {/* Stars */}
        {[["18%", "14%", "#FFD45C"], ["88%", "26%", "#66DFF5"], ["10%", "51%", "#9B7CFF"], ["84%", "83%", "#F58AAA"], ["47%", "91%", "#FFD45C"]].map(([left, top, color], i) => (
          <span key={i} className="absolute h-1 w-1 animate-pulse rounded-full" style={{ left, top, background: color, color, boxShadow: `0 0 14px ${color}`, animationDelay: `${i * 270}ms` }} />
        ))}
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
        <div className="mb-1 flex items-center justify-center gap-2">
          <span className="h-px w-6 bg-white/10" />
          <span className="text-[8px] font-semibold tracking-[0.3em] text-white/25">FRONTEND UNIVERSE</span>
          <span className="h-px w-6 bg-white/10" />
        </div>
        <p className="text-[10px] text-white/24">systems · interfaces · experiences</p>
      </div>
    </div>
  );
}