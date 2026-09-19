"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { MotivateModal } from "./MotivateModal";

export function MotivateWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for custom open event so CommandMenu or other links can trigger it
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("portfolio:open-motivate", handleOpen);
    return () => window.removeEventListener("portfolio:open-motivate", handleOpen);
  }, []);

  return (
    <>
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          title="Spark of Motivation"
          aria-label="Open Motivate Me quotes"
          className="group relative flex items-center gap-2 rounded-full border border-border/80 bg-card/85 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs font-medium text-foreground shadow-[var(--ln-shadow-surface)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--ln-accent)] hover:shadow-[0_8px_25px_-4px_color-mix(in_srgb,var(--ln-accent)_40%,transparent)] hover:-translate-y-0.5 active:scale-95"
        >
          {/* Subtle Ambient Pulsing Glow */}
          <span
            aria-hidden="true"
            className="absolute -inset-0.5 rounded-full opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-60 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, var(--ln-accent) 0%, color-mix(in srgb, var(--ln-accent) 30%, transparent) 100%)",
            }}
          />

          <Sparkles className="relative z-10 h-3.5 w-3.5 text-[var(--ln-accent)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
          <span className="relative z-10 font-medium tracking-tight">Motivate me</span>
        </button>
      </div>

      <MotivateModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export function openMotivateModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("portfolio:open-motivate"));
  }
}
