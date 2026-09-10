"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const LiquidGlassCanvas = dynamic(
  () =>
    import("./LiquidGlassCanvas").then((mod) => mod.LiquidGlassCanvas),
  { ssr: false },
);

function isLiquidGlassEnabled() {
  return process.env.NEXT_PUBLIC_ENABLE_LIQUID_GLASS !== "false";
}

export function HeroBackdrop() {
  const prefersReducedMotion = useReducedMotion();
  const [mountCanvas, setMountCanvas] = useState(false);

  useEffect(() => {
    if (!isLiquidGlassEnabled()) return;
    if (prefersReducedMotion) return;

    let idleId: number | undefined;
    let timeoutId: number | undefined;
    let cancelled = false;

    const enable = () => {
      if (!cancelled) setMountCanvas(true);
    };

    // Prefer idle time, but always fall back so mobile (busy main thread / loader)
    // still gets the same liquid-glass backdrop as desktop.
    const ric = window.requestIdleCallback;
    if (typeof ric === "function") {
      idleId = ric(enable, { timeout: 1200 });
    }
    timeoutId = window.setTimeout(enable, 300);

    return () => {
      cancelled = true;
      if (idleId != null) window.cancelIdleCallback?.(idleId);
      window.clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="ln-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Static CSS mesh — reduced-motion / fail-open end state */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 55% at 15% 10%, color-mix(in srgb, var(--ln-accent) 16%, transparent), transparent 60%),
            radial-gradient(ellipse 70% 50% at 85% 20%, color-mix(in srgb, var(--ln-success) 10%, transparent), transparent 55%),
            radial-gradient(ellipse 90% 70% at 50% 100%, color-mix(in srgb, var(--ln-accent) 8%, transparent), transparent 60%)
          `,
        }}
      />

      {mountCanvas ? (
        <div className="absolute inset-0">
          <LiquidGlassCanvas />
        </div>
      ) : null}
    </div>
  );
}
