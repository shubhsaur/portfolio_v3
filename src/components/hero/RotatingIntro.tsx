"use client";

import { useEffect, useState } from "react";

const phrases = [
  "I love React",
  "I breathe JavaScript",
  "I build web experiences",
  "I am a developer",
] as const;

export function RotatingIntro() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[index];
    // Slightly slower than the original by ~30%
    const baseSpeed = 90; // was 70
    const deleteSpeed = 52; // was 40

    const tick = () => {
      setDisplayed((prev) => {
        if (!isDeleting) {
          const nextLength = prev.length + 1;
          const next = full.slice(0, nextLength);
          if (nextLength === full.length) {
            // Pause at full text, then start deleting
            setTimeout(() => setIsDeleting(true), 1300);
          }
          return next;
        }

        // Deleting backwards
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
    <p className="ln-mono mt-2 flex items-center gap-1 text-xs text-amber-200 sm:text-sm">
      <span>{displayed}</span>
      <span className="ln-cursor text-amber-200">|</span>
    </p>
  );
}

