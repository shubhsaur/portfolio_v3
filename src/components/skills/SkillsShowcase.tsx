"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Atom,
  Boxes,
  Database,
  Layers3,
  Palette,
  Server,
  SquareCode,
  TestTube2,
  Wrench,
} from "lucide-react";
import { useState, type ComponentType } from "react";
import { BrandIcons } from "@/components/ui/BrandIcons";

type SkillLevel = "Expert" | "Advanced";

interface SkillCardData {
  name: string;
  description: string;
  level: SkillLevel;
  accent: string;
  iconBg: string;
  iconColor: string;
  Icon: ComponentType<{ className?: string }>;
}

const skills: SkillCardData[] = [
  {
    name: "React & Next.js",
    description:
      "Large-scale enterprise SaaS architecture, App Router, SSR, performance optimization, and internationalized booking systems.",
    level: "Expert",
    accent:
      "linear-gradient(90deg, rgba(93,228,199,0.95) 0%, rgba(167,139,250,0.95) 50%, rgba(248,113,113,0.9) 100%)",
    iconBg: "bg-fuchsia-500/90",
    iconColor: "text-white",
    Icon: Atom,
  },
  {
    name: "TypeScript & JavaScript",
    description:
      "Strong type-safe architectures, modern ES features, asynchronous patterns, closures, and maintainable enterprise codebases.",
    level: "Expert",
    accent:
      "linear-gradient(90deg, rgba(96,165,250,0.95) 0%, rgba(93,228,199,0.9) 100%)",
    iconBg: "bg-sky-500",
    iconColor: "text-white",
    Icon: Layers3,
  },
  {
    name: "Redux & State Architecture",
    description:
      "Redux Toolkit, React Query, React Context, and React Final Form for complex multi-step workflows and booking flows.",
    level: "Expert",
    accent:
      "linear-gradient(90deg, rgba(242,193,78,1) 0%, rgba(248,113,113,0.95) 50%, rgba(93,228,199,0.95) 100%)",
    iconBg: "bg-yellow-300",
    iconColor: "text-zinc-950",
    Icon: Boxes,
  },
  {
    name: "Tailwind CSS & Design Systems",
    description:
      "Crafting reusable component libraries, Material UI, Bootstrap, Sass, responsive layout composing, and accessibility.",
    level: "Advanced",
    accent:
      "linear-gradient(90deg, rgba(56,189,248,0.95) 0%, rgba(93,228,199,0.85) 100%)",
    iconBg: "bg-cyan-400",
    iconColor: "text-zinc-950",
    Icon: Palette,
  },
  {
    name: "Cloud & Migration (AWS)",
    description:
      "AWS cloud migrations, transitioning from on-premise infrastructure to scalable cloud deployments, and APIGEE integration.",
    level: "Advanced",
    accent:
      "linear-gradient(90deg, rgba(232,197,71,0.95) 0%, rgba(255,255,255,0.7) 100%)",
    iconBg: "bg-zinc-100",
    iconColor: "text-zinc-950",
    Icon: Server,
  },
  {
    name: "Testing & API Automation",
    description:
      "Postman automated test suites, Mocha, Chai, internal API benchmarking, and CI/CD quality assurance.",
    level: "Advanced",
    accent:
      "linear-gradient(90deg, rgba(248,113,113,0.95) 0%, rgba(232,197,71,0.9) 50%, rgba(93,228,199,0.85) 100%)",
    iconBg: "bg-rose-500",
    iconColor: "text-white",
    Icon: TestTube2,
  },
];

interface CategoryItem {
  name: string;
  brandIcon?: ComponentType<{ className?: string }>;
  accentColor?: string;
}

interface SkillCategory {
  title: string;
  icon: ComponentType<{ className?: string }>;
  items: CategoryItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: SquareCode,
    items: [
      { name: "JavaScript (ES6+)", brandIcon: BrandIcons.JavaScript, accentColor: "#F7DF1E" },
      { name: "TypeScript", brandIcon: BrandIcons.TypeScript, accentColor: "#3178C6" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "SQL" },
      { name: "XML" },
      { name: "Bash" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: Atom,
    items: [
      { name: "ReactJS", brandIcon: BrandIcons.React, accentColor: "#61DAFB" },
      { name: "NextJS", brandIcon: BrandIcons.Nextjs, accentColor: "#FFFFFF" },
      { name: "Redux Toolkit", brandIcon: BrandIcons.Redux, accentColor: "#764ABC" },
      { name: "React Query" },
      { name: "React Final Form" },
      { name: "Tailwind CSS", brandIcon: BrandIcons.TailwindCSS, accentColor: "#38BDF8" },
      { name: "Material UI" },
      { name: "Bootstrap" },
      { name: "Sass", brandIcon: BrandIcons.Sass, accentColor: "#CC6699" },
      { name: "ChartJS" },
      { name: "Mocha", brandIcon: BrandIcons.Mocha, accentColor: "#8D6748" },
      { name: "Chai" },
    ],
  },
  {
    title: "Cloud, Databases & APIs",
    icon: Database,
    items: [
      { name: "AWS", brandIcon: BrandIcons.AWS, accentColor: "#FF9900" },
      { name: "APIGEE" },
      { name: "Firebase" },
      { name: "SQL" },
      { name: "MongoDB", brandIcon: BrandIcons.MongoDB, accentColor: "#47A248" },
      { name: "REST APIs" },
      { name: "Postman", brandIcon: BrandIcons.Postman, accentColor: "#FF6C37" },
    ],
  },
  {
    title: "Tools & Agile Platforms",
    icon: Wrench,
    items: [
      { name: "Git", brandIcon: BrandIcons.Git, accentColor: "#F05032" },
      { name: "GitHub", brandIcon: BrandIcons.GitHub, accentColor: "#FFFFFF" },
      { name: "BitBucket" },
      { name: "Jira", brandIcon: BrandIcons.Jira, accentColor: "#0052CC" },
      { name: "Confluence" },
      { name: "Bamboo" },
      { name: "Webpack" },
      { name: "VS Code" },
    ],
  },
];

function SkillsCard({
  skill,
  delay,
}: {
  skill: SkillCardData;
  delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className="group relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))] p-6 sm:p-8"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 0.55, ease: [0.19, 1, 0.22, 1], delay }
      }
      viewport={{ once: true, amount: 0.2 }}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,197,71,0.08),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(93,228,199,0.08),transparent_35%)]" />
      </div>

      <motion.div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          backgroundImage: skill.accent,
          transformOrigin: isHovered ? "left center" : "right center",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
        }
      />

      <div className="relative flex h-full flex-col">
        <div
          className={[
            "flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.25)]",
            skill.iconBg,
          ].join(" ")}
        >
          <skill.Icon className={["h-7 w-7", skill.iconColor].join(" ")} />
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold tracking-tight text-zinc-50">
            {skill.name}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-400 sm:text-base">
            {skill.description}
          </p>
        </div>

        <div className="mt-6 pt-2">
          <span className="ln-mono inline-flex rounded-full border border-[rgba(232,197,71,0.12)] bg-[rgba(232,197,71,0.12)] px-4 py-1.5 text-[11px] uppercase tracking-[0.24em] text-[var(--ln-accent-gold)]">
            {skill.level}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function SkillsShowcase() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-16">
      <div className="flex flex-col items-start gap-5 text-left md:items-center md:text-center">
        <span className="ln-mono inline-flex rounded-full border border-[rgba(232,197,71,0.18)] bg-[rgba(232,197,71,0.08)] px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[var(--ln-accent-gold)]">
          Technical Stack
        </span>
        <div className="space-y-4">
          <h2
            id="skills-heading"
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl"
          >
            Technologies I Master
          </h2>
          <p className="max-w-2xl text-base leading-8 text-zinc-400">
            A production-proven toolkit shaped around building scalable SaaS
            platforms, high-converting booking engines, and robust cloud workflows.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((skill, index) => (
          <SkillsCard
            key={skill.name}
            skill={skill}
            delay={index * 0.05}
          />
        ))}
      </div>

      {/* Categorized Skills Grid */}
      <div className="space-y-8 pt-4">
        <div className="text-center">
          <h3 className="text-2xl font-semibold tracking-tight text-zinc-200">
            Tools, Libraries & Cloud Ecosystem
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            Interactive breakdown of languages, frameworks, databases, and DevOps tools.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category) => {
            const CatIcon = category.icon;
            return (
              <div
                key={category.title}
                className="rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5 shadow-[0_12px_35px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-center gap-2.5 border-b border-white/6 pb-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgba(232,197,71,0.1)] text-[var(--ln-accent-gold)]">
                    <CatIcon className="h-4 w-4" />
                  </div>
                  <h4 className="text-sm font-semibold tracking-tight text-zinc-100">
                    {category.title}
                  </h4>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {category.items.map((item) => {
                    const BrandIcon = item.brandIcon;

                    return (
                      <span
                        key={item.name}
                        className="group/chip relative inline-flex items-center gap-1.5 rounded-full border border-white/6 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 transition-all duration-200 hover:border-white/20 hover:text-zinc-50"
                      >
                        {BrandIcon && (
                          <BrandIcon className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/chip:scale-110" />
                        )}
                        <span>{item.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
