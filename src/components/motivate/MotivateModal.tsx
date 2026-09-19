"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Quote as QuoteIcon,
} from "lucide-react";
import { motivationalQuotes } from "@/lib/content/quotes";
import { toast } from "sonner";

interface MotivateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MotivateModal({ isOpen, onClose }: MotivateModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isWriting, setIsWriting] = useState(true);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuote = motivationalQuotes[currentIndex] || motivationalQuotes[0];

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Handwriting typewriter engine
  const startHandwriting = useCallback(() => {
    clearTimer();
    setDisplayedChars(0);
    setIsWriting(true);

    const fullText = currentQuote.text;
    let charIndex = 0;

    const typeNext = () => {
      if (charIndex >= fullText.length) {
        setIsWriting(false);
        return;
      }

      charIndex++;
      setDisplayedChars(charIndex);

      const char = fullText[charIndex - 1];
      let delay = 32;

      if (char === " ") {
        delay = 45;
      } else if (char === "," || char === ";") {
        delay = 140;
      } else if (char === "." || char === "!" || char === "?") {
        delay = 240;
      }

      timerRef.current = setTimeout(typeNext, delay);
    };

    // Initial pause after modal opens
    timerRef.current = setTimeout(typeNext, 200);
  }, [currentQuote.text, clearTimer]);

  useEffect(() => {
    if (isOpen) {
      startHandwriting();
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [isOpen, currentIndex, startHandwriting, clearTimer]);

  // Complete writing instantly on click
  const completeInstantly = useCallback(() => {
    clearTimer();
    setDisplayedChars(currentQuote.text.length);
    setIsWriting(false);
  }, [clearTimer, currentQuote.text.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % motivationalQuotes.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + motivationalQuotes.length) % motivationalQuotes.length);
  }, []);

  const handleCopy = useCallback(async () => {
    const textToCopy = `"${currentQuote.text}" — ${currentQuote.author || "Unknown"}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast("Quote copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast("Failed to copy quote");
    }
  }, [currentQuote]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        startHandwriting();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev, startHandwriting]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Motivational Quote"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-popover/95 text-popover-foreground shadow-[var(--ln-shadow-surface)] backdrop-blur-2xl"
          >
            {/* Ambient Corner Glow */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-35 blur-3xl"
              style={{
                background: "radial-gradient(circle, var(--ln-accent) 0%, transparent 70%)",
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full opacity-20 blur-3xl"
              style={{
                background: "radial-gradient(circle, var(--ln-success) 0%, transparent 70%)",
              }}
            />

            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-2">
                <span className="flex h-7 items-center gap-1.5 rounded-full border border-[var(--ln-accent)]/30 bg-[var(--ln-accent)]/10 px-3 text-[11px] font-medium text-[var(--ln-accent)]">
                  <Sparkles className="h-3 w-3" />
                  <span>{currentQuote.category || "Motivate Me"}</span>
                </span>
                <span className="ln-mono text-[11px] text-muted-foreground">
                  {String(currentIndex + 1).padStart(2, "0")} / {String(motivationalQuotes.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={startHandwriting}
                  title="Replay handwriting animation (R)"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy quote"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-[var(--ln-accent)]" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  title="Close (Esc)"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ml-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Handwritten Quote Canvas */}
            <div
              onClick={isWriting ? completeInstantly : undefined}
              className="relative min-h-[14rem] sm:min-h-[16rem] flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 cursor-pointer select-none"
              title={isWriting ? "Click to finish writing instantly" : undefined}
            >
              {/* Giant Watermark Quote Mark */}
              <QuoteIcon
                aria-hidden="true"
                className="pointer-events-none absolute top-4 left-4 h-16 w-16 text-[var(--ln-accent)]/10 rotate-180"
              />

              {/* Cursive handwritten text */}
              <div className="relative z-10">
                <p
                  className="font-[family-name:var(--font-pacifico)] text-xl sm:text-2xl md:text-3xl lg:text-[2rem] leading-relaxed sm:leading-[1.7] text-foreground tracking-wide font-normal"
                  style={{
                    fontFamily: "var(--font-pacifico), 'Caveat', 'Dancing Script', cursive",
                  }}
                >
                  &ldquo;{currentQuote.text.slice(0, displayedChars)}&rdquo;
                  {/* Blinking Ink Cursor */}
                  {isWriting && (
                    <span
                      aria-hidden="true"
                      className="inline-block w-[3px] h-[1em] ml-1 bg-[var(--ln-accent)] rounded-full animate-pulse shadow-[0_0_10px_var(--ln-accent)] align-baseline"
                    />
                  )}
                </p>

                {/* Author attribution — fades in once finished or near completion */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: displayedChars >= currentQuote.text.length * 0.85 ? 1 : 0,
                    y: displayedChars >= currentQuote.text.length * 0.85 ? 0 : 6,
                  }}
                  transition={{ duration: 0.35 }}
                  className="mt-6 flex items-center justify-end gap-2"
                >
                  <span className="h-px w-8 bg-border" />
                  <span className="ln-mono text-xs uppercase tracking-widest text-muted-foreground font-medium">
                    {currentQuote.author || "Unknown"}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Bottom Bar: Previous & Next */}
            <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-5 py-4 sm:px-7">
              <button
                type="button"
                onClick={handlePrev}
                className="group flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-[var(--ln-accent)] hover:text-[var(--ln-accent)] active:scale-95"
              >
                <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Previous</span>
              </button>

              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-muted-foreground/70">
                <kbd className="ln-mono rounded border border-border bg-muted/60 px-1.5 py-0.5 text-[10px]">←</kbd>
                <span>/</span>
                <kbd className="ln-mono rounded border border-border bg-muted/60 px-1.5 py-0.5 text-[10px]">→</kbd>
                <span>navigate</span>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="group flex items-center gap-1.5 rounded-full border border-[var(--ln-accent)]/50 bg-[var(--ln-accent)]/15 px-4 py-2 text-xs font-medium text-[var(--ln-accent)] transition-all hover:bg-[var(--ln-accent)] hover:text-white dark:hover:text-black active:scale-95 shadow-sm"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
