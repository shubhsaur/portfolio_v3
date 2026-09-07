"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  TrendingUp,
  Code2,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { experiences } from "@/lib/content/experience";
import type { ExperienceRecord } from "@/lib/content/experience";

export function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-16">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-5 text-left md:items-center md:text-center">
        <span className="ln-mono inline-flex rounded-full border border-[rgba(232,197,71,0.18)] bg-[rgba(232,197,71,0.08)] px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[var(--ln-accent-gold)]">
          Career Journey
        </span>
        <div className="space-y-4">
          <h2
            id="experience-heading"
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl"
          >
            Work Experience & Milestones
          </h2>
          <p className="max-w-2xl text-base leading-8 text-zinc-400">
            5+ years of designing scalable web applications, enterprise SaaS
            platforms, and large-scale hotel booking systems.
          </p>
        </div>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative mx-auto max-w-4xl">
        {/* Continuous Gradient Timeline Spine */}
        <div
          aria-hidden="true"
          className="absolute left-4 top-4 bottom-8 w-0.5 bg-gradient-to-b from-[var(--ln-accent-gold)] via-[var(--ln-accent-cyan)] to-transparent md:left-8"
        />

        <div className="space-y-12">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;

            return (
              <motion.div
                key={exp.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 0.55, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 }
                }
                className="relative pl-7 sm:pl-12 md:pl-20"
              >
                {/* Timeline Milestone Node */}
                <div
                  className={[
                    "absolute left-0 md:left-4 top-1.5 flex h-7 w-7 sm:h-8 sm:w-8 -translate-x-1/2 items-center justify-center rounded-full border shadow-lg transition-transform duration-300",
                    exp.current
                      ? "border-[var(--ln-accent-gold)] bg-[rgba(232,197,71,0.15)] text-[var(--ln-accent-gold)] shadow-[0_0_20px_rgba(232,197,71,0.4)]"
                      : "border-white/15 bg-zinc-900 text-zinc-400",
                  ].join(" ")}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>

                {/* Main Card */}
                <Card className="group relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4 sm:p-6 md:p-8 transition-all duration-300 hover:border-white/15 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                  {/* Ambient Hover Glow */}
                  <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,197,71,0.06),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(93,228,199,0.06),transparent_50%)]" />
                  </div>

                  <div className="relative space-y-6">
                    {/* Header Row */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-2xl font-semibold tracking-tight text-zinc-50">
                            {exp.role}
                          </h3>
                          {exp.current && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-0.5 text-xs font-medium text-emerald-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Current Role
                            </span>
                          )}
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400">
                          <span className="font-medium text-[var(--ln-accent-gold)]">
                            {exp.company}
                          </span>
                          <span className="text-zinc-600">•</span>
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                            {exp.period}
                          </span>
                          <span className="text-zinc-600">•</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      <span className="ln-mono shrink-0 self-start rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-1 text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                        {exp.type}
                      </span>
                    </div>

                    {/* Summary Description */}
                    <p className="text-base leading-7 text-zinc-300">
                      {exp.description}
                    </p>

                    {/* Awards Highlight (If available) */}
                    {exp.awards && exp.awards.length > 0 && (
                      <div className="grid gap-3">
                        {exp.awards.map((award, aIdx) => (
                          <div
                            key={aIdx}
                            className="relative overflow-hidden rounded-2xl border border-[rgba(232,197,71,0.25)] bg-[radial-gradient(ellipse_at_top_left,rgba(232,197,71,0.12),transparent_70%),rgba(15,15,22,0.6)] p-4 sm:p-5"
                          >
                            <div className="flex items-start gap-3.5">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(232,197,71,0.15)] text-[var(--ln-accent-gold)] shadow-[0_0_20px_rgba(232,197,71,0.25)]">
                                <Award className="h-5 w-5" />
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="ln-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--ln-accent-gold)]">
                                    Recognition & Accolades
                                  </span>
                                </div>
                                <h4 className="text-base font-semibold text-zinc-50">
                                  {award.title}
                                </h4>
                                <p className="text-xs leading-relaxed text-zinc-300 sm:text-sm">
                                  {award.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Key Impact Bullets */}
                    <div className="space-y-3 pt-1">
                      <p className="ln-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                        Key Responsibilities & Impact
                      </p>
                      <ul className="grid gap-2.5">
                        {exp.achievements.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm leading-6 text-zinc-300"
                          >
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--ln-accent-cyan)] opacity-80" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics Row (If available) */}
                    {exp.metrics && (
                      <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3">
                        {exp.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="rounded-2xl border border-white/6 bg-black/25 p-3"
                          >
                            <p className="ln-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                              {metric.label}
                            </p>
                            <p className="mt-1 text-base font-semibold text-zinc-100">
                              {metric.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Skills & Tech Stack Chips */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/6 bg-white/[0.025] px-3.5 py-1 text-xs text-zinc-300 transition hover:border-[rgba(232,197,71,0.25)] hover:text-zinc-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
