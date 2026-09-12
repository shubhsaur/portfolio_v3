import Link from "next/link";
import { PageGrid } from "@/components/layout/PageGrid";
import { Reveal } from "@/components/motion/Reveal";
import { PortraitCard } from "@/components/about/PortraitCard";
import { SkillsShowcase } from "@/components/skills/SkillsShowcase";
import {
  aboutBio,
  aboutEducation,
  aboutFacts,
} from "@/lib/content/about";

export function AboutPage() {
  return (
    <div className="pt-28 pb-24 sm:pt-40 sm:pb-32">
      <PageGrid className="gap-y-16 sm:gap-y-20">
        {/* Header */}
        <div className="col-span-4 sm:col-span-8 lg:col-span-12">
          <div className="space-y-4 text-left">
            <h1 className="text-5xl font-bold text-foreground sm:text-6xl">
              Curious by{" "}
              <span className="font-[family-name:var(--font-pacifico)] text-[var(--ln-accent)]">
                nature
              </span>
              .
            </h1>
            <p className="max-w-3xl text-xl text-muted-foreground">
              I&apos;m a frontend engineer who cares deeply about how things work, feel and look — blending engineering, design and a healthy obsession with details to create digital experiences that are both purposeful and enjoyable.
            </p>
          </div>
        </div>

        {/* Prose + facts */}
        <Reveal
          delay={0.03}
          className="col-span-4 space-y-8 sm:col-span-8 lg:col-span-7"
        >
          <div className="space-y-5">
            {aboutBio.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-base leading-8 text-muted-foreground sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {aboutFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-[var(--ln-radius-card)] border border-border bg-card p-4"
              >
                <p className="ln-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="mr-1.5" aria-hidden>
                    {fact.icon}
                  </span>
                  {fact.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-[var(--ln-radius-card)] border border-border bg-muted/20 p-5 sm:p-6">
            <p className="ln-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ln-accent)]">
              Education
            </p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">
              {aboutEducation.degree}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {aboutEducation.school} · {aboutEducation.gpa} ·{" "}
              {aboutEducation.years}
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {aboutEducation.summary}
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            Prefer the career timeline?{" "}
            <Link
              href="/experience"
              className="font-medium text-[var(--ln-accent)] hover:underline"
            >
              View experience
            </Link>
            .
          </p>
        </Reveal>

        {/* Portrait */}
        <Reveal
          delay={0.06}
          className="col-span-4 sm:col-span-8 lg:col-span-4 lg:col-start-9"
        >
          <PortraitCard />
        </Reveal>

        {/* Skills inventory */}
        <section
          id="skills"
          className="col-span-4 scroll-mt-[var(--ln-scroll-mt)] sm:col-span-8 lg:col-span-12"
        >
          <Reveal delay={0.03}>
            <SkillsShowcase />
          </Reveal>
        </section>
      </PageGrid>
    </div>
  );
}
