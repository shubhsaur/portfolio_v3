/**
 * DigitalStudio.tsx
 *
 * Drop-in hero visual for a React / Next.js portfolio.
 *
 * Usage:
 *   import DigitalStudio from "@/components/DigitalStudio";
 *
 *   <DigitalStudio className="w-full max-w-[680px]" />
 *
 * Notes:
 * - No external dependencies.
 * - Tailwind CSS is used for layout/styling.
 * - The component is intentionally self-contained so it can live
 *   inside the right side of a hero section.
 */

"use client";

import { CSSProperties, HTMLAttributes, useMemo, useState } from "react";

type StudioItem = {
  id: string;
  label: string;
  value: string;
  x: string;
  y: string;
  rotate: number;
};

interface DigitalStudioProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

const items: StudioItem[] = [
  {
    id: "ui",
    label: "UI SYSTEM",
    value: "Glass / Motion",
    x: "8%",
    y: "22%",
    rotate: -7,
  },
  {
    id: "code",
    label: "CODE",
    value: "React / Next.js",
    x: "68%",
    y: "15%",
    rotate: 7,
  },
  {
    id: "product",
    label: "PRODUCT",
    value: "Ship / Iterate",
    x: "76%",
    y: "61%",
    rotate: 6,
  },
  {
    id: "ux",
    label: "UX",
    value: "Flows / Detail",
    x: "13%",
    y: "65%",
    rotate: -6,
  },
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function DigitalStudio({
  interactive = true,
  className = "",
  ...props
}: DigitalStudioProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState<string | null>(null);

  const studioStyle = useMemo(
    () =>
      ({
        "--px": `${pointer.x}px`,
        "--py": `${pointer.y}px`,
      }) as CSSProperties,
    [pointer]
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;

    setPointer({
      x: clamp(nx * 26, -14, 14),
      y: clamp(ny * 20, -12, 12),
    });
  };

  const resetPointer = () => {
    setPointer({ x: 0, y: 0 });
    setActive(null);
  };

  return (
    <div
      {...props}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className={`group relative aspect-[1.08] min-h-[430px] w-full select-none overflow-hidden ${className}`}
      style={studioStyle}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[13%] top-[13%] h-52 w-52 rounded-full blur-[90px]
                     transition-transform duration-500 group-hover:scale-110"
          style={{
            background:
              "radial-gradient(circle, rgba(255,197,85,.26), rgba(255,104,126,.08) 45%, transparent 70%)",
            transform: `translate3d(${pointer.x * 0.45}px, ${pointer.y * 0.45}px, 0)`,
          }}
        />
        <div
          className="absolute right-[8%] top-[31%] h-64 w-64 rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(154,104,255,.22), rgba(70,218,255,.08) 48%, transparent 72%)",
            transform: `translate3d(${pointer.x * -0.35}px, ${pointer.y * -0.35}px, 0)`,
          }}
        />
      </div>

      {/* Perspective stage */}
      <div
        className="absolute inset-[7%] transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(1100px) rotateX(${pointer.y * -0.22}deg) rotateY(${pointer.x * 0.24}deg)`,
        }}
      >
        {/* Background glass sheet */}
        <div
          className="absolute inset-[9%] rounded-[42px] border border-white/[0.09]
                     bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_30px_90px_rgba(0,0,0,.28)]
                     backdrop-blur-xl"
        >
          <div
            className="absolute inset-0 rounded-[42px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,.055), transparent 30%, transparent 67%, rgba(255,255,255,.025))",
            }}
          />

          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 85%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black, transparent 85%)",
              borderRadius: "42px",
            }}
          />
        </div>

        {/* Connection lines */}
        <svg
          viewBox="0 0 100 100"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="studioLine" x1="0" x2="1">
              <stop offset="0%" stopColor="#FFD25C" stopOpacity=".25" />
              <stop offset="50%" stopColor="#F77DA7" stopOpacity=".55" />
              <stop offset="100%" stopColor="#6FDFFF" stopOpacity=".22" />
            </linearGradient>
          </defs>

          <path
            d="M 22 30 C 33 38, 35 42, 44 48"
            fill="none"
            stroke="url(#studioLine)"
            strokeWidth=".35"
            strokeDasharray="1 1"
            className="opacity-70"
          />
          <path
            d="M 73 24 C 63 30, 59 38, 53 46"
            fill="none"
            stroke="url(#studioLine)"
            strokeWidth=".35"
            strokeDasharray="1 1"
            className="opacity-70"
          />
          <path
            d="M 72 65 C 63 60, 58 55, 53 51"
            fill="none"
            stroke="url(#studioLine)"
            strokeWidth=".35"
            strokeDasharray="1 1"
            className="opacity-70"
          />
          <path
            d="M 25 67 C 34 61, 38 56, 44 51"
            fill="none"
            stroke="url(#studioLine)"
            strokeWidth=".35"
            strokeDasharray="1 1"
            className="opacity-70"
          />
        </svg>

        {/* Floating design card */}
        <div
          className="absolute left-[20%] top-[26%] w-[35%] min-w-[170px] max-w-[245px]
                     transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${pointer.x * 0.75}px, ${pointer.y * 0.75}px, 0) rotate(-7deg)`,
          }}
        >
          <div
            className="relative overflow-hidden rounded-[26px] border border-white/[0.11]
                       bg-[#14151B]/80 p-3 shadow-[0_22px_60px_rgba(0,0,0,.42)] backdrop-blur-xl"
          >
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0C0D12] p-4">
              <div className="mb-7 flex items-center justify-between">
                <div className="h-2 w-16 rounded-full bg-white/15" />
                <div className="flex gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-24 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#FFCC63]/30 via-[#FF759A]/20 to-[#8B6CFF]/25" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-10 rounded-xl bg-white/[0.05]" />
                  <div className="h-10 rounded-xl bg-white/[0.035]" />
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -inset-px rounded-[26px] bg-gradient-to-br from-white/[0.10] via-transparent to-transparent" />
          </div>

          <div className="mt-3 flex items-center gap-2 px-1">
            <span className="text-[9px] font-semibold tracking-[0.22em] text-white/40">
              DESIGN SYSTEM
            </span>
            <span className="h-px w-6 bg-white/15" />
          </div>
        </div>

        {/* Floating mobile mock */}
        <div
          className="absolute bottom-[16%] right-[18%] w-[23%] min-w-[112px] max-w-[148px]
                     transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${pointer.x * -0.8}px, ${pointer.y * -0.65}px, 0) rotate(8deg)`,
          }}
        >
          <div className="rounded-[28px] border border-white/[0.11] bg-[#11131A]/85 p-2 shadow-[0_25px_70px_rgba(0,0,0,.45)] backdrop-blur-xl">
            <div className="rounded-[22px] border border-white/[0.07] bg-[#090A0E] p-2">
              <div className="mb-2 flex items-center justify-center">
                <div className="h-1.5 w-10 rounded-full bg-white/10" />
              </div>

              <div className="overflow-hidden rounded-[18px] border border-white/[0.06]">
                <div className="h-28 bg-gradient-to-br from-[#FFD35D] via-[#F56E98] to-[#8E6BFF] p-2">
                  <div className="h-full rounded-xl border border-white/20 bg-black/10 p-2 backdrop-blur-sm">
                    <div className="mb-3 h-2 w-10 rounded-full bg-white/50" />
                    <div className="space-y-2">
                      <div className="h-8 rounded-lg bg-white/20" />
                      <div className="h-5 rounded-lg bg-white/15" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 bg-[#0B0C10] p-2">
                  <div className="h-2 rounded bg-white/10" />
                  <div className="h-2 w-3/4 rounded bg-white/[0.06]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <span className="text-[9px] font-semibold tracking-[0.22em] text-white/35">
              RESPONSIVE
            </span>
          </div>
        </div>

        {/* Center logo / studio core */}
        <button
          type="button"
          aria-label="Digital studio core"
          className="absolute left-1/2 top-1/2 grid h-[33%] min-h-[138px] min-w-[138px] max-w-[186px]
                     -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border
                     border-white/[0.14] bg-[#0D0F16]/75 shadow-[0_20px_80px_rgba(0,0,0,.46)]
                     backdrop-blur-2xl transition-all duration-500 hover:scale-[1.04]"
          style={{
            transform: `translate(calc(-50% + ${pointer.x * 0.35}px), calc(-50% + ${pointer.y * 0.35}px))`,
          }}
          onPointerEnter={() => setActive("core")}
          onPointerLeave={() => setActive(null)}
        >
          {/* ring */}
          <span
            className="pointer-events-none absolute inset-[-1px] rounded-full opacity-80"
            style={{
              background:
                "conic-gradient(from 220deg, #FFD05D, #FA769B 25%, #8C70FF 58%, #55DDF7 78%, #FFD05D)",
              mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: 1,
            }}
          />

          <span className="absolute inset-[15%] rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,212,95,.2),transparent_28%),radial-gradient(circle_at_75%_70%,rgba(85,221,247,.16),transparent_35%)]" />

          {/* S */}
          <span
            className={`relative text-[100px] font-black leading-none tracking-[-0.12em]
                        bg-gradient-to-br from-[#FFE06A] via-[#F47EA6] via-55% to-[#69DFFF]
                        bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(255,128,155,.18)]
                        transition-transform duration-500 ${
                          active === "core" ? "scale-110" : ""
                        }`}
            aria-hidden="true"
          >
            S
          </span>

          <span className="absolute bottom-[17%] rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[8px] font-semibold tracking-[0.28em] text-white/45 backdrop-blur-md">
            SHUBHAM
          </span>
        </button>

        {/* Floating info chips */}
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={item.label}
            onPointerEnter={() => setActive(item.id)}
            onPointerLeave={() => setActive(null)}
            className={`absolute w-[25%] min-w-[118px] max-w-[158px] rounded-2xl border
                        border-white/[0.10] bg-[#0E1016]/75 px-3 py-3 text-left
                        shadow-[0_18px_45px_rgba(0,0,0,.30)] backdrop-blur-xl
                        transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.18]
                        ${active === item.id ? "scale-[1.045]" : ""}`}
            style={{
              left: item.x,
              top: item.y,
              transform: `translate3d(${pointer.x * (index % 2 ? -0.42 : 0.42)}px, ${
                pointer.y * (index % 2 ? -0.32 : 0.32)
              }px, 0) rotate(${item.rotate}deg)`,
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full shadow-[0_0_10px_currentColor]"
                style={{
                  color:
                    index === 0
                      ? "#FFD45C"
                      : index === 1
                      ? "#F77CA3"
                      : index === 2
                      ? "#7A72FF"
                      : "#58DDF4",
                  background: "currentColor",
                }}
              />
              <span className="text-[8px] font-bold tracking-[0.22em] text-white/45">
                {item.label}
              </span>
            </div>
            <div className="text-[11px] font-medium text-white/80">{item.value}</div>
          </button>
        ))}

        {/* tiny floating particles */}
        <span
          className="absolute left-[47%] top-[11%] h-1 w-1 animate-pulse rounded-full bg-[#FFD45C] shadow-[0_0_14px_#FFD45C]"
          style={{ transform: `translate3d(${pointer.x * 0.25}px, ${pointer.y * 0.2}px, 0)` }}
        />
        <span
          className="absolute left-[83%] top-[43%] h-1 w-1 animate-pulse rounded-full bg-[#6BDDF5] shadow-[0_0_14px_#6BDDF5]"
          style={{ animationDelay: "400ms" }}
        />
        <span
          className="absolute left-[35%] top-[82%] h-1 w-1 animate-pulse rounded-full bg-[#A77CFF] shadow-[0_0_14px_#A77CFF]"
          style={{ animationDelay: "900ms" }}
        />
      </div>

      {/* Base caption */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
        <div className="mb-1 flex items-center justify-center gap-2">
          <span className="h-px w-7 bg-white/10" />
          <span className="text-[8px] font-semibold tracking-[0.30em] text-white/25">
            DIGITAL STUDIO
          </span>
          <span className="h-px w-7 bg-white/10" />
        </div>
        <p className="text-[10px] text-white/25">
          design · engineer · ship
        </p>
      </div>
    </div>
  );
}
