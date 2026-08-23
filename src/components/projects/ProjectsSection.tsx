"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Hotel,
  Bot,
  Coins,
  Sparkles,
  ArrowUpRight,
  Github,
  ChevronDown,
  Layers,
  Cpu,
  Globe2,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProjectCategory = "All" | "Enterprise SaaS" | "AI & Tooling" | "Fintech & Data";

interface ProjectItem {
  id: string;
  title: string;
  category: "Enterprise SaaS" | "AI & Tooling" | "Fintech & Data";
  badge: string;
  description: string;
  tech: string[];
  icon: React.ComponentType<{ className?: string }>;
  spotlightColor: string;
  surfaceGlowColor: string;
  stats: { label: string; value: string }[];
  deepDive: {
    overview: string;
    highlights: string[];
    architecture: string[];
  };
  liveUrl?: string;
  githubUrl?: string;
}

const projects: ProjectItem[] = [
  {
    id: "uno-booking",
    title: "Uno Booking Engine",
    category: "Enterprise SaaS",
    badge: "Flagship",
    description:
      "High-performance, scalable hotel booking engine (IBE) engineered for multiple international hotel brands. Features end-to-end room selection, dynamic pricing, promotions, 10+ payment gateway integrations, multilingual booking across 20+ locales with currency-aware pricing and RTL support.",
    tech: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Redux Toolkit",
      "React Query",
      "Tailwind CSS",
    ],
    icon: Hotel,
    spotlightColor: "rgba(232, 197, 71, 0.45)",
    surfaceGlowColor: "rgba(232, 197, 71, 0.07)",
    liveUrl: "https://uno.rategain.com/hotel-booking-engine/",
    stats: [
      { label: "Gateways", value: "10+ Integrated" },
      { label: "Locales", value: "20+ Multi-language" },
      { label: "Pricing", value: "Tax-Aware & Currency" },
    ],
    deepDive: {
      overview:
        "Architected to support multi-tenant hospitality clients with high concurrency, instant price quote calculations, and seamless localized checkouts.",
      highlights: [
        "Integrated 10+ payment gateways with fallback routing, retry strategies, and strict security compliance.",
        "Built itinerary persistence and resume-booking state to minimize checkout abandonment across user sessions.",
        "Implemented currency-aware tax calculations, coupon promotion engines, and dynamic room inventory filters.",
      ],
      architecture: [
        "Multi-Locale Internationalization with automated Right-to-Left (RTL) layout switching.",
        "Redux Toolkit & React Query hybrid state for optimistic UI updates and instant cached room queries.",
        "Component-driven design system engineered for high reusability across client brand skins.",
      ],
    },
  },
  {
    id: "content-ai",
    title: "Content AI",
    category: "Enterprise SaaS",
    badge: "B2B SaaS",
    description:
      "Robust B2B Content Management Platform designed to enhance content creation, curation, and distribution across demand partners. Architected frontend state and form validation workflows, boosting optimal rendering performance by 60%.",
    tech: [
      "React",
      "React Context",
      "Redux",
      "Sass",
      "React Final Form",
    ],
    icon: Bot,
    spotlightColor: "rgba(93, 228, 199, 0.45)",
    surfaceGlowColor: "rgba(93, 228, 199, 0.07)",
    liveUrl: "https://rategain.com/hotel-content-management-system/",
    stats: [
      { label: "Performance", value: "+60% Boost" },
      { label: "Architecture", value: "React Final Form" },
      { label: "Domain", value: "B2B Distribution" },
    ],
    deepDive: {
      overview:
        "Designed to streamline large-scale content ingestion and partner syndication with complex multi-field validations and instant preview rendering.",
      highlights: [
        "Engineered reusable overlay components in React to reduce operational overhead and improve client efficiency.",
        "Leveraged React Final Form for subscription-based form re-rendering, eliminating input lag across 50+ form fields.",
        "Automated API testing pipelines with Mocha and Postman to ensure high reliability across publishing endpoints.",
      ],
      architecture: [
        "Modular form schema architecture decoupling presentation from field validation logic.",
        "Deep performance tuning cutting unnecessary DOM repaints and speeding up document rendering by 60%.",
      ],
    },
  },
  {
    id: "cryptopedia",
    title: "Cryptopedia",
    category: "Fintech & Data",
    badge: "Real-time Tracker",
    description:
      "Cryptocurrency price tracker application delivering real-time prices, market capitalization benchmarks, 24-hour volume changes, and interactive price trend visual charts using ChartJS.",
    tech: ["React", "React Context API", "Material UI", "ChartJS", "REST API"],
    icon: Coins,
    spotlightColor: "rgba(96, 165, 250, 0.45)",
    surfaceGlowColor: "rgba(96, 165, 250, 0.07)",
    stats: [
      { label: "Data", value: "Real-time API" },
      { label: "Charts", value: "Interactive Trends" },
      { label: "UI", value: "Material UI" },
    ],
    deepDive: {
      overview:
        "A responsive financial data explorer providing live candlestick and line graphs with multi-currency comparisons.",
      highlights: [
        "Live price feed polling with automatic timestamp alignment and volatility indicators.",
        "Interactive ChartJS canvas charts with custom tooltips, crosshairs, and time range toggles (24h, 7d, 30d, 1y).",
        "Responsive financial summary cards with market cap ranks, 24-hour highs/lows, and circulating supply metrics.",
      ],
      architecture: [
        "React Context API state management for seamless currency switching (USD, EUR, INR).",
        "Material UI component customization with dark-mode financial contrast guidelines.",
      ],
    },
  },
  {
    id: "codelens",
    title: "Codelens",
    category: "AI & Tooling",
    badge: "AI Powered",
    description:
      "AI-powered codebase explorer that indexes GitHub repos, builds searchable context, and answers repo questions with grounded citations, file previews, and syntax-highlighted code.",
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Google Gemini"],
    icon: Sparkles,
    spotlightColor: "rgba(167, 139, 250, 0.45)",
    surfaceGlowColor: "rgba(167, 139, 250, 0.07)",
    liveUrl: "https://shubhsaur-codelens.vercel.app",
    githubUrl: "https://github.com/shubhsaur/codelens",
    stats: [
      { label: "AI Engine", value: "Google Gemini" },
      { label: "Database", value: "Supabase Vector" },
      { label: "Context", value: "Repo Indexer" },
    ],
    deepDive: {
      overview:
        "Transforms complex GitHub repositories into interactive conversational workspaces with file-level citation grounding.",
      highlights: [
        "Generates semantic embeddings for code repositories to enable intelligent context retrieval.",
        "Answers technical codebase queries with exact file links, line references, and syntax-highlighted snippets.",
        "Integrated Supabase database for project state caching and fast vector similarity lookups.",
      ],
      architecture: [
        "Next.js App Router streaming architecture for instant progressive token responses.",
        "Google Gemini API integration paired with custom AST code chunking pipelines.",
      ],
    },
  },
];

const categories: ProjectCategory[] = [
  "All",
  "Enterprise SaaS",
  "AI & Tooling",
  "Fintech & Data",
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const prefersReducedMotion = useReducedMotion();

  const toggleDeepDive = (id: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    return project.category === activeCategory;
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col items-start gap-5 text-left md:items-center md:text-center">
        <span className="ln-mono inline-flex rounded-full border border-[rgba(232,197,71,0.18)] bg-[rgba(232,197,71,0.08)] px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[var(--ln-accent-gold)]">
          Projects
        </span>
        <div className="space-y-4">
          <h2
            id="projects-heading"
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl"
          >
            Featured Builds & Platforms
          </h2>
          <p className="max-w-2xl text-base leading-8 text-zinc-400">
            Enterprise hotel booking engines, B2B content syndication suites,
            fintech price trackers, and AI developer utilities.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center scrollbar-none px-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={[
                "group relative shrink-0 rounded-full px-4 sm:px-5 py-2 text-xs font-medium transition-all duration-200 focus-visible:ln-ring-focus",
                isActive
                  ? "bg-zinc-100 text-zinc-950 shadow-md"
                  : "border border-white/8 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200",
              ].join(" ")}
            >
              <span className="relative z-10">{cat}</span>
              {isActive && (
                <motion.span
                  layoutId="active-project-pill"
                  className="absolute inset-0 rounded-full bg-zinc-100"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Projects List */}
      <motion.div layout className="grid gap-6 sm:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const ProjectIcon = project.icon;
            const isExpanded = !!expandedProjects[project.id];

            return (
              <motion.div
                key={project.id}
                layout
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Card
                  spotlightColor={project.spotlightColor}
                  surfaceGlowColor={project.surfaceGlowColor}
                  className="overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4 sm:p-6 md:p-8 transition-all duration-300 hover:border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                >
                  <div className="space-y-6">
                    {/* Header Row */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(232,197,71,0.1)] text-[var(--ln-accent-gold)] shadow-sm">
                          <ProjectIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="ln-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                            {project.category}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-50">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <span className="ln-mono self-start rounded-full border border-[rgba(232,197,71,0.25)] bg-[rgba(232,197,71,0.08)] px-3.5 py-1 text-[11px] font-medium text-[var(--ln-accent-gold)]">
                        {project.badge}
                      </span>
                    </div>

                    {/* Summary Description */}
                    <p className="text-base leading-8 text-zinc-300">
                      {project.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {project.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-2xl border border-white/6 bg-black/30 p-3"
                        >
                          <p className="ln-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                            {stat.label}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-zinc-100">
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/6">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/6 bg-white/[0.03] px-3.5 py-1 text-xs text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleDeepDive(project.id)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-300 transition hover:border-[rgba(232,197,71,0.3)] hover:text-zinc-100"
                        >
                          <span>{isExpanded ? "Hide Details" : "Engineering Deep Dive"}</span>
                          <ChevronDown
                            className={[
                              "h-3.5 w-3.5 transition-transform duration-200",
                              isExpanded ? "rotate-180" : "",
                            ].join(" ")}
                          />
                        </button>

                        {project.liveUrl && (
                          <Button
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs"
                          >
                            Live App
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            variant="outline"
                            className="text-xs"
                          >
                            Repo
                            <Github className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Expandable Engineering Deep Dive Drawer */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden border-t border-white/8 pt-5"
                        >
                          <div className="rounded-2xl border border-white/6 bg-black/40 p-5 space-y-4">
                            <div>
                              <p className="ln-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ln-accent-gold)]">
                                System Overview
                              </p>
                              <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                                {project.deepDive.overview}
                              </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 pt-2">
                              <div className="space-y-2">
                                <p className="ln-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                                  Key Engineering Feats
                                </p>
                                <ul className="space-y-2 text-xs leading-relaxed text-zinc-300">
                                  {project.deepDive.highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ln-accent-cyan)]" />
                                      <span>{h}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="space-y-2">
                                <p className="ln-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                                  Architecture Decisions
                                </p>
                                <ul className="space-y-2 text-xs leading-relaxed text-zinc-300">
                                  {project.deepDive.architecture.map((a, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <Layers className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ln-accent-gold)]" />
                                      <span>{a}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
