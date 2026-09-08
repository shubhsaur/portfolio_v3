"use client";

import Link from "next/link";

export function SkillsStrip() {
  const skillList = [
    { name: "React", slug: "react" },
    { name: "Next.js", slug: "nextjs" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Redux Toolkit", slug: "redux" },
    { name: "React Query", slug: "react-query" },
    { name: "Tailwind CSS", slug: "tailwind" },
    { name: "AWS", slug: "aws" },
    { name: "Git/GitHub", slug: "git" },
  ];

  return (
    <section className="py-12 md:py-20">
      <h3 className="text-center text-lg font-semibold tracking-tight text-foreground mb-6">
        Technologies
      </h3>

      <div className="flex flex-wrap justify-center gap-2">
        {skillList.map((skill) => (
          <Link
            key={skill.slug}
            href="/about#skills"
            className="group inline-flex items-center rounded-full border border-[var(--ln-card-border)] bg-[var(--ln-accent-wash)] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-[var(--ln-card-border-hover)] hover:text-foreground focus-visible:ln-ring-focus"
          >
            {skill.name}
            <span className="ml-1 text-muted-foreground/60 group-hover:text-muted-foreground">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}