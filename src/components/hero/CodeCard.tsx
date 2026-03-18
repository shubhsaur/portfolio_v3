"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import type { MouseEvent } from "react";

export function CodeCard() {
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

  return (
    <motion.div
      className="group relative w-full max-w-md self-stretch sm:max-w-sm"
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

      <div className="relative rounded-2xl border border-white/6 bg-linear-to-b from-[#0b1020] via-[#050816] to-[#020617] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
        <div className="flex items-center justify-between gap-3 rounded-xl bg-black/30 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="ln-mono text-[10px] text-zinc-500">
            aboutme.ts
          </span>
        </div>

        <div className="mt-3 rounded-xl bg-linear-to-b from-[#0f172a] via-[#020617] to-[#020617] px-4 py-3">
          <pre className="ln-mono whitespace-pre-wrap wrap-break-word text-[11px] leading-relaxed text-zinc-100">
            <code>
              <span className="text-sky-400">const</span>{" "}
              <span className="text-emerald-300">frontendArtist</span>{" "}
              <span className="text-zinc-400">=</span> {"{"}
              {"\n  "}
              <span className="text-sky-400">name</span>
              <span className="text-zinc-400">:</span>{" "}
              <span className="text-amber-200">
                &quot;Shubham Saurabh&quot;
              </span>
              {",\n  "}
              <span className="text-sky-400">title</span>
              <span className="text-zinc-400">:</span>{" "}
              <span className="text-amber-200">
                &quot;Frontend Engineer&quot;
              </span>
              {",\n  "}
              <span className="text-sky-400">passion</span>
              <span className="text-zinc-400">:</span>{" "}
              <span className="text-amber-200">
                &quot;Building creative and inspiring interfaces&quot;
              </span>
              {",\n  "}
              <span className="text-sky-400">stack</span>
              <span className="text-zinc-400">:</span>{" "}
              <span className="text-amber-200">
                [&quot;React&quot;, &quot;Next.js&quot;, &quot;TypeScript&quot;]
              </span>
              {",\n  "}
              <span className="text-sky-400">currently</span>
              <span className="text-zinc-400">()</span> {"{"}
              {"\n    "}
              <span className="text-sky-400">return</span>{" "}
              <span className="text-amber-200">
                &quot;Designing Liquid Noir experiences for the web.&quot;
              </span>
              {";\n  "}
              {"},"}
              {"\n"};
              {"\n"}
              {"};\n"}
              <span className="text-emerald-300">frontendArtist</span>
              <span className="text-zinc-400">.</span>
              <span className="text-emerald-300">currently</span>
              <span className="text-zinc-400">();</span>
              {"\n"}
              <span className="text-zinc-500">
                // Output: Dreams shipped.
              </span>
            </code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
}

