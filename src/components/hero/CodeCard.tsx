"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { Play, RotateCcw, Check, Sparkles } from "lucide-react";

export function CodeCard() {
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [showConsole, setShowConsole] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Softer tilt
  const rotateX = useTransform(y, [-1, 1], [6, -6]);
  const rotateY = useTransform(x, [-1, 1], [-6, 6]);
  const glowX = useTransform(x, [-1, 1], [-30, 30]);
  const glowY = useTransform(y, [-1, 1], [-24, 24]);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;

    // Normalise to [-1, 1]
    const dx = relativeX * 2 - 1;
    const dy = relativeY * 2 - 1;

    x.set(dx);
    y.set(dy);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleRunCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setShowConsole(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 600);
  };

  const handleReset = () => {
    setShowConsole(false);
    setHasRun(false);
  };

  return (
    <motion.div
      className="group relative w-full max-w-full self-stretch sm:max-w-sm"
      style={{ rotateX, rotateY }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.8 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[2px] rounded-3xl opacity-0 mix-blend-screen blur-2xl transition-opacity duration-200 group-hover:opacity-100"
        style={{
          x: glowX,
          y: glowY,
          background:
            "radial-gradient(circle at center, rgba(94, 234, 212, 0.75), transparent 70%)",
        }}
      />

      <div className="code-card relative rounded-2xl border border-white/6 bg-linear-to-b from-[#0b1020] via-[#050816] to-[#020617] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
        {/* Editor Top Bar */}
        <div className="code-editor-bar flex items-center justify-between gap-3 rounded-xl bg-black/40 px-3 py-2 border border-white/6">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>

          <span className="ln-mono text-[10px] text-zinc-400 font-medium">
            shubhamsaurabh.ts
          </span>

          {/* Interactive Run Button */}
          <div className="flex items-center gap-1.5">
            {!showConsole ? (
<button
                 type="button"
                 onClick={handleRunCode}
                 disabled={isRunning}
                 className="inline-flex items-center gap-1 rounded-md border border-[var(--ln-accent)]/30 bg-[var(--ln-accent)]/12 px-2 py-0.5 text-[10px] font-medium text-[var(--ln-accent)] transition hover:bg-[var(--ln-accent)]/22 active:scale-95"
                 title="Run shubhamsaurabh.ts"
               >
                <Play className="h-2.5 w-2.5 fill-current" />
                <span>Run</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="code-reset-btn inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-zinc-400 transition hover:text-zinc-200 active:scale-95"
                title="Reset code editor"
              >
                <RotateCcw className="h-2.5 w-2.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Code Content */}
        <div className="mt-3 rounded-xl bg-linear-to-b from-[#0f172a] via-[#020617] to-[#020617] px-4 py-3 border border-white/6">
          <pre className="ln-mono whitespace-pre-wrap wrap-break-word text-[11px] leading-relaxed text-zinc-100">
            <code>
              <span className="text-sky-400">const</span>{" "}
              <span className="text-emerald-300">engineer</span>{" "}
              <span className="text-zinc-400">=</span> {"{"}
              {"\n  "}
              <span className="text-sky-400">name</span>
              <span className="text-zinc-400">:</span>{" "}
              <span className="text-amber-200">
                &quot;Shubham Saurabh&quot;
              </span>
              {",\n  "}
              <span className="text-sky-400">role</span>
              <span className="text-zinc-400">:</span>{" "}
              <span className="text-amber-200">
                &quot;SDE - I @ RateGain&quot;
              </span>
              {",\n  "}
              <span className="text-sky-400">experience</span>
              <span className="text-zinc-400">:</span>{" "}
              <span className="text-amber-200">
                &quot;5+ Years (SaaS & Booking)&quot;
              </span>
              {",\n  "}
              <span className="text-sky-400">stack</span>
              <span className="text-zinc-400">:</span>{" "}
              <span className="text-amber-200">
                [&quot;React 19&quot;, &quot;Next.js&quot;, &quot;TypeScript&quot;, &quot;AWS&quot;]
              </span>
              {",\n  "}
              <span className="text-sky-400">focus</span>
              <span className="text-zinc-400">()</span> {"{"}
              {"\n    "}
              <span className="text-sky-400">return</span>{" "}
              <span className="text-amber-200">
                &quot;Architecting enterprise booking engines & modern AI UX.&quot;
              </span>
              {";\n  "}
              {"},"}
              {"\n"};
              {"\n\n"}
              <span className="text-emerald-300">engineer</span>
              <span className="text-zinc-400">.</span>
              <span className="text-emerald-300">focus</span>
              <span className="text-zinc-400">();</span>
            </code>
          </pre>
        </div>

        {/* Animated Console Drawer */}
        <AnimatePresence>
          {showConsole && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="code-console mt-3 overflow-hidden rounded-xl border border-white/8 bg-[#04060d] p-3 text-[10px] font-mono text-zinc-300 shadow-inner"
            >
              <div className="flex items-center justify-between border-b border-white/6 pb-1.5 text-zinc-500">
                <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-[var(--ln-accent-gold)]">
                  <Sparkles className="h-3 w-3" /> Console Output
                </span>
                <span>bun v1.2</span>
              </div>

              {isRunning ? (
                <div className="py-2 text-zinc-400 animate-pulse">
                  $ bun run shubhamsaurabh.ts ...
                </div>
              ) : (
                <div className="space-y-1 pt-2">
                  <div className="text-zinc-500">$ bun run shubhamsaurabh.ts</div>
                  <div className="text-emerald-400 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Verified: SDE - I @ RateGain (Ex-Infosys)
                  </div>
                  <div className="text-sky-300 flex items-center gap-1">
                    <Check className="h-3 w-3" /> 5+ YOE · 70+ Repos · Q3 Pinnacle Performer
                  </div>
                  <div className="text-amber-200 font-semibold pt-1">
                    ↳ &quot;Architecting enterprise booking engines & modern AI UX.&quot;
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
