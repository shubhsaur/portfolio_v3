"use client";

import Link from "next/link";

export function AboutTeaser() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-base md:text-lg leading-8 text-zinc-300 mb-6">
          I&apos;m <span className="font-semibold text-zinc-50">Shubham Saurabh</span>,
          a Frontend Engineer with <span className="font-semibold text-zinc-50">5+ years of experience</span> building
          scalable SaaS platforms, large-scale hotel booking engines, and robust cloud workflows.
          Currently <span className="font-semibold text-zinc-50">SDE - I at RateGain</span>,
          previously Senior System Engineer at Infosys.
        </p>
        <p className="text-base md:text-lg leading-8 text-zinc-300 mb-8">
          My engineering foundation began at <span className="font-medium text-zinc-100">Delhi Technological University (DTU)</span>,
          where I graduated with a B.Tech in Polymer Science & Chemical Technology.
          That background in analytical modeling and systems thinking continues to shape my approach
          to building resilient frontend architectures.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--ln-accent)]/20 bg-[var(--ln-accent)]/10 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[var(--ln-accent)] transition hover:border-[var(--ln-accent)]/40 hover:bg-[var(--ln-accent)]/15"
        >
          Read my story
        </Link>
      </div>
    </section>
  );
}