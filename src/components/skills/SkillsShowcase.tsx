"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Atom,
  Figma,
  Layers3,
  MoveRight,
  Palette,
  SquareCode,
} from "lucide-react";
import { useState, type ComponentType } from "react";

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
    name: "JavaScript",
    description:
      "Deep experience with modern ES features, async flows, closures, and performance-minded UI logic.",
    level: "Expert",
    accent:
      "linear-gradient(90deg, rgba(242,193,78,1) 0%, rgba(248,113,113,0.95) 50%, rgba(93,228,199,0.95) 100%)",
    iconBg: "bg-yellow-300",
    iconColor: "text-zinc-950",
    Icon: SquareCode,
  },
  {
    name: "React",
    description:
      "Component architecture, hooks, state modeling, and building interaction-rich product experiences.",
    level: "Expert",
    accent:
      "linear-gradient(90deg, rgba(93,228,199,0.95) 0%, rgba(167,139,250,0.95) 50%, rgba(248,113,113,0.9) 100%)",
    iconBg: "bg-fuchsia-500/90",
    iconColor: "text-white",
    Icon: Atom,
  },
  {
    name: "TypeScript",
    description:
      "Type-safe frontend systems, reusable APIs, better DX, and maintainable code at scale.",
    level: "Expert",
    accent:
      "linear-gradient(90deg, rgba(96,165,250,0.95) 0%, rgba(93,228,199,0.9) 100%)",
    iconBg: "bg-sky-500",
    iconColor: "text-white",
    Icon: Layers3,
  },
  {
    name: "Next.js",
    description:
      "App Router, SSR, routing, metadata, and production-ready frontend delivery with strong UX.",
    level: "Advanced",
    accent:
      "linear-gradient(90deg, rgba(232,197,71,0.95) 0%, rgba(255,255,255,0.7) 100%)",
    iconBg: "bg-zinc-100",
    iconColor: "text-zinc-950",
    Icon: MoveRight,
  },
  {
    name: "Tailwind CSS",
    description:
      "Design systems, responsive composition, theming, and fast iteration without losing polish.",
    level: "Advanced",
    accent:
      "linear-gradient(90deg, rgba(56,189,248,0.95) 0%, rgba(93,228,199,0.85) 100%)",
    iconBg: "bg-cyan-400",
    iconColor: "text-zinc-950",
    Icon: Palette,
  },
  {
    name: "Figma to Frontend",
    description:
      "Translating visual systems into accessible, motion-aware interfaces with careful implementation.",
    level: "Advanced",
    accent:
      "linear-gradient(90deg, rgba(248,113,113,0.95) 0%, rgba(232,197,71,0.9) 50%, rgba(93,228,199,0.85) 100%)",
    iconBg: "bg-rose-500",
    iconColor: "text-white",
    Icon: Figma,
  },
];

const toolChips = [
  "HTML5",
  "CSS3",
  "Sass",
  "Git",
  "VS Code",
  "MySQL",
  "PHP",
  "iOS",
  "REST APIs",
  "Webpack",
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

        <div className="mt-10">
          <h3 className="text-2xl font-semibold tracking-tight text-zinc-50">
            {skill.name}
          </h3>
          <p className="mt-4 max-w-sm text-base leading-8 text-zinc-400">
            {skill.description}
          </p>
        </div>

        <div className="mt-8 pt-2">
          <span className="ln-mono inline-flex rounded-full border border-[rgba(232,197,71,0.12)] bg-[rgba(232,197,71,0.12)] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[var(--ln-accent-gold)]">
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
          Expertise
        </span>
        <div className="space-y-4">
          <h2
            id="skills-heading"
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl"
          >
            Technologies I Master
          </h2>
          <p className="max-w-2xl text-base leading-8 text-zinc-400">
            A frontend-focused toolkit shaped around building polished products,
            scalable interfaces, and motion-rich experiences that stay fast.
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

      <div className="space-y-8 pt-2">
        <div className="text-center">
          <h3 className="text-2xl font-semibold tracking-tight text-zinc-200">
            Tools & Technologies
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {toolChips.map((tool, index) => (
            <div
              key={tool}
              className="flex items-center gap-3"
            >
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="hidden text-lg leading-none text-zinc-500 sm:inline"
                >
                  •
                </span>
              ) : null}
              <motion.button
                type="button"
                className="group relative overflow-hidden rounded-full border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] px-6 py-3 text-base text-zinc-400 transition-colors hover:border-[rgba(232,197,71,0.35)] hover:text-[var(--ln-accent-gold)]"
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
              >
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-xl"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(232,197,71,0.32) 0%, rgba(232,197,71,0.18) 38%, rgba(232,197,71,0.08) 58%, transparent 76%)",
                  }}
                  initial={false}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 1, scale: 1.08 }
                  }
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
                <span className="relative z-10">{tool}</span>
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
