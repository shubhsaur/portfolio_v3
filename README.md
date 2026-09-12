# Shubham Saurabh — Frontend Engineer Portfolio (v3)

<div align="center">

[![Live Portfolio](https://img.shields.io/badge/Live%20Demo-shubhamsaurabh.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://shubhamsaurabh.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

**A high-performance, motion-driven personal portfolio engineered to showcase enterprise frontend platforms, accessible component design systems, and real-time interactive web applications.**

[Explore Live Site](https://shubhamsaurabh.vercel.app) · [View Projects](https://shubhamsaurabh.vercel.app/projects) · [Case Studies](https://shubhamsaurabh.vercel.app/projects/uno-booking) · [Contact](https://shubhamsaurabh.vercel.app/contact)

</div>

---

## 🌟 Key Features & Highlights

- **🪐 Interactive Frontend Universe**:
  Dynamic HTML5 Canvas hero with physics-inspired orbiting skills nodes, responsive orbit-radius recalculation, and adaptive scaling across mobile and desktop viewports.
- **🎨 Dynamic OKLCH Accent Theme Switcher**:
  Global token system allowing instant theme accent customization with smooth transitions and persistent browser storage.
- **⌘ Command Palette (`Cmd + K`)**:
  Full-featured keyboard navigation overlay powered by `cmdk`. Search projects, trigger theme updates, download resume, or jump between routes with fuzzy search and keyboard shortcuts.
- **📐 Bento-Style Case Study Layout**:
  Modern product detail pages equipped with simulated macOS browser chrome frames, elevated KPI impact metrics, architectural decision cards, and rich next/prev visual navigation.
- **🌊 Alternating Directional Scroll Reveals**:
  Spring-physics animated reveals with alternating horizontal offsets (`left` / `right`) and strict reduced-motion accessibility accommodations (`prefers-reduced-motion`).
- **💎 Pristine High-DPI Media**:
  Showcase frame configured with native 3K Retina screenshots, uncompressed delivery (`unoptimized`), and contrast-optimized rendering.

---

## 🚀 Projects Showcased

| Project | Type | Tech Stack | Highlights | Live Demo |
| :--- | :--- | :--- | :--- | :--- |
| **Uno Booking Engine** | Enterprise SaaS | Next.js, React 19, TypeScript, Redux Toolkit, React Query | Multi-tenant hotel IBE with 10+ payment gateways, 20+ locales, RTL support, and currency-aware tax engine. | [Visit Site](https://uno.rategain.com/hotel-booking-engine/) |
| **Dealopoly Arcade** | Real-Time Platform | Next.js 16, React 19, Fastify, WebSockets, Redis, Drizzle ORM | Multiplayer card gaming arcade with Monodeal and Least Count, server-authoritative state, and 3-tier heuristic AI bots. | [Play Live](https://dealopoly.vercel.app) |
| **Codelens** | AI Developer Tool | Next.js, Tailwind CSS, Supabase Vector, Google Gemini | AI codebase explorer indexing GitHub repos with semantic embeddings, grounded file citations, and code previews. | [Try App](https://shubhsaur-codelens.vercel.app) |
| **Content AI** | B2B SaaS | React, Redux, React Final Form, Sass | Large-scale content management platform with optimized rendering pipelines boosting UI performance by 60%. | [Visit Site](https://rategain.com/hotel-content-management-system/) |
| **Cryptopedia** | Web Application | React, Context API, Material UI, ChartJS | Real-time cryptocurrency benchmark tracker with interactive ChartJS trend charts and market cap analytics. | [Explore](https://cryptopedia-app.vercel.app) |
| **Personal Portfolio** | Web / Design System | Next.js 16, React 19, Tailwind CSS v4, Framer Motion | Interactive developer showcase with orbital canvas hero, theme switcher tokens, and Bento case studies. | [View Site](https://shubhamsaurabh.vercel.app) |

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev)
- **Language**: [TypeScript](https://www.typescriptlang.org) (Strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + CSS Variables & OKLCH design tokens
- **Animations & Physics**: [Framer Motion](https://www.framer.com/motion/) + HTML5 Canvas
- **Command Menu**: [cmdk](https://cmdk.paco.me/)
- **Component Primitives**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Form Submissions**: [Getform.io](https://getform.io)

---

## 📂 Project Structure

```
portfolio_v3/
├── public/
│   ├── projects/          # High-resolution Retina project screenshots (3K)
│   ├── about/             # Profile & bio imagery
│   └── og/                # Open Graph social preview cards
├── src/
│   ├── app/               # Next.js App Router (pages, layout, sitemap, SEO)
│   │   ├── about/         # About bio & career journey
│   │   ├── contact/       # Contact form & social channels
│   │   ├── experience/    # Professional work timeline & achievements
│   │   ├── projects/      # Projects index & [slug] dynamic case studies
│   │   └── page.tsx       # Homepage (Hero, Featured Work, About Teaser)
│   ├── components/
│   │   ├── hero/          # FrontendUniverse canvas & HeroDesign
│   │   ├── home/          # FeaturedWork, AboutTeaser, ConnectCallout
│   │   ├── layout/        # SiteShell, Navbar, Footer
│   │   ├── motion/        # Reveal, PageHero animations
│   │   ├── theme/         # ThemeContext & ThemeSwitcher
│   │   └── ui/            # CommandMenu, Button, Card primitives
│   └── lib/
│       ├── content/       # Structured project, site, and open-source data
│       ├── nav.ts         # Navigation items
│       └── seo.ts         # Metadata & OpenGraph generator
└── package.json
```

---

## 💻 Local Development

### Prerequisites
- **Node.js**: `20.x` or later
- **npm**: `10.x` or later (or `pnpm` / `yarn`)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shubhsaur/portfolio_v3.git
   cd portfolio_v3
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Type Checking & Verification**:
   ```bash
   npx tsc --noEmit
   ```

5. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📬 Contact & Connect

- **Portfolio**: [shubhamsaurabh.vercel.app](https://shubhamsaurabh.vercel.app)
- **Email**: [shubhamsaurabh@outlook.com](mailto:shubhamsaurabh@outlook.com)
- **LinkedIn**: [linkedin.com/in/shubhsaur](https://www.linkedin.com/in/shubhsaur)
- **GitHub**: [github.com/shubhsaur](https://github.com/shubhsaur)
- **X / Twitter**: [x.com/shubhsaur](https://x.com/shubhsaur)

---

<div align="center">
  <sub>Designed & Developed by <b>Shubham Saurabh</b> • Built with Next.js 16 & React 19</sub>
</div>
