"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ──────────────────────────────────────────────
   Liquid Noir Loader
   - Logo with spinning conic-gradient rim
   - Three orbiting dashed rings
   - Accent-colour particles
   - Gradient progress sweep
   - Auto-dismisses after content mounts
   ────────────────────────────────────────────── */

const PARTICLES = [
  { color: "#B9824A", size: 4, orbit: 38, duration: 3.4, delay: 0 },
  { color: "#C87886", size: 3, orbit: 44, duration: 4.2, delay: -0.8 },
  { color: "#8067A1", size: 3.5, orbit: 50, duration: 5.0, delay: -1.6 },
  { color: "#4B9AA5", size: 3, orbit: 44, duration: 3.8, delay: -2.4 },
  { color: "#B9824A", size: 2.5, orbit: 50, duration: 4.6, delay: -3.2 },
];

export function Loader({ minDisplay = 800 }: { minDisplay?: number }) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const ready =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true }));

    const timer = new Promise<void>((r) => setTimeout(r, minDisplay));

    Promise.all([ready, timer]).then(() => {
      setExiting(true);
      // let exit animation play, then unmount
      setTimeout(() => setVisible(false), 700);
    });
  }, [minDisplay]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="ln-loader"
          initial={{ opacity: 1 }}
          animate={exiting ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="ln-loader-root fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "var(--ln-bg)" }}
        >
          {/* Ambient glow blobs */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2 h-[clamp(12rem,25vw,22rem)] w-[clamp(12rem,25vw,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] opacity-40"
              style={{
                background:
                  "radial-gradient(circle, rgba(185,130,74,.30), rgba(200,120,134,.08) 50%, transparent 72%)",
              }}
            />
            <div
              className="absolute left-[55%] top-[55%] h-[clamp(10rem,20vw,18rem)] w-[clamp(10rem,20vw,18rem)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] opacity-30"
              style={{
                background:
                  "radial-gradient(circle, rgba(128,103,161,.25), rgba(75,154,165,.06) 48%, transparent 70%)",
              }}
            />
          </div>

          {/* Main stage */}
          <div
            className="relative"
            style={{ width: "clamp(10rem, 28vw, 16rem)", height: "clamp(10rem, 28vw, 16rem)" }}
          >
            {/* Orbiting dashed rings — absolutely centered */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
              style={{
                width: "70%", aspectRatio: 1,
                borderColor: "rgba(185,130,74,.18)",
                borderWidth: 1.2,
                animation: "fu-orbit 18s linear infinite",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
              style={{
                width: "88%", aspectRatio: 1,
                borderColor: "rgba(128,103,161,.14)",
                borderWidth: 1,
                animation: "fu-orbit-reverse 24s linear infinite",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
              style={{
                width: "100%", aspectRatio: 1,
                borderColor: "rgba(75,154,165,.10)",
                borderWidth: 1,
                animation: "fu-orbit 32s linear infinite",
              }}
            />

            {/* Orbiting accent particles */}
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                  animation: `fu-orbit ${p.duration}s linear infinite`,
                  animationDelay: `${p.delay}s`,
                  transformOrigin: `0 ${p.orbit}%`,
                }}
              />
            ))}

            {/* Central orb — absolutely centered */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full border backdrop-blur-2xl overflow-hidden"
              style={{
                width: "52%", aspectRatio: 1,
                background: "var(--ln-bg-card)",
                borderColor: "var(--ln-border-subtle)",
                boxShadow: `
                  0 0 50px 8px rgba(185,130,74,.18),
                  0 0 100px 25px rgba(128,103,161,.12),
                  0 0 180px 50px rgba(75,154,165,.06),
                  var(--ln-shadow-surface)
                `,
              }}
            >
              {/* Spinning conic-gradient rim */}
              <span
                className="pointer-events-none absolute inset-[-2px] rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #B9824A, #C87886 22%, #8067A1 51%, #4B9AA5 74%, #B9824A)",
                  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: 2,
                  animation: "ln-loader-spin 3s linear infinite",
                }}
              />

              {/* Inner glow */}
              <span
                className="pointer-events-none absolute inset-[10%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(185,130,74,.18), transparent 30%), radial-gradient(circle at 70% 65%, rgba(75,154,165,.12), transparent 35%)",
                }}
              />

              {/* Glass specular highlight */}
              <span
                className="pointer-events-none absolute inset-[10%] rounded-full opacity-50"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,.10), transparent 22%, transparent 60%, rgba(255,255,255,.03))",
                }}
              />

              {/* Logo image — spins while loading */}
              <span
                className="relative z-10 h-[70%] w-[70%] rounded-full"
                style={{ animation: "ln-loader-spin 4s linear infinite" }}
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={150}
                  height={150}
                  className="h-full w-full rounded-full object-cover"
                  priority
                />
              </span>
            </div>
          </div>

          {/* Progress sweep bar */}
          <div
            className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden"
            style={{ background: "var(--ln-border-subtle)" }}
          >
            <motion.div
              className="h-full"
              style={{
                background: "var(--ln-gradient-primary)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Tagline */}
          <span
            className="ln-mono absolute bottom-[clamp(1.2rem,3vw,2rem)] text-center tracking-[0.30em] uppercase"
            style={{
              fontSize: "clamp(0.5rem, 0.8vw, 0.625rem)",
              color: "var(--ln-text-soft)",
            }}
          >
            Loading&ensp;·&ensp;Shubham Saurabh
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
