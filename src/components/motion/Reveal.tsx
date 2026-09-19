"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  direction?: RevealDirection;
  index?: number;
}

export function Reveal({
  children,
  delay = 0,
  direction,
  index,
  viewport,
  transition,
  ...rest
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isForcedVisible, setIsForcedVisible] = useState(false);

  // If direction is not explicitly set, auto-alternate if index is provided, otherwise default to "up"
  const resolvedDirection: RevealDirection =
    direction ?? (index !== undefined ? (index % 2 === 0 ? "left" : "right") : "up");

  const getInitialPosition = (dir: RevealDirection) => {
    switch (dir) {
      case "left":
        return { opacity: 0, x: -28, y: 0 };
      case "right":
        return { opacity: 0, x: 28, y: 0 };
      case "down":
        return { opacity: 0, x: 0, y: -20 };
      case "none":
        return { opacity: 0, x: 0, y: 0 };
      case "up":
      default:
        return { opacity: 0, x: 0, y: 20 };
    }
  };

  const defaultViewport = {
    once: true,
    amount: 0 as const,
    margin: "120px 0px 0px 0px",
  };

  const defaultTransition = {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    delay,
  };

  useEffect(() => {
    if (prefersReducedMotion) return;
    // WebKit / Safari failsafe: if element is in the visible viewport on mount,
    // ensure it becomes visible even if browser IntersectionObserver drops the initial event.
    const checkInitialVisibility = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < (window.innerHeight || 800) + 120 && rect.bottom > -100) {
          setIsForcedVisible(true);
        }
      }
    };
    const timer = setTimeout(checkInitialVisibility, 150);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? false : getInitialPosition(resolvedDirection)}
      animate={isForcedVisible ? { opacity: 1, x: 0, y: 0 } : undefined}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      transition={
        prefersReducedMotion
          ? undefined
          : transition
            ? { ...defaultTransition, ...transition }
            : defaultTransition
      }
      viewport={
        prefersReducedMotion
          ? undefined
          : viewport
            ? { ...defaultViewport, ...viewport }
            : defaultViewport
      }
      {...rest}
    >
      {children}
    </motion.div>
  );
}
