export type ProjectGroup = "work" | "personal";

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  group: ProjectGroup;
  categories: string[];
  badge: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featuredOnHome?: boolean;
  thumbnail?: string;
  stats: { label: string; value: string }[];
  caseStudy: {
    lede: string;
    architecture: string[];
    highlights: string[];
    outcome?: string;
  };
}

export const projects: ProjectRecord[] = [
  {
    id: "uno-booking",
    slug: "uno-booking",
    title: "Uno Booking Engine",
    group: "work",
    categories: ["Hospitality SaaS", "E-Commerce", "Web"],
    badge: "Flagship",
    description:
      "The direct-booking engine used by hotel chains so guests can reserve rooms right on their official websites. I primarily owned the checkout experience, multi-platform ad and conversion tracking, 23-language internationalization, and parts of the room-selection flow.",
    tech: ["Next.js", "React 19", "TypeScript", "Redux Toolkit", "React Query", "Tailwind CSS", "Formik & Yup", "Stripe / PayPal"],
    thumbnail: "/projects/uno-booking-engine.png",
    liveUrl: "https://uno.rategain.com/hotel-booking-engine/",
    stats: [
      { label: "Languages", value: "23 Locales" },
      { label: "Ad Tracking", value: "Full Funnel" },
      { label: "Checkout", value: "Dual Option" },
    ],
    caseStudy: {
      lede:
        "When travelers book a stay directly through a hotel's own website instead of third-party platforms like Expedia or Booking.com, this is the engine running behind the scenes. My day-to-day work centered on four main areas: building and maintaining the checkout page, wiring up ad attribution so hotel marketing teams can see which ad campaigns actually convert into booked stays, making every step work cleanly across 23 languages, and refining parts of the room-selection UI alongside regular production bug fixes.",
      highlights: [
        "Reliable Booking Attribution: Placed conversion tags on the confirmation page with idempotent order checks, ensuring ads only record a conversion when a reservation is actually confirmed—preventing duplicate counts when guests refresh or bookmark their booking voucher.",
        "Resilient Form Validation: Hardened guest contact and payment forms with clear, inline validation so users never lose entered details or run into confusing errors right before confirming.",
        "Flawless Arabic Layouts: Configured bidirectional CSS rules so typography, card alignments, icon directions, and payment summaries flip naturally when switching to Arabic, without layout shifts or text overlaps.",
        "Production Hardening: Actively resolved real-world booking bugs across global hotel deployments—including edge cases with midnight check-in date calculations across different timezones and currency rounding differences.",
      ],
      architecture: [
        "Tenant-Safe Tag & Conversion Tracking: Built an isolated tracking layer that fires events across the entire guest journey (hotel search, room listing, checkout, confirmation). Each hotel brand's tracking IDs and custom events are strictly partitioned so one property's tag configuration never leaks into another.",
        "Checkout Flow (Pay Now & Pay at Hotel): Engineered the checkout review and payment stage using Formik, Yup, and Redux Toolkit. Captures guest details, room add-ons, and special requests, supporting instant card/wallet payments (Stripe, PayPal, Razorpay) as well as pay-on-arrival reservations.",
        "23 Languages with Native RTL Support: Localized the full booking flow across 23 languages—including Arabic (with right-to-left layout mirroring), Chinese, French, German, and Spanish. Paired with date-fns and timezone helpers for localized dates, cancellation policies, and currencies.",
        "Room & Rate Selection UI: Worked on room cards and package rate selectors, using React Query to cache availability queries and prevent redundant server round-trips while guests compare different room types and meal plans.",
      ],
    },
  },
  {
    id: "content-ai",
    slug: "content-ai",
    title: "Content AI",
    group: "work",
    categories: ["SaaS", "Admin Panel", "Web"],
    badge: "B2B SaaS",
    description:
      "Robust B2B Content Management Platform designed to enhance content creation, curation, and distribution across demand partners. Architected frontend state and form validation workflows, boosting optimal rendering performance by 60%.",
    tech: ["React", "React Context", "Redux", "Sass", "React Final Form"],
    thumbnail: "/projects/content-ai.png",
    liveUrl: "https://rategain.com/hotel-content-management-system/",
    stats: [
      { label: "Performance", value: "+60% Boost" },
      { label: "Architecture", value: "React Final Form" },
      { label: "Domain", value: "B2B Distribution" },
    ],
    caseStudy: {
      lede:
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
    id: "dealopoly",
    slug: "dealopoly",
    title: "Dealopoly Arcade",
    group: "personal",
    categories: ["Web", "AI"],
    badge: "Real-Time Multiplayer",
    description:
      "Modern web-based card platform built for speed, strategy, and competitive fun. Play real-time multiplayer card games (Monodeal and Least Count) with friends via private room codes or challenge heuristic AI bots across multiple difficulty tiers.",
    tech: ["Next.js 16", "React 19", "Fastify", "WebSockets", "Redis", "Drizzle ORM"],
    thumbnail: "/projects/dealopoly.png",
    liveUrl: "https://dealopoly.vercel.app",
    githubUrl: "https://github.com/shubhsaur/dealopoly",
    stats: [
      { label: "Latency", value: "Sub-100ms Sync" },
      { label: "Engine", value: "Deterministic State" },
      { label: "AI Bots", value: "3 Difficulty Tiers" },
    ],
    caseStudy: {
      lede:
        "A modern web-based card platform designed for high-concurrency multiplayer battles, zero-lag move replication, and tactical play against deterministic heuristic AI bots.",
      highlights: [
        "Fastify WebSocket server with server-authoritative state validation, disconnect recovery timers, and optimistic client dispatch.",
        "Custom deterministic game engines for Monodeal (property trading) and Least Count (bluff & hand deduction).",
        "Three-tiered heuristic bot engine (Easy, Medium, Hard) featuring card counting, risk-calculated declarations, and strategic reaction plays.",
        "Redis Pub/Sub architecture enabling distributed room state syncing and horizontal game server scaling.",
      ],
      architecture: [
        "Turborepo monorepo with Next.js 16 App Router frontend and modular TypeScript packages (@dealopoly/game-engine, @dealopoly/db, @dealopoly/redis).",
        "PostgreSQL with Drizzle ORM for match history, player profiles, and persistent leaderboard stats.",
        "Framer Motion and custom CSS 3D transforms for physical card flipping, dealing animations, and haptic feedback.",
      ],
    },
  },
  {
    id: "portfolio-v3",
    slug: "portfolio-v3",
    title: "Personal Portfolio",
    group: "personal",
    categories: ["Web"],
    badge: "Personal Portfolio",
    description:
      "Modern, high-performance developer portfolio engineered with Next.js 16, React 19, and Tailwind CSS v4. Features an interactive orbital canvas hero, dynamic theme color switcher, fluid Framer Motion reveals, command palette (Cmd+K), and responsive layouts.",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
    thumbnail: "/projects/portfolio.png",
    liveUrl: "https://shubhamsaurabh.vercel.app",
    githubUrl: "https://github.com/shubhsaur/portfolio_v3",
    stats: [
      { label: "Stack", value: "Next.js 16 & React 19" },
      { label: "Styling", value: "Tailwind CSS v4" },
      { label: "Motion", value: "Framer Motion & Canvas" },
    ],
    caseStudy: {
      lede:
        "An expressive, motion-driven personal portfolio engineered to showcase production-grade frontend engineering, accessible UI architecture, and fluid interactive experiences.",
      highlights: [
        "Interactive orbital hero visualization built with HTML5 Canvas and dynamic Framer Motion orbits that scale seamlessly across device viewports.",
        "Dynamic theme accent switcher powered by OKLCH CSS variables and persistent state across sessions.",
        "Full-featured Command Menu (Cmd+K) supporting quick route navigation, theme switching, resume download, and keyboard shortcuts.",
        "Responsive project case study architecture with smooth layout transitions and directional scroll reveals.",
      ],
      architecture: [
        "Next.js 16 App Router foundation leveraging React 19 features and strict TypeScript type-safety.",
        "Tailwind CSS v4 styling architecture with custom theme design tokens and micro-interactions.",
        "Directional scroll reveal system built on Framer Motion with reduced-motion accessibility accommodations.",
      ],
    },
  },
  {
    id: "codelens",
    slug: "codelens",
    title: "Codelens",
    group: "personal",
    categories: ["AI", "Web"],
    badge: "AI Powered",
    description:
      "AI-powered codebase explorer that indexes GitHub repos, builds searchable context, and answers repo questions with grounded citations, file previews, and syntax-highlighted code.",
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Google Gemini"],
    thumbnail: "/projects/codelens.png",
    liveUrl: "https://shubhsaur-codelens.vercel.app",
    githubUrl: "https://github.com/shubhsaur/codelens",
    stats: [
      { label: "AI Engine", value: "Google Gemini" },
      { label: "Database", value: "Supabase Vector" },
      { label: "Context", value: "Repo Indexer" },
    ],
    caseStudy: {
      lede:
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
  {
    id: "cryptopedia",
    slug: "cryptopedia",
    title: "Cryptopedia",
    group: "personal",
    categories: ["Web"],
    badge: "Real-time Tracker",
    description:
      "Cryptocurrency price tracker application delivering real-time prices, market capitalization benchmarks, 24-hour volume changes, and interactive price trend visual charts using ChartJS.",
    tech: ["React", "React Context API", "Material UI", "ChartJS", "REST API"],
    thumbnail: "/projects/cryptopedia.png",
    liveUrl: "https://cryptopedia-app.vercel.app",
    githubUrl: "https://github.com/shubhsaur/cryptopedia",
    stats: [
      { label: "Data", value: "Real-time API" },
      { label: "Charts", value: "Interactive Trends" },
      { label: "UI", value: "Material UI" },
    ],
    caseStudy: {
      lede:
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
];
