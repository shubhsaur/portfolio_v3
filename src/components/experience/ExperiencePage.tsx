"use client";

import {
  Award,
  Calendar,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Card } from "@/components/ui/card";
import { PageGrid } from "@/components/layout/PageGrid";
import { Reveal } from "@/components/motion/Reveal";
import {
  experienceKpis,
  experiences,
} from "@/lib/content/experience";

import { PageHero } from "@/components/motion/PageHero";

export function ExperiencePage() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <div className="relative z-10 pt-28 pb-24 sm:pt-40 sm:pb-32">
      <PageGrid className="gap-y-14 sm:gap-y-16">
        {/* Header */}
        <div className="col-span-4 sm:col-span-8 lg:col-span-12">
          <PageHero
            title={
              <>
                Experience shaped by{" "}
                <span className="font-[family-name:var(--font-pacifico)] text-[var(--ln-accent)]">
                  impact
                </span>
                .
              </>
            }
            description="Frontend engineering across products, platforms and teams — building scalable interfaces, solving complex problems, and turning ideas into experiences that work beautifully in the real world."
          />
        </div>

        {/* Page-level KPIs */}
        <Reveal delay={0.03} className="col-span-4 sm:col-span-8 lg:col-span-12">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {experienceKpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-[var(--ln-radius-card)] border border-border bg-card px-5 py-5 text-center sm:px-6 sm:py-6"
              >
                <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {kpi.value}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {kpi.label}
                </p>
                <p className="ln-mono mt-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {kpi.detail}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Timeline: spine left, roles right */}
        <div ref={timelineRef} className="relative col-span-4 sm:col-span-8 lg:col-span-12">

          {/* Static track (faded background rail) */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-4 top-4 w-px bg-border/40 md:left-8"
          />

          {/* Animated spine that grows as you scroll */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY, originY: 0 }}
            className="absolute bottom-8 left-4 top-4 w-px bg-gradient-to-b from-[var(--ln-accent)] via-[var(--ln-success)] to-transparent md:left-8"
          />

          <div className="space-y-10 sm:space-y-12">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;

              return (
                <Reveal
                  key={exp.id}
                  delay={0.06 + index * 0.03}
                  className="relative pl-12 sm:pl-16 md:pl-20"
                  viewport={{ once: true, margin: "120px 0px" }}
                >
                  {/* Timeline dot */}
                  <div
                    className={[
                      "absolute left-4 top-1.5 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border shadow-sm md:left-8",
                      exp.current
                        ? "border-[var(--ln-accent)] bg-[var(--ln-accent)]/15 text-[var(--ln-accent)]"
                        : "border-border bg-background text-muted-foreground",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Date label beside the dot */}
                  <span className="ln-mono absolute left-12 top-2.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:left-16 md:left-20">
                    {exp.period}
                  </span>

                  {/* Card — push down to clear the date label */}
                  <Card className="mt-8 overflow-hidden border-border p-5 sm:p-6 md:p-8">
                    <div className="space-y-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                              {exp.role}
                            </h2>
                            {exp.current && (
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ln-success)]/30 bg-[var(--ln-success)]/10 px-3 py-0.5 text-xs font-medium text-[var(--ln-success)]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--ln-success)]" />
                                Current Role
                              </span>
                            )}
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                            {exp.companyUrl ? (
                              <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-[var(--ln-accent)] hover:underline"
                              >
                                {exp.company}
                              </a>
                            ) : (
                              <span className="font-medium text-[var(--ln-accent)]">
                                {exp.company}
                              </span>
                            )}
                            <span className="text-muted-foreground/40" aria-hidden>
                              ·
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {exp.period}
                            </span>
                            <span className="text-muted-foreground/40" aria-hidden>
                              ·
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        <span className="ln-mono shrink-0 self-start rounded-full border border-border bg-muted/40 px-3.5 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                          {exp.type}
                        </span>
                      </div>

                      <p className="text-base leading-7 text-muted-foreground">
                        {exp.description}
                      </p>

                      {exp.awards && exp.awards.length > 0 && (
                        <div className="grid gap-3">
                          {exp.awards.map((award) => (
                            <div
                              key={award.title}
                              className="rounded-[var(--ln-radius-card)] border border-[var(--ln-accent)]/25 bg-[var(--ln-accent)]/5 p-4 sm:p-5"
                            >
                              <div className="flex items-start gap-3.5">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--ln-accent)]/15 text-[var(--ln-accent)]">
                                  <Award className="h-5 w-5" />
                                </div>
                                <div className="space-y-1">
                                  <span className="ln-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--ln-accent)]">
                                    Recognition
                                  </span>
                                  <h3 className="text-base font-semibold text-foreground">
                                    {award.title}
                                  </h3>
                                  <p className="text-sm leading-relaxed text-muted-foreground">
                                    {award.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="space-y-3">
                        <p className="ln-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                          Impact
                        </p>
                        <ul className="grid gap-2.5">
                          {exp.achievements.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                            >
                              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--ln-success)] opacity-90" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {exp.metrics && exp.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {exp.metrics.map((metric) => (
                            <div
                              key={metric.label}
                              className="rounded-[1rem] border border-border bg-muted/30 p-3"
                            >
                              <p className="ln-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                {metric.label}
                              </p>
                              <p className="mt-1 text-base font-semibold text-foreground">
                                {metric.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 pt-1">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-border bg-muted/20 px-3.5 py-1 text-xs text-muted-foreground transition hover:border-[var(--ln-accent)]/25 hover:text-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </PageGrid>
    </div>
  );
}
