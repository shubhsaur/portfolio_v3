"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/lib/content/projects";
import { contributions } from "@/lib/content/opensource";

export function ProjectsIndex() {
  const prefersReducedMotion = useReducedMotion();

  const workProjects = projects.filter((p) => p.group === "work");
  const personalProjects = projects.filter((p) => p.group === "personal");

  return (
    <div className="space-y-24">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-zinc-50 sm:text-4xl">Projects</h1>
        <p className="text-base text-zinc-400 max-w-3xl mx-auto">
          Enterprise hotel booking engines, B2B content syndication suites, fintech price trackers,
          and AI developer tools built over 5+ years of frontend engineering.
        </p>
      </div>

      {/* Work Projects */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-zinc-50">Work Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Personal Projects */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-zinc-50">Personal Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {personalProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Open Source Block */}
      <OpenSourceBlock />
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className="group overflow-hidden rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 transition-all duration-300 hover:border-[var(--ln-accent)]"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">{project.group}</span>
        </div>

        <h3 className="text-xl font-semibold text-zinc-50">{project.title}</h3>

        <p className="text-sm text-zinc-300 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full border border-white/6 bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-zinc-100"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={`/projects/${project.slug}`}>
            <a className="text-xs text-[var(--ln-accent)] hover:underline">View details</a>
          </Link>
          {project.liveUrl && (
            <Button asChild size="sm" className="text-xs">
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Live App
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild variant="outline" size="sm" className="text-xs">
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function OpenSourceBlock() {
  const preferredMotion = useReducedMotion();

  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-50">Open Source Impact</h2>
        <p className="text-base text-zinc-400 max-w-2xl mx-auto">
          Contributing bug discoveries, isolations, and merged pull requests to premier
          open-source React component ecosystems.
        </p>
      </div>

      {/* PrimeReact Banner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#06b6d4]/10 text-[#06b6d4] shadow-sm">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0L2 6v12l10 6 10-6V6L12 0z" />
              </svg>
            </div>
            <span className="text-lg font-semibold">PrimeReact</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-300 mb-4">
            The leading open-source UI suite for React used by thousands of companies globally.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="ln-mono inline-flex items-center gap-1.5 rounded-full border border-[var(--ln-success)]/20 bg-[var(--ln-success)]/10 px-3 py-1 text-xs text-[var(--ln-success)]">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 3a3 3 0 013 3v12a3 3 0 01-3 3H5a3 3 0 01-3-3V6a3 3 0 013-3h11zm0 2H5v12h11a1 1 0 001-1v-3h2a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h11a1 1 0 011 1v3a1 1 0 01-1 1zm4 4a1 1 0 10-2 0v4a1 1 0 002 0V9z" />
              </svg>
              8.3k+ GitHub Stars
            </span>
            <span className="ln-mono inline-flex items-center gap-1.5 rounded-full border border-[var(--ln-success)]/20 bg-[var(--ln-success)]/10 px-3 py-1 text-xs text-[var(--ln-success)]">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4v16h16V4H4zm12 12H6V6h10v10z" />
              </svg>
              2 Merged PRs
            </span>
            <span className="ln-mono inline-flex items-center gap-1.5 rounded-full border border-[rgba(232,197,71,0.2)] bg-[rgba(232,197,71,0.08)] px-3 py-1 text-xs text-[var(--ln-accent-gold)]">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              v10.6.0 Shipped
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Contribution Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {contributions.map((contrib) => (
          <motion.div
            key={contrib.id}
            initial={preferredMotion ? false : { opacity: 0, y: 20 }}
            whileInView={preferredMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <Card className="h-full flex flex-col">
              <CardContent className="flex-1 space-y-4 pt-5">
                <div className="flex gap-2">
                  <span className="ln-mono text-xs text-zinc-400">#{contrib.prNumber}</span>
                  <span className="ln-mono text-xs text-[var(--ln-success)]">
                    Merged into {contrib.milestone}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-50">{contrib.title}</h3>
                <p className="text-xs text-zinc-300">{contrib.description}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {contrib.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/6 bg-white/[0.02] px-2 py-0.5 text-[10px] text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <div className="mt-4 flex gap-2">
                <Button asChild size="sm" className="text-xs">
                  <a href={contrib.prUrl} target="_blank" rel="noreferrer">
                    View PR
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="text-xs">
                  <a href={contrib.issueUrl} target="_blank" rel="noreferrer">
                    View Issue
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}