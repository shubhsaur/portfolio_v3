/**
 * InteractiveSOrb.tsx
 *
 * Personal-brand hero visual centered around the "S" monogram.
 * Designed to match a dark glassmorphism portfolio with
 * warm yellow/coral/pink + violet/cyan accents.
 *
 * Usage:
 *   import InteractiveSOrb from "@/components/InteractiveSOrb";
 *
 *   <InteractiveSOrb className="w-full max-w-[680px]" />
 *
 * No external dependencies.
 */

"use client";

import { CSSProperties, HTMLAttributes, useState } from "react";

interface InteractiveSOrbProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  showLabels?: boolean;
}

const pills = [
  { label: "REACT", angle: -58, color: "#66DFF5" },
  { label: "NEXT.JS", angle: -8, color: "#FFD45C" },
  { label: "MOTION", angle: 48, color: "#9B7CFF" },
  { label: "UI / UX", angle: 110, color: "#F58AAA" },
  { label: "TYPESCRIPT", angle: 168, color: "#66DFF5" },
  { label: "WEB", angle: 220, color: "#FFD45C" },
];

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

export default function InteractiveSOrb({
  interactive = true,
  showLabels = true,
  className = "",
  ...props
}: InteractiveSOrbProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;

    setPointer({
      x: clamp(nx * 26, -13, 13),
      y: clamp(ny * 22, -11, 11),
    });
  };

  const resetPointer = () => {
    setPointer({ x: 0, y: 0 });
    setHovered(null);
    setPressed(false);
  };

  const orbStyle = {
    transform: `translate3d(${pointer.x * 0.18}px, ${pointer.y * 0.18}px, 0)`,
  } as CSSProperties;

  return (
    <div
      {...props}
      className={`group relative aspect-square min-h-[460px] w-full overflow-hidden ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      {/* ambient lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[8%] top-[18%] h-56 w-56 rounded-full blur-[95px] transition-transform duration-500"
          style={{
            background:
              "radial-gradient(circle, rgba(255,208,91,.25), rgba(255,102,137,.08) 46%, transparent 72%)",
            transform: `translate3d(${pointer.x * 0.4}px, ${pointer.y * 0.28}px, 0)`,
          }}
        />
        <div
          className="absolute right-[6%] bottom-[15%] h-72 w-72 rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(111,105,255,.22), rgba(84,221,244,.08) 46%, transparent 72%)",
            transform: `translate3d(${pointer.x * -0.34}px, ${pointer.y * -0.3}px, 0)`,
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[75px] transition-transform duration-500"
          style={{
            background:
              "radial-gradient(circle, rgba(245,125,164,.14), transparent 70%)",
            transform: `translate(calc(-50% + ${pointer.x * 0.1}px), calc(-50% + ${pointer.y * 0.1}px))`,
          }}
        />
      </div>

      {/* stage */}
      <div
        className="absolute inset-[4%] transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(1200px) rotateX(${pointer.y * -0.18}deg) rotateY(${pointer.x * 0.2}deg)`,
        }}
      >
        {/* glass halo / frame */}
        <div className="absolute inset-[4%] rounded-[44px] border border-white/[0.065] bg-white/[0.015] shadow-[inset_0_1px_0_rgba(255,255,255,.045),0_40px_100px_rgba(0,0,0,.25)] backdrop-blur-xl" />

        {/* orbit rings */}
        <div
          className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]"
          style={{
            transform: `translate(calc(-50% + ${pointer.x * 0.18}px), calc(-50% + ${pointer.y * 0.16}px)) rotate(${pointer.x * 0.08}deg)`,
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-[64%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
        <div className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
        <div className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 animate-[spin_30s_linear_infinite] rounded-full border border-dashed border-white/[0.045]" />
        <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 animate-[spin_22s_linear_infinite_reverse] rounded-full border border-dashed border-white/[0.04]" />

        {/* cursor-following light */}
        <div
          className="pointer-events-none absolute h-24 w-24 rounded-full blur-[28px] transition-opacity duration-300"
          style={{
            left: "50%",
            top: "50%",
            opacity: interactive ? 0.9 : 0,
            background:
              "radial-gradient(circle, rgba(255,255,255,.08), transparent 70%)",
            transform: `translate(calc(-50% + ${pointer.x * 2.8}px), calc(-50% + ${pointer.y * 2.8}px))`,
          }}
        />

        {/* orbiting accent particles */}
        <span
          className="absolute left-[24%] top-[16%] h-1.5 w-1.5 animate-pulse rounded-full bg-[#FFD45C] shadow-[0_0_18px_#FFD45C]"
          style={{ transform: `translate3d(${pointer.x * 0.22}px, ${pointer.y * 0.16}px, 0)` }}
        />
        <span
          className="absolute right-[15%] top-[33%] h-1 w-1 animate-pulse rounded-full bg-[#66DFF5] shadow-[0_0_15px_#66DFF5]"
          style={{ animationDelay: "650ms" }}
        />
        <span
          className="absolute left-[15%] bottom-[26%] h-1 w-1 animate-pulse rounded-full bg-[#9B7CFF] shadow-[0_0_15px_#9B7CFF]"
          style={{ animationDelay: "1100ms" }}
        />
        <span
          className="absolute right-[25%] bottom-[15%] h-1.5 w-1.5 animate-pulse rounded-full bg-[#F58AAA] shadow-[0_0_18px_#F58AAA]"
          style={{ animationDelay: "350ms" }}
        />

        {/* orbit labels */}
        {showLabels &&
          pills.map((pill, index) => {
            const radians = (pill.angle * Math.PI) / 180;
            const radius = 155;
            const x = Math.cos(radians) * radius;
            const y = Math.sin(radians) * radius;
            const isHovered = hovered === pill.label;

            return (
              <button
                key={pill.label}
                type="button"
                onPointerEnter={() => setHovered(pill.label)}
                onPointerLeave={() => setHovered(null)}
                className={`absolute left-1/2 top-1/2 rounded-full border px-3 py-2
                            backdrop-blur-xl transition-all duration-500 ease-out ${
                              isHovered
                                ? "scale-110 bg-white/[0.085]"
                                : "bg-[#0D0F15]/55"
                            }`}
                style={{
                  transform: `translate(calc(-50% + ${x + pointer.x * (index % 2 ? -0.6 : 0.6)}px), calc(-50% + ${y + pointer.y * (index % 2 ? -0.48 : 0.48)}px))`,
                  borderColor: isHovered
                    ? `${pill.color}55`
                    : "rgba(255,255,255,.075)",
                  boxShadow: isHovered
                    ? `0 0 28px ${pill.color}18`
                    : "none",
                }}
                aria-label={pill.label}
              >
                <span
                  className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
                  style={{
                    background: pill.color,
                    boxShadow: `0 0 9px ${pill.color}`,
                  }}
                />
                <span className="text-[8px] font-bold tracking-[0.22em] text-white/50">
                  {pill.label}
                </span>
              </button>
            );
          })}

        {/* main interactive orb */}
        <button
          type="button"
          aria-label="Shubham Saurabh interactive brand orb"
          onPointerDown={() => setPressed(true)}
          onPointerUp={() => setPressed(false)}
          onPointerCancel={() => setPressed(false)}
          className={`absolute left-1/2 top-1/2 grid h-[52%] w-[52%] min-h-[225px] min-w-[225px] max-h-[310px] max-w-[310px]
                      -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full
                      border border-white/[0.12] bg-[#0A0C11]/80 shadow-[0_35px_100px_rgba(0,0,0,.55)]
                      backdrop-blur-2xl transition-all duration-500 ease-out ${
                        pressed ? "scale-[0.97]" : "hover:scale-[1.025]"
                      }`}
          style={{
            transform: `translate(calc(-50% + ${pointer.x * 0.48}px), calc(-50% + ${pointer.y * 0.48}px))`,
          }}
        >
          {/* outer gradient rim */}
          <span
            className="pointer-events-none absolute inset-[-1px] rounded-full"
            style={{
              background:
                "conic-gradient(from 195deg, #FFD45C, #F58AAA 22%, #9B7CFF 51%, #66DFF5 74%, #FFD45C)",
              mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: 1.5,
              opacity: hovered ? 1 : 0.85,
            }}
          />

          {/* inner glow */}
          <span
            className="pointer-events-none absolute inset-[8%] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 32% 24%, rgba(255,213,99,.24), transparent 25%), radial-gradient(circle at 72% 70%, rgba(91,221,246,.18), transparent 32%), radial-gradient(circle at 50% 50%, rgba(245,128,164,.08), transparent 64%)",
            }}
          />

          {/* glass specular */}
          <span
            className="pointer-events-none absolute inset-[8%] rounded-full opacity-60"
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,.10), transparent 25%, transparent 65%, rgba(255,255,255,.035))",
            }}
          />

          {/* monogram */}
          <span
            className={`relative z-10 font-black leading-none tracking-[-0.15em]
                        bg-gradient-to-br from-[#FFE273] via-[#F4779C] via-[55%] to-[#69E0F5]
                        bg-clip-text text-transparent transition-all duration-500
                        drop-shadow-[0_0_34px_rgba(245,124,161,.22)]
                        ${
                          hovered
                            ? "scale-110 text-[142px]"
                            : "text-[132px]"
                        }`}
          >
            S
          </span>

          {/* identity */}
          <span className="absolute bottom-[15%] rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 backdrop-blur-md">
            <span className="text-[9px] font-bold tracking-[0.30em] text-white/50">
              SHUBHAM SAURABH
            </span>
          </span>

          {/* tiny pulse */}
          <span className="absolute right-[20%] top-[25%] h-2 w-2 rounded-full bg-white/55 shadow-[0_0_18px_rgba(255,255,255,.55)]" />
        </button>

        {/* hover helper */}
        <div
          className={`pointer-events-none absolute left-1/2 top-[87%] -translate-x-1/2 rounded-full border border-white/[0.07]
                      bg-[#0B0D12]/65 px-3 py-1.5 backdrop-blur-md transition-all duration-500 ${
                        hovered ? "translate-y-0 opacity-100" : "translate-y-1 opacity-55"
                      }`}
        >
          <span className="text-[8px] font-semibold tracking-[0.25em] text-white/32">
            {hovered ? hovered : "MOVE / EXPLORE"}
          </span>
        </div>
      </div>

      {/* caption */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
        <div className="mb-1 flex items-center justify-center gap-2">
          <span className="h-px w-7 bg-white/10" />
          <span className="text-[8px] font-semibold tracking-[0.30em] text-white/23">
            PERSONAL BRAND
          </span>
          <span className="h-px w-7 bg-white/10" />
        </div>
        <p className="text-[10px] text-white/22">built for the web</p>
      </div>
    </div>
  );
}
