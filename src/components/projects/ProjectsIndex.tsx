"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/lib/content/projects";
import { contributions } from "@/lib/content/opensource";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const filterCategories = [
  "All",
  "SaaS",
  "Mobile",
  "Web",
  "Branding",
  "AI",
  "Admin Panel",
  "Open Source",
] as const;

type FilterCategory = (typeof filterCategories)[number];

export function ProjectsIndex() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.categories?.includes(activeCategory));

  const workProjects = filteredProjects.filter((p) => p.group === "work");
  const personalProjects = filteredProjects.filter((p) => p.group === "personal");

  const showOpenSource =
    activeCategory === "All" ||
    activeCategory === "Web" ||
    activeCategory === "Open Source";

  const showProjectGrids = activeCategory !== "Open Source";

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Title & Description */}
      <div className="space-y-4 text-left">
        <h1 className="text-5xl font-bold text-foreground sm:text-6xl">
          Interfaces built with{" "}
          <span className="font-[family-name:var(--font-pacifico)] text-[var(--ln-accent)] font-normal transition-colors duration-500">
            intent
          </span>
          .
        </h1>
        <p className="max-w-3xl text-xl text-muted-foreground">
          Frontend experiences across SaaS platforms, dashboards, mobile products and digital brands — turning complex requirements into clean, responsive and purposeful interfaces.
        </p>
      </div>

      {/* Apple-style Capsule Filter Bar */}
      <div className="flex justify-start overflow-x-auto scrollbar-none py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-border/80 border-t-white/20 bg-card/75 dark:bg-white/[0.04] p-1.5 shadow-[var(--ln-shadow-surface)] backdrop-blur-2xl">
          {filterCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "relative rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer select-none",
                  isActive
                    ? "text-[var(--ln-accent-foreground)] font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="projectFilterActivePill"
                    className="absolute inset-0 rounded-full bg-[var(--ln-accent)] shadow-sm"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Grids */}
      {showProjectGrids && (
        <div className="space-y-16 sm:space-y-20">
          {workProjects.length > 0 && (
            <section>
              <h2 className="mb-6 text-3xl font-semibold text-foreground flex items-center gap-3">
                <span>Work Projects</span>
                <span className="ln-mono text-xs font-normal text-muted-foreground border border-border/60 rounded-full px-2.5 py-0.5">
                  {workProjects.length}
                </span>
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {workProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} delay={index * 0.03} />
                ))}
              </div>
            </section>
          )}

          {personalProjects.length > 0 && (
            <section>
              <h2 className="mb-6 text-3xl font-semibold text-foreground flex items-center gap-3">
                <span>Personal Projects</span>
                <span className="ln-mono text-xs font-normal text-muted-foreground border border-border/60 rounded-full px-2.5 py-0.5">
                  {personalProjects.length}
                </span>
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {personalProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} delay={index * 0.03} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Open Source Block */}
      {showOpenSource && <OpenSourceBlock />}
    </div>
  );
}

function ProjectCard({
  project,
  delay,
}: {
  project: (typeof projects)[number];
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[var(--ln-radius-card)] border border-border bg-card transition-colors hover:border-[var(--ln-accent)]/40">
        {/* ── Thumbnail area ── */}
        <Link
          href={`/projects/${project.slug}`}
          className="thumbnail-shine relative block aspect-[16/10] shrink-0 overflow-hidden bg-muted/40"
        >
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            /* Placeholder until real thumbnails are provided */
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="ln-mono text-[0.625rem] uppercase tracking-[0.3em] text-[var(--ln-text-soft)] select-none">
                {project.title}
              </span>
            </div>
          )}

          {/* Shine sweep — slides left-to-right on hover */}
          <span aria-hidden="true" className="thumbnail-shine-sweep" />
        </Link>

        {/* ── Card body ── */}
        <div className="flex flex-1 flex-col space-y-3 p-6">
          <span className="ln-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {project.group}
          </span>

          <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>

          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 border-t border-border pt-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border border-border bg-muted/20 px-2.5 py-1 text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-4">
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
                  rel="noreferrer"
                >
                  <span>Live</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline" size="sm">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-3 w-3" />
                  <span>GitHub</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function OpenSourceBlock() {
  return (
    <section className="space-y-6">
      <div className="space-y-2 text-left">
        <h2 className="text-3xl font-semibold text-foreground">Open Source Impact</h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          Contributing bug discoveries, isolations, and merged pull requests to premier
          open-source React component ecosystems.
        </p>
      </div>

      {/* Wrapper card for PrimeReact open-source project */}
      <div className="rounded-3xl border border-border bg-muted/20 p-4 sm:p-6 md:p-8 space-y-6 shadow-xs">
        {/* Main PrimeReact Header Card */}
        <Card className="group overflow-hidden border-border bg-card">
          <div className="flex flex-col md:flex-row md:items-stretch">
            {/* Left: Content */}
            <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--ln-success)]/10 text-[var(--ln-success)]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M12 0L2 6v12l10 6 10-6V6L12 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xl font-semibold text-foreground">PrimeReact</span>
                    <span className="ln-mono ml-2.5 text-xs text-muted-foreground">primefaces / primereact</span>
                  </div>
                </div>

                <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  The leading open-source UI suite for React used by thousands of companies globally.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="ln-mono inline-flex items-center gap-1.5 rounded-full border border-[var(--ln-success)]/20 bg-[var(--ln-success)]/10 px-3 py-1 text-xs text-[var(--ln-success)]">
                  8.3k+ GitHub Stars
                </span>
                <span className="ln-mono inline-flex items-center gap-1.5 rounded-full border border-[var(--ln-success)]/20 bg-[var(--ln-success)]/10 px-3 py-1 text-xs text-[var(--ln-success)]">
                  2 Merged PRs
                </span>
                <span className="ln-mono inline-flex items-center gap-1.5 rounded-full border border-[var(--ln-accent)]/20 bg-[var(--ln-accent)]/10 px-3 py-1 text-xs text-[var(--ln-accent)]">
                  v10.6.0 Shipped
                </span>
              </div>
            </div>

            {/* Right: PrimeReact Image */}
            <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden md:w-[320px] lg:w-[380px]">
              <Image
                src="/primereact.png"
                alt="PrimeReact"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 380px"
              />
              <span aria-hidden="true" className="thumbnail-shine-sweep" />
            </div>
          </div>
        </Card>

        {/* PRs and Issues Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {contributions.map((contrib, index) => (
            <Reveal key={contrib.id} delay={index * 0.03}>
              <Card className="flex h-full flex-col border-border bg-card">
                <CardContent className="flex-1 space-y-4 pt-5">
                  <div className="flex gap-2">
                    <span className="ln-mono text-xs text-muted-foreground">
                      #{contrib.prNumber}
                    </span>
                    <span className="ln-mono text-xs text-[var(--ln-success)]">
                      Merged into {contrib.milestone}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{contrib.title}</h3>
                  <p className="text-xs text-muted-foreground">{contrib.description}</p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href={contrib.prUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-[var(--ln-accent)] hover:underline"
                    >
                      View PR
                    </a>
                    <a
                      href={contrib.issueUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      View Issue
                    </a>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
