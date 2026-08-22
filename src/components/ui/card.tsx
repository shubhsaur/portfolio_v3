"use client";

import { cn } from "@/lib/cn";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { useCallback, type HTMLAttributes, type MouseEvent } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  spotlight?: boolean;
  spotlightColor?: string;
  surfaceGlowColor?: string;
  spotlightRadius?: number;
}

export function Card({
  className,
  children,
  spotlight = true,
  spotlightColor = "rgba(232, 197, 71, 0.35)",
  surfaceGlowColor = "rgba(232, 197, 71, 0.05)",
  spotlightRadius = 300,
  onMouseMove,
  ...props
}: CardProps) {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!spotlight || prefersReducedMotion) return;
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
      onMouseMove?.(e);
    },
    [spotlight, prefersReducedMotion, mouseX, mouseY, onMouseMove]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  }, [mouseX, mouseY]);

  const borderBackground = useMotionTemplate`radial-gradient(${spotlightRadius}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;
  const surfaceBackground = useMotionTemplate`radial-gradient(${spotlightRadius * 1.4}px circle at ${mouseX}px ${mouseY}px, ${surfaceGlowColor}, transparent 75%)`;

  return (
    <div
      className={cn(
        "group/card ln-surface relative overflow-hidden border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5 sm:p-6 transition-all duration-300",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {spotlight && !prefersReducedMotion && (
        <>
          {/* Border Spotlight Glow */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
            style={{
              background: borderBackground,
              maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "1px",
            }}
          />

          {/* Surface Ambient Glow */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
            style={{
              background: surfaceBackground,
            }}
          />
        </>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
