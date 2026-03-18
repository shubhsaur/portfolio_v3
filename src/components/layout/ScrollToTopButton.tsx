"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const updateVisibility = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        setIsVisible(false);
        return;
      }

      const remainingScroll = scrollableHeight - window.scrollY;
      const shouldShow = remainingScroll <= scrollableHeight * 0.2;

      setIsVisible((prev) => (prev === shouldShow ? prev : shouldShow));
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          className="pointer-events-auto fixed bottom-6 right-4 z-50 flex items-center gap-2 rounded-full border border-[rgba(232,197,71,0.28)] bg-black/70 px-4 py-3 text-sm font-medium text-[var(--ln-accent-gold)] shadow-[0_0_0_1px_rgba(232,197,71,0.08),0_12px_40px_rgba(0,0,0,0.45),0_0_26px_rgba(232,197,71,0.2)] backdrop-blur-xl transition hover:border-[rgba(232,197,71,0.45)] hover:shadow-[0_0_0_1px_rgba(232,197,71,0.14),0_16px_45px_rgba(0,0,0,0.55),0_0_34px_rgba(232,197,71,0.28)] sm:bottom-8 sm:right-8"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.94 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          whileHover={prefersReducedMotion ? undefined : { y: -3 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
        >
          <span className="ln-mono hidden text-[11px] uppercase tracking-[0.22em] sm:inline">
            To The Top
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(232,197,71,0.14)] shadow-[0_0_18px_rgba(232,197,71,0.16)]">
            <ArrowUp className="h-4 w-4" />
          </span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
