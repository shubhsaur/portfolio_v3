"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/lib/content/projects";
import { contributions } from "@/lib/content/opensource";

export function ProjectsIndex() {
  const workProjects = projects.filter((p) => p.group === "work");
  const personalProjects = projects.filter((p) => p.group === "personal");

  return (
    <div className="space-y-24">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Projects</h1>
        <p className="mx-auto max-w-3xl text-base text-muted-foreground">
          Enterprise hotel booking engines, B2B content syndication suites, fintech price trackers,
          and AI developer tools built over 5+ years of frontend engineering.
        </p>
      </div>

      <section>
        <h2 className="mb-6 text-2xl font-semibold text-foreground">Work Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={index * 0.03} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold text-foreground">Personal Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {personalProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={index * 0.03} />
          ))}
        </div>
      </section>

      <OpenSourceBlock />
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
      <article className="group overflow-hidden rounded-[var(--ln-radius-card)] border border-border bg-card p-6 transition-colors hover:border-[var(--ln-accent)]/40">
        <div className="space-y-3">
          <span className="ln-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {project.group}
          </span>

          <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>

          <p className="text-sm leading-relaxed text-muted-foreground">
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

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="text-xs font-medium text-[var(--ln-accent)] hover:underline"
            >
              Case study
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function OpenSourceBlock() {
  return (
    <section className="space-y-12">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-foreground">Open Source Impact</h2>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground">
          Contributing bug discoveries, isolations, and merged pull requests to premier
          open-source React component ecosystems.
        </p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--ln-success)]/10 text-[var(--ln-success)]">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 0L2 6v12l10 6 10-6V6L12 0z" />
              </svg>
            </div>
            <span className="text-lg font-semibold">PrimeReact</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            The leading open-source UI suite for React used by thousands of companies globally.
          </p>
          <div className="flex flex-wrap gap-2">
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
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {contributions.map((contrib, index) => (
          <Reveal key={contrib.id} delay={index * 0.03}>
            <Card className="flex h-full flex-col border-border">
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
    </section>
  );
}
