"use client";

import { useReducedMotion } from "framer-motion";
import { skills, skillCategories } from "@/lib/content/skills";
import { cn } from "@/lib/utils";

export function FeaturedWork() {
  const prefersReducedMotion = useReducedMotion();

  const featuredProjects = [
    {
      slug: "uno-booking",
      title: "Uno Booking Engine",
      description: "High-performance hotel booking engine engineered for multiple international hotel brands.",
      githubUrl: "https://github.com/shubhsaur",
      liveUrl: "https://uno.rategain.com/hotel-booking-engine/",
      tech: ["React 19", "Next.js", "TypeScript", "Redux Toolkit"],
    },
    {
      slug: "content-ai",
      title: "Content AI",
      description: "B2B Content Management Platform boosting rendering performance by 60% via React Final Form.",
      githubUrl: "https://github.com/shubhsaur",
      liveUrl: "https://rategain.com/hotel-content-management-system/",
      tech: ["React", "React Context", "Redux Final Form"],
    },
    {
      slug: "codelens",
      title: "Codelens",
      description: "AI-powered codebase explorer that indexes GitHub repos and answers repo questions.",
      githubUrl: "https://github.com/shubhsaur/codelens",
      liveUrl: "https://shubhsaur-codelens.vercel.app/",
      tech: ["Next.js", "Tailwind CSS", "Supabase", "Google Gemini"],
    },
  ];

  return (
    <section
      id="featured"
      className="pt-24 pb-12 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32"
    >
<h2 className="text-center text-6xl font-semibold tracking-tight text-zinc-50 mb-12 md:mb-20">
         Featured Work
       </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <div
            key={project.slug}
            className={cn(
              "rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 sm:p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/5",
              prefersReducedMotion ? "" : "hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)]"
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="ln-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {project.slug}
              </span>
            </div>

            <h3 className="text-xl font-semibold tracking-tight text-zinc-100 mb-1">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {project.description}
            </p>

            <div className="mt-3 grid gap-1.5 grid-cols-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full border border-white/6 bg-white/[0.03] px-2.5 py-1.5 text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-zinc-100"
                >
                  {tech === "React 19" && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
                  )}
                  {tech === "Next.js" && (
                    <span className="h-2 w-2 rounded-full bg-sky-500/60" />
                  )}
                  {tech === "TypeScript" && (
                    <span className="h-2 w-2 rounded-full bg-slate-400/60" />
                  )}
                  {tech === "Redux Toolkit" && (
                    <span className="h-2 w-2 rounded-full bg-amber-500/60" />
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}