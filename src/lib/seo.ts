import type { Metadata } from "next";

/** Production origin. */
export const SITE_URL = "https://shubhamsaurabh.vercel.app";

const DEFAULT_OG = {
  url: "/og/default.png",
  width: 1200,
  height: 630,
  alt: "Shubham Saurabh — Frontend Engineer",
} as const;

export const routeMeta = {
  home: {
    title: "Shubham Saurabh – Frontend Engineer",
    description:
      "Frontend engineer, SDE-I @ RateGain. 5+ years on React, Next.js, and TypeScript. Hotel booking engines, B2B content platforms, and AI tooling.",
    path: "/",
  },
  projects: {
    title: "Projects",
    description:
      "Work and personal builds: Uno Booking Engine, Content AI, Cryptopedia, Codelens, Personal Portfolio, plus PrimeReact open-source.",
    path: "/projects",
  },
  experience: {
    title: "Experience",
    description:
      "RateGain SDE-I and Infosys SSE. 60% faster UIs, 10+ gateways, 10x deploy cycle.",
    path: "/experience",
  },
  about: {
    title: "About",
    description:
      "Frontend engineer based in Noida, India. Component architecture, design systems, open source.",
    path: "/about",
  },
  contact: {
    title: "Contact",
    description: "Getform message form, socials, resume.",
    path: "/contact",
  },
  notFound: {
    title: "Page not found",
    description: "This page isn’t in the portfolio.",
    path: "/404",
  },
} as const;

export const caseStudyMeta: Record<
  string,
  { title: string; description: string }
> = {
  "uno-booking": {
    title: "Uno Booking Engine",
    description:
      "Multi-tenant hotel IBE with 10+ payment gateways and 20+ locales.",
  },
  "content-ai": {
    title: "Content AI",
    description: "B2B content platform; UI rendering ~60% faster.",
  },
  cryptopedia: {
    title: "Cryptopedia",
    description: "Real-time crypto tracker with ChartJS trends.",
  },
  codelens: {
    title: "Codelens",
    description: "AI GitHub repo explorer (Gemini, Supabase).",
  },
  "portfolio-v3": {
    title: "Personal Portfolio",
    description: "Interactive personal portfolio with orbital hero, theme switcher, and command palette.",
  },
  dealopoly: {
    title: "Dealopoly Arcade",
    description: "Real-time multiplayer card gaming arcade with Fastify WebSockets and heuristic AI bots.",
  },
};

export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Shubham Saurabh",
      type: "website",
      images: [DEFAULT_OG],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG.url],
    },
  };
}
