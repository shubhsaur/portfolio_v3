"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const phrases = [
  "I build things that move",
  "I make the web feel alive",
  "I ship fast, refactor faster",
  "I obsess over interactions",
  "I debug at 2am and enjoy it",
] as const;

export function RotatingIntro({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[index];
    const baseSpeed = 90;
    const deleteSpeed = 52;

    const tick = () => {
      setDisplayed((prev) => {
        if (!isDeleting) {
          const nextLength = prev.length + 1;
          const next = full.slice(0, nextLength);
          if (nextLength === full.length) {
            setTimeout(() => setIsDeleting(true), 1300);
          }
          return next;
        }

        if (prev.length <= 1) {
          setIsDeleting(false);
          setIndex((current) => (current + 1) % phrases.length);
          return "";
        }

        return prev.slice(0, prev.length - 1);
      });
    };

    const interval = setInterval(
      tick,
      isDeleting ? deleteSpeed : baseSpeed,
    );

    return () => clearInterval(interval);
  }, [index, isDeleting]);

  return (
    <p className={cn("hero-rotating-intro ln-mono mt-2 flex items-center gap-1 text-xs text-amber-200 sm:text-sm", className)}>
      <span>{displayed}</span>
      <span className="ln-cursor text-amber-200">|</span>
    </p>
  );
}

