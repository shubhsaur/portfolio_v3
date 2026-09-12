import Link from "next/link";
import { PageGrid } from "@/components/layout/PageGrid";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/motion/PageHero";
import { PortraitCard } from "@/components/about/PortraitCard";
import { SkillsShowcase } from "@/components/skills/SkillsShowcase";
import {
  aboutBio,
  aboutEducation,
  aboutFacts,
} from "@/lib/content/about";

export function AboutPage() {
  return (
    <div className="relative z-10 pt-28 pb-24 sm:pt-40 sm:pb-32">
      <PageGrid className="gap-y-16 sm:gap-y-20">
        {/* Header */}
        <div className="col-span-4 sm:col-span-8 lg:col-span-12">
          <PageHero
            title={
              <>
                Curious by{" "}
                <span className="font-[family-name:var(--font-pacifico)] text-[var(--ln-accent)]">
                  nature
                </span>
                .
              </>
            }
            description="I'm a frontend engineer who cares deeply about how things work, feel and look — blending engineering, design and a healthy obsession with details to create digital experiences that are both purposeful and enjoyable."
          />
        </div>

        {/* Portrait — appears directly after title on mobile, on the right on desktop */}
        <Reveal
          delay={0.04}
          direction="right"
          className="order-2 col-span-4 sm:col-span-8 lg:order-3 lg:col-span-4 lg:col-start-9 max-w-[340px] sm:max-w-md lg:max-w-none mx-auto lg:mx-0 w-full"
        >
          <PortraitCard />
        </Reveal>

        {/* Prose + facts */}
        <Reveal
          delay={0.06}
          direction="left"
          className="order-3 col-span-4 space-y-8 sm:col-span-8 lg:order-2 lg:col-span-7"
        >
          <div className="space-y-6">
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-zinc-900 dark:text-zinc-50">
              I’m <strong className="font-semibold text-foreground">Shubham Saurabh</strong>, a Frontend Engineer with{" "}
              <span className="font-semibold text-[var(--ln-accent)]">5+ years of experience</span> engineering{" "}
              <span className="font-semibold text-[var(--ln-accent)]">high-scale SaaS products</span>, mission-critical booking platforms, and resilient web applications. Currently an SDE-I at{" "}
              <span className="font-semibold text-[var(--ln-accent)]">RateGain</span>, I architect scalable, user-centric interfaces for global travel hospitality networks — having previously engineered self-service enterprise portals and API reliability workflows as a Senior System Engineer at{" "}
              <span className="font-semibold text-[var(--ln-accent)]">Infosys</span>.
            </p>

            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-zinc-900 dark:text-zinc-50">
              My engineering roots trace back to Delhi Technological University (
              <span className="font-semibold text-[var(--ln-accent)]">DTU</span>), where rigorous training in analytical modeling and complex systems laid the groundwork for how I build software today. Rather than treating frontend as just presentation, I approach interfaces from{" "}
              <span className="font-semibold text-[var(--ln-accent)]">first principles</span> — designing maintainable component systems, robust state architectures, and{" "}
              <span className="font-semibold text-[var(--ln-accent)]">high-performance rendering pipelines</span> that hold up under heavy real-world load.
            </p>

            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-zinc-900 dark:text-zinc-50">
              I bring a proven track record of taking complex product requirements from conception to{" "}
              <span className="font-semibold text-[var(--ln-accent)]">high-impact production delivery</span>. Recognized with the{" "}
              <span className="font-semibold text-[var(--ln-accent)]">Pinnacle Performer of the Year Award</span> (Q3 2024) and a Certificate of Achievement for{" "}
              <span className="font-semibold text-[var(--ln-accent)]">AWS Migration</span>, I combine technical rigor with deep ownership — building fast, accessible, and purposeful digital products that drive{" "}
              <span className="font-semibold text-[var(--ln-accent)]">measurable business outcomes</span>.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {aboutFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-[var(--ln-radius-card)] border border-border bg-card p-4"
              >
                <p className="ln-mono text-[10px] uppercase tracking-[0.22em] text-zinc-900 dark:text-zinc-50">
                  <span className="mr-1.5" aria-hidden>
                    {fact.icon}
                  </span>
                  {fact.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-900 dark:text-zinc-50">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-[var(--ln-radius-card)] border border-border bg-muted/20 p-5 sm:p-6">
            <p className="ln-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ln-accent)]">
              Education
            </p>
            <h2 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {aboutEducation.degree}
            </h2>
            <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
              {aboutEducation.school} · {aboutEducation.gpa} ·{" "}
              {aboutEducation.years}
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-900 dark:text-zinc-50">
              {aboutEducation.summary}
            </p>
          </div>

          <p className="text-sm text-zinc-900 dark:text-zinc-50">
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

        {/* Skills inventory */}
        <section
          id="skills"
          className="order-4 col-span-4 scroll-mt-[var(--ln-scroll-mt)] sm:col-span-8 lg:col-span-12"
        >
          <Reveal delay={0.03}>
            <SkillsShowcase />
          </Reveal>
        </section>
      </PageGrid>
    </div>
  );
}
