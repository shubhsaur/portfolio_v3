export type ProjectGroup = "work" | "personal";

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  group: ProjectGroup;
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
    badge: "Flagship",
    description:
      "High-performance, scalable hotel booking engine (IBE) engineered for multiple international hotel brands. Features end-to-end room selection, dynamic pricing, promotions, 10+ payment gateway integrations, multilingual booking across 20+ locales with currency-aware pricing and RTL support.",
    tech: ["Next.js", "React 19", "TypeScript", "Redux Toolkit", "React Query", "Tailwind CSS"],
    liveUrl: "https://uno.rategain.com/hotel-booking-engine/",
    stats: [
      { label: "Gateways", value: "10+ Integrated" },
      { label: "Locales", value: "20+ Multi-language" },
      { label: "Pricing", value: "Tax-Aware & Currency" },
    ],
    caseStudy: {
      lede:
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
    slug: "content-ai",
    title: "Content AI",
    group: "work",
    badge: "B2B SaaS",
    description:
      "Robust B2B Content Management Platform designed to enhance content creation, curation, and distribution across demand partners. Architected frontend state and form validation workflows, boosting optimal rendering performance by 60%.",
    tech: ["React", "React Context", "Redux", "Sass", "React Final Form"],
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
    id: "cryptopedia",
    slug: "cryptopedia",
    title: "Cryptopedia",
    group: "personal",
    badge: "Real-time Tracker",
    description:
      "Cryptocurrency price tracker application delivering real-time prices, market capitalization benchmarks, 24-hour volume changes, and interactive price trend visual charts using ChartJS.",
    tech: ["React", "React Context API", "Material UI", "ChartJS", "REST API"],
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
  {
    id: "codelens",
    slug: "codelens",
    title: "Codelens",
    group: "personal",
    badge: "AI Powered",
    description:
      "AI-powered codebase explorer that indexes GitHub repos, builds searchable context, and answers repo questions with grounded citations, file previews, and syntax-highlighted code.",
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Google Gemini"],
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
];
