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
      <h3 className="text-center text-lg font-semibold tracking-tight text-zinc-200 mb-6">
        Technologies
      </h3>

      <div className="flex flex-wrap justify-center gap-2">
        {skillList.map((skill) => (
          <Link
            key={skill.slug}
            href="/about#skills"
            className="group inline-flex items-center rounded-full border border-white/6 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-zinc-100 focus-visible:ln-ring-focus"
          >
            {skill.name}
            <span className="ml-1 text-zinc-500 group-hover:text-zinc-300">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}