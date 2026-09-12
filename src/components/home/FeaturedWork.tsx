"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { useCallback, type MouseEvent } from "react";
import { ArrowUpRight, Github, Image as ImageIcon } from "lucide-react";
import { projects } from "@/lib/content/projects";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

/* ──────────────────────────────────────────────
   Apple Liquid Glass — Featured Work Cards
   ────────────────────────────────────────────── */

const FEATURED_SLUGS = ["uno-booking", "dealopoly"] as const;

const featured = FEATURED_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(
  (p): p is (typeof projects)[number] => Boolean(p)
);

const accentForSlug: Record<string, { glow: string; tint: string; border: string }> = {
  "uno-booking": { glow: "rgba(185,130,74,.30)", tint: "rgba(185,130,74,.10)", border: "rgba(185,130,74,.40)" },
  "dealopoly":   { glow: "rgba(225,112,85,.30)",  tint: "rgba(225,112,85,.10)", border: "rgba(225,112,85,.40)" },
};

/* ── Liquid Glass Card ── */

function LiquidGlassCard({ project }: { project: typeof featured[number] }) {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const accent = accentForSlug[project.slug] ?? accentForSlug["codelens"];

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [prefersReducedMotion, mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  }, [mouseX, mouseY]);

  // Cursor-following specular highlight
  const specularBg = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,.12), transparent 70%)`;
  // Cursor-following accent glow on border
  const borderGlow = useMotionTemplate`radial-gradient(260px circle at ${mouseX}px ${mouseY}px, ${accent.border}, transparent 65%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 260, damping: 22 } }}
      className={cn(
        "lg-card group relative flex flex-col h-full overflow-hidden rounded-[1.5rem]",
        "border border-white/[0.08] border-t-white/[0.18]",
        "bg-white/[0.03]",
        "backdrop-blur-[60px] saturate-[2]",
        "shadow-[0_8px_32px_rgba(0,0,0,.12),0_1px_4px_rgba(0,0,0,.08),inset_1px_1px_0_rgba(255,255,255,.12),inset_-1px_-1px_0_rgba(255,255,255,.04)]",
        "hover:shadow-[0_16px_48px_rgba(0,0,0,.16),0_2px_8px_rgba(0,0,0,.10),inset_1px_1px_0_rgba(255,255,255,.18),inset_-1px_-1px_0_rgba(255,255,255,.06)]",
        "hover:border-white/[0.14] hover:border-t-white/[0.28]",
        "active:scale-[0.98] active:shadow-[0_4px_16px_rgba(0,0,0,.18),inset_0_0_24px_rgba(255,255,255,.08)]",
        "transition-all duration-300",
      )}
    >
      {/* ── Prismatic top-edge highlight ── */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,.45) 25%, rgba(255,255,255,.20) 50%, rgba(255,255,255,.35) 75%, transparent 95%)",
        }}
      />
      {/* Left-edge refraction */}
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-px"
        style={{
          background: "linear-gradient(180deg, transparent 8%, rgba(255,255,255,.18) 30%, rgba(255,255,255,.06) 60%, transparent 92%)",
        }}
      />
      {/* Right-edge subtle refraction */}
      <span
        className="pointer-events-none absolute inset-y-0 right-0 w-px"
        style={{
          background: "linear-gradient(180deg, transparent 40%, rgba(255,255,255,.08) 65%, transparent 90%)",
        }}
      />

      {/* ── Ambient accent tint bleed ── */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${accent.tint}, transparent 70%)` }}
      />

      {/* ── Cursor-following specular highlight ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: specularBg }}
      />

      {/* ── Cursor-following border glow ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: borderGlow,
          maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* ── Glass depth layers ── */}
      {/* Inner specular sheen — primary visual on transparent surface */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: "linear-gradient(165deg, rgba(255,255,255,.12) 0%, rgba(255,255,255,.04) 20%, transparent 45%, transparent 60%, rgba(255,255,255,.03) 100%)",
        }}
      />
      {/* Bottom depth shadow (inside glass) */}
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 rounded-b-[inherit]"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,.06), transparent)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col flex-1">
        {/* ── Image thumbnail (shine sweep on hover, mirrors /projects) ── */}
        <Link
          href={`/projects/${project.slug}`}
          className="thumbnail-shine relative mb-5 block aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl border border-white/[0.08]"
          style={{
            background: `radial-gradient(ellipse 100% 80% at 50% 0%, ${accent.tint}, transparent 75%), linear-gradient(160deg, rgba(255,255,255,.05), rgba(0,0,0,.12))`,
          }}
        >
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              unoptimized
              quality={100}
              className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <ImageIcon className="fw-thumb-icon h-6 w-6 text-white/25" strokeWidth={1.5} />
              <span className="ln-mono select-none px-3 text-center text-[0.625rem] uppercase tracking-[0.3em] text-white/40">
                {project.title}
              </span>
            </div>
          )}

          {/* Shine sweep — slides left-to-right on hover */}
          <span aria-hidden="true" className="thumbnail-shine-sweep" />
        </Link>

        {/* Badge + links row */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-[var(--ln-text-secondary)]"
            style={{
              borderColor: accent.border,
              background: accent.tint,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: accent.glow, boxShadow: `0 0 8px ${accent.glow}` }}
            />
            {project.badge}
          </span>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lg-icon-btn"
                aria-label={`${project.title} on GitHub`}
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lg-icon-btn"
                aria-label={`${project.title} live demo`}
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--ln-text-primary)] mb-2 group-hover:text-[var(--ln-accent)] transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[0.8125rem] sm:text-sm leading-relaxed text-[var(--ln-text-body)] line-clamp-3 mb-4">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="lg-pill"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="lg-pill text-[var(--ln-text-muted)]">+{project.tech.length - 4}</span>
          )}
        </div>

        {/* Stats bar */}
        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[var(--ln-glass-border)] pt-4">
          {project.stats.slice(0, 3).map((stat) => (
            <div key={stat.label}>
              <p className="text-[0.6875rem] sm:text-xs font-semibold text-[var(--ln-text-primary)]">{stat.value}</p>
              <p className="text-[0.5625rem] sm:text-[0.625rem] text-[var(--ln-text-muted)] uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-5 flex flex-wrap items-center gap-2 pt-1">
          <Button asChild size="sm">
            <Link href={`/projects/${project.slug}`}>
              <span>Case Study</span>
              <span aria-hidden="true" className="text-[10px]">↳</span>
            </Link>
          </Button>
          {project.liveUrl && (
            <Button asChild variant="outline" size="sm">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Live</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ── */

export function FeaturedWork() {
  return (
    <section id="featured" className="scroll-mt-24 md:scroll-mt-28 pt-0 pb-12 md:pb-20 lg:pb-32">
      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-left mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Featured{" "}
            <span className="font-[family-name:var(--font-pacifico)] text-[var(--ln-accent)] font-normal transition-colors duration-500">
              Work
            </span>
          </h2>
          <p className="max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground">
            A curated selection of enterprise SaaS platforms, high-concurrency booking engines, and intelligent web applications built for scale.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 items-stretch">
          {featured.map((project, index) => (
            <Reveal
              key={project.slug}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 0.08}
              className="h-full flex flex-col"
            >
              <LiquidGlassCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.18} direction="up" className="mt-10 flex justify-center">
          <Button asChild size="lg" variant="outline" className="gap-2 px-8">
            <Link href="/projects">
              Show All Projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
