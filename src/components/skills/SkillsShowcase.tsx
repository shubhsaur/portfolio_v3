"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/card";
import {
  skills,
  skillCategories,
  type SkillCardData,
} from "@/lib/content/skills";

function SkillCard({
  skill,
  delay,
  direction,
}: {
  skill: SkillCardData;
  delay: number;
  direction?: "left" | "right";
}) {
  return (
    <Reveal delay={delay} direction={direction}>
      <Card className="flex h-full flex-col border-border p-6 sm:p-7">
        <div
          className={[
            "flex h-12 w-12 items-center justify-center rounded-2xl",
            skill.iconBg,
          ].join(" ")}
        >
          <skill.Icon className={["h-6 w-6", skill.iconColor].join(" ")} />
        </div>

        <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
          {skill.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-7 text-muted-foreground">
          {skill.description}
        </p>

        <span className="ln-mono mt-5 inline-flex self-start rounded-full border border-[var(--ln-accent)]/20 bg-[var(--ln-accent)]/10 px-3.5 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--ln-accent)]">
          {skill.level}
        </span>
      </Card>
    </Reveal>
  );
}

export function SkillsShowcase() {
  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <span className="ln-mono inline-flex rounded-full border border-[var(--ln-accent)]/20 bg-[var(--ln-accent)]/10 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[var(--ln-accent)]">
          Technical Stack
        </span>
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Skills & tools
        </h2>
        <p className="text-base leading-8 text-muted-foreground">
          A production toolkit shaped around scalable SaaS, high-converting booking
          engines, and reliable cloud workflows.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            delay={index * 0.03}
            direction={index % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            Tools, libraries & cloud
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Languages, frameworks, databases, and day-to-day engineering tools.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, index) => {
            const CatIcon = category.icon;
            return (
              <Reveal
                key={category.title}
                delay={0.03 + index * 0.03}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <Card className="h-full border-border p-5">
                  <div className="flex items-center gap-2.5 border-b border-border pb-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--ln-accent)]/10 text-[var(--ln-accent)]">
                      <CatIcon className="h-4 w-4" />
                    </div>
                    <h4 className="text-sm font-semibold tracking-tight text-foreground">
                      {category.title}
                    </h4>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.items.map((item) => {
                      const BrandIcon = item.brandIcon;
                      return (
                        <span
                          key={item.name}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/20 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-[var(--ln-accent)]/25 hover:text-foreground"
                        >
                          {BrandIcon && (
                            <BrandIcon className="h-3.5 w-3.5 shrink-0" />
                          )}
                          <span>{item.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
