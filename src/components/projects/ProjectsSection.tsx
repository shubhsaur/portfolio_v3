"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Hotel,
  Bot,
  Coins,
  Sparkles,
  ArrowUpRight,
  Github,
  ChevronDown,
  Layers,
  Cpu,
  Globe2,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/button";
import { projects, type ProjectCategory } from "@/lib/content/projects";
import type { ProjectRecord } from "@/lib/content/projects";

const categories: ProjectCategory[] = [
  "Enterprise SaaS",
  "AI & Tooling",
  "Fintech & Data",
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const prefersReducedMotion = useReducedMotion();

  const toggleDeepDive = (id: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    return project.category === activeCategory;
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col items-start gap-5 text-left md:items-center md:text-center">
        <span className="ln-mono inline-flex rounded-full border border-[rgba(232,197,71,0.18)] bg-[rgba(232,197,71,0.08)] px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[var(--ln-accent-gold)]">
          Projects
        </span>
        <div className="space-y-4">
          <h2
            id="projects-heading"
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl"
          >
            Featured Builds & Platforms
          </h2>
          <p className="max-w-2xl text-base leading-8 text-zinc-400">
            Enterprise hotel booking engines, B2B content syndication suites,
            fintech price trackers, and AI developer utilities.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center scrollbar-none px-1">
        {["All", ...categories].map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat as ProjectCategory | "All")}
              className={[
                "group relative shrink-0 rounded-full px-4 sm:px-5 py-2 text-xs font-medium transition-all duration-200 focus-visible:ln-ring-focus",
                isActive
                  ? "bg-zinc-100 text-zinc-950 shadow-md"
                  : "border border-white/8 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200",
              ].join(" ")}
            >
              <span className="relative z-10">{cat}</span>
              {isActive && (
                <motion.span
                  layoutId="active-project-pill"
                  className="absolute inset-0 rounded-full bg-zinc-100"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Projects List */}
      <motion.div layout className="grid gap-6 sm:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const ProjectIcon = project.icon;
            const isExpanded = !!expandedProjects[project.id];

            return (
              <motion.div
                key={project.id}
                layout
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <SpotlightCard
                  spotlightColor={project.spotlightColor}
                  surfaceGlowColor={project.surfaceGlowColor}
                  className="overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] border-border p-4 sm:p-6 md:p-8 transition-all duration-300 hover:border-[var(--ln-accent)]"
                >
                  <div className="space-y-6">
                    {/* Header Row */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(232,197,71,0.1)] text-[var(--ln-accent-gold)] shadow-sm">
                          <ProjectIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="ln-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                            {project.category}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-50">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <span className="ln-mono self-start rounded-full border border-[rgba(232,197,71,0.25)] bg-[rgba(232,197,71,0.08)] px-3.5 py-1 text-[11px] font-medium text-[var(--ln-accent-gold)]">
                        {project.badge}
                      </span>
                    </div>

                    {/* Summary Description */}
                    <p className="text-base leading-8 text-zinc-300">
                      {project.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {project.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-2xl border border-white/6 bg-black/30 p-3"
                        >
                          <p className="ln-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                            {stat.label}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-zinc-100">
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/6">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/6 bg-white/[0.03] px-3.5 py-1 text-xs text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleDeepDive(project.id)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-300 transition hover:border-[rgba(232,197,71,0.3)] hover:text-zinc-100"
                        >
                          <span>{isExpanded ? "Hide Details" : "Engineering Deep Dive"}</span>
                          <ChevronDown
                            className={[
                              "h-3.5 w-3.5 transition-transform duration-200",
                              isExpanded ? "rotate-180" : "",
                            ].join(" ")}
                          />
                        </button>

                        {project.liveUrl && (
                          <Button asChild className="text-xs">
                            <a href={project.liveUrl} target="_blank" rel="noreferrer">
                              Live App
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button asChild variant="outline" className="text-xs">
                            <a href={project.githubUrl} target="_blank" rel="noreferrer">
                              Repo
                              <Github className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Expandable Engineering Deep Dive Drawer */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden border-t border-white/8 pt-5"
                        >
                          <div className="rounded-2xl border border-white/6 bg-black/40 p-5 space-y-4">
                            <div>
                              <p className="ln-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ln-accent-gold)]">
                                System Overview
                              </p>
                              <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                                {project.deepDive.overview}
                              </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 pt-2">
                              <div className="space-y-2">
                                <p className="ln-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                                  Key Engineering Feats
                                </p>
                                <ul className="space-y-2 text-xs leading-relaxed text-zinc-300">
                                  {project.deepDive.highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ln-accent-cyan)]" />
                                      <span>{h}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="space-y-2">
                                <p className="ln-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                                  Architecture Decisions
                                </p>
                                <ul className="space-y-2 text-xs leading-relaxed text-zinc-300">
                                  {project.deepDive.architecture.map((a, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <Layers className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ln-accent-gold)]" />
                                      <span>{a}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
