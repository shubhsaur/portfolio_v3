"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollIndicatorProps {
  targetId?: string;
  className?: string;
}

export function ScrollIndicator({
  targetId = "featured",
  className,
}: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Fade out smoothly once the user begins scrolling down
      if (window.scrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 10,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn("flex flex-col items-center justify-center", className)}
    >
      <a
        href={`#${targetId}`}
        onClick={handleClick}
        className="group flex flex-col items-center gap-1.5 p-2 text-[var(--ln-text-muted)] transition-colors duration-200 hover:text-[var(--ln-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ln-ring)] rounded-full"
        aria-label="Scroll down to featured work"
      >
        <span className="ln-mono text-[9px] font-medium uppercase tracking-[0.24em] text-[var(--ln-text-muted)] transition-colors duration-200 group-hover:text-[var(--ln-accent)]">
          Scroll
        </span>

        {/* Mouse Pill Capsule */}
        <div className="relative flex h-8 w-5 items-start justify-center rounded-full border border-[var(--ln-border-strong)] bg-[var(--ln-glass)] p-1 shadow-[var(--ln-shadow-surface)] backdrop-blur-md transition-all duration-300 group-hover:border-[var(--ln-accent)] group-hover:shadow-[0_0_12px_var(--ln-accent-wash)]">
          <motion.div
            className="h-1.5 w-1 rounded-full bg-[var(--ln-accent)] shadow-[0_0_6px_var(--ln-accent)]"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, 11, 0],
                    opacity: [1, 0.25, 1],
                  }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Subtle bouncing arrow */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, 3, 0],
                  opacity: [0.4, 0.9, 0.4],
                }
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          <ChevronDown className="h-3.5 w-3.5 text-current transition-transform duration-200 group-hover:translate-y-0.5" />
        </motion.div>
      </a>
    </motion.div>
  );
}
