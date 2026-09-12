"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, GraduationCap, Briefcase, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

export function AboutTeaser() {
  return (
    <section
      aria-labelledby="about-teaser-heading"
      className="relative mt-8 sm:mt-12 md:mt-16 mx-auto max-w-[87.5rem] px-4 sm:px-6 lg:px-8"
    >
      <Reveal direction="left">
        <div className="group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-border/70 border-t-white/15 bg-card/60 backdrop-blur-2xl shadow-[var(--ln-shadow-surface)] transition-all duration-500 hover:border-border hover:shadow-2xl">
        {/* Theme-reactive ambient radial glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-60 blur-3xl transition-colors duration-700 sm:h-96 sm:w-96"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--ln-accent) 28%, transparent) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full opacity-40 blur-3xl transition-colors duration-700 sm:h-[28rem] sm:w-[28rem]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--ln-accent-amethyst, #8067a1) 22%, transparent) 0%, color-mix(in srgb, var(--ln-accent) 12%, transparent) 45%, transparent 70%)",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center px-6 py-14 sm:px-12 sm:py-20 md:py-24 text-center">
          {/* Status Kicker Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-4 py-1.5 text-xs text-foreground/90 backdrop-blur-md shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[var(--ln-accent)]" />
            <span className="ln-mono text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground">
              Background &amp; Philosophy
            </span>
          </div>

          {/* Heading */}
          <h2
            id="about-teaser-heading"
            className="mt-6 sm:mt-8 max-w-4xl text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15]"
          >
            Curious by nature,{" "}
            <span className="font-[family-name:var(--font-pacifico)] text-[var(--ln-accent)] font-normal inline-block transition-colors duration-500">
              grounded in systems.
            </span>
          </h2>

          {/* Body Description */}
          <div className="mt-5 sm:mt-6 max-w-3xl space-y-4 text-balance text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
            <p>
              I&apos;m <span className="font-semibold text-foreground">Shubham Saurabh</span>, a frontend engineer with <span className="font-semibold text-foreground">5+ years of experience</span> architecting scalable SaaS platforms, large-scale hotel booking engines, and robust cloud workflows. Currently <span className="font-semibold text-foreground">SDE - I at RateGain</span>, after delivering self-service dashboards and API reliability engineering as a Senior System Engineer at Infosys.
            </p>
            <p>
              My engineering foundation began at <span className="font-semibold text-foreground">Delhi Technological University (DTU)</span>, earning a B.Tech in Polymer Science &amp; Chemical Technology with a 7.82 GPA (class of 2020). That background in analytical modeling and systems thinking continues to shape how I design resilient, performant frontend architectures today.
            </p>
          </div>

          {/* Quick Credential Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-3.5 py-1 text-xs text-foreground/80 backdrop-blur-sm">
              <Briefcase className="h-3 w-3 text-[var(--ln-accent)]" />
              <span>SDE - I @ RateGain</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-3.5 py-1 text-xs text-foreground/80 backdrop-blur-sm">
              <GraduationCap className="h-3 w-3 text-[var(--ln-accent)]" />
              <span>DTU &apos;20 · B.Tech</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-3.5 py-1 text-xs text-foreground/80 backdrop-blur-sm">
              <Award className="h-3 w-3 text-[var(--ln-accent)]" />
              <span>Pinnacle Performer</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 sm:mt-10">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/about" className="group/btn inline-flex items-center gap-2">
                <span>Read my story</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
  );
}