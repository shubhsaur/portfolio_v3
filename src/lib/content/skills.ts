export type SkillLevel = "Expert" | "Advanced";

export interface SkillCardData {
  name: string;
  description: string;
  level: SkillLevel;
  accent: string;
  iconBg: string;
  iconColor: string;
  Icon: React.ComponentType<{ className?: string }>;
}

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

export const skills: SkillCardData[] = [
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
] as const;

export interface CategoryItem {
  name: string;
  brandIcon?: React.ComponentType<{ className?: string }>;
  accentColor?: string;
}

export interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: CategoryItem[];
}

import { BrandIcons } from "@/components/ui/BrandIcons";

export const skillCategories: SkillCategory[] = [
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
] as const;