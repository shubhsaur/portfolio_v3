import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  Sparkles,
  Lock,
  Cpu,
  Code2,
  Calendar,
  User,
  ArrowUpRight,
} from "lucide-react";
import { projects, type ProjectRecord } from "@/lib/content/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildPageMetadata, caseStudyMeta } from "@/lib/seo";

const SLUG_ORDER = [
  "uno-booking",
  "content-ai",
  "cryptopedia",
  "codelens",
  "portfolio-v3",
  "dealopoly",
] as const;

export async function generateStaticParams() {
  return SLUG_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = caseStudyMeta[slug];
  const project = projects.find((p) => p.slug === slug);

  if (!meta || !project) {
    return { title: "Project Not Found" };
  }

  return buildPageMetadata({
    title: `${project.title} — Case Study`,
    description: meta.description,
    path: `/projects/${slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = SLUG_ORDER.indexOf(slug as (typeof SLUG_ORDER)[number]);
  const prevSlug = SLUG_ORDER[(currentIndex - 1 + SLUG_ORDER.length) % SLUG_ORDER.length];
  const nextSlug = SLUG_ORDER[(currentIndex + 1) % SLUG_ORDER.length];
  const prevProject = projects.find((p) => p.slug === prevSlug);
  const nextProject = projects.find((p) => p.slug === nextSlug);

  // Extract clean display domain for browser frame address bar
  let displayDomain = "localhost:3000";
  if (project.liveUrl) {
    try {
      displayDomain = new URL(project.liveUrl).hostname.replace(/^www\./, "");
    } catch {
      displayDomain = project.liveUrl;
    }
  }

  return (
    <article className="relative min-h-screen pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="mx-auto w-full max-w-[84rem] px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* ── 1. Top Navigation & Hero Section ── */}
        <header className="space-y-6">
          {/* Breadcrumb / Back button */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md transition-colors hover:border-[var(--ln-accent)]/50 hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back to Projects</span>
            </Link>

            {/* Badges / Type */}
            <div className="flex items-center gap-2">
              <span className="ln-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground border border-border/70 rounded-full px-2.5 py-1 bg-muted/20">
                {project.group === "work" ? "Enterprise Work" : "Personal Project"}
              </span>
              <span className="ln-mono text-[0.6875rem] uppercase tracking-wider font-semibold text-[var(--ln-accent)] border border-[var(--ln-accent)]/30 rounded-full px-2.5 py-1 bg-[var(--ln-accent)]/10">
                {project.badge}
              </span>
            </div>
          </div>

          {/* Title & Headline */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Action CTAs & Categories */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <Button asChild size="md" className="shadow-md">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <span>Launch Live App</span>
                    <ExternalLink className="h-4 w-4 ml-1.5" />
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild variant="outline" size="md">
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4 mr-1.5" />
                    <span>View Repository</span>
                  </a>
                </Button>
              )}
            </div>

            {/* Category Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-md border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* ── 2. Key Metrics & Impact Strip (Bento KPIs) ── */}
        {project.stats.length > 0 && (
          <section aria-label="Key project metrics">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-[var(--ln-accent)]/50 hover:bg-card/90"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="ln-mono text-[0.6875rem] uppercase tracking-widest text-muted-foreground">
                      {stat.label}
                    </span>
                    <span className="ln-mono text-[0.625rem] text-[var(--ln-accent)] opacity-60 group-hover:opacity-100 transition-opacity">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </div>
                  {/* Subtle corner indicator */}
                  <div className="absolute top-0 right-0 h-8 w-8 bg-gradient-to-bl from-[var(--ln-accent)]/10 to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 3. High-Resolution Interactive Browser Showcase Frame ── */}
        {project.thumbnail && (
          <section aria-label="Project interactive showcase">
            <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/90 bg-card shadow-2xl transition-all duration-500 hover:border-[var(--ln-accent)]/50">
              {/* macOS Browser Header Chrome */}
              <div className="flex h-11 items-center justify-between border-b border-border/80 bg-muted/40 px-4 sm:px-6">
                {/* Traffic lights */}
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]/90 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/90 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]/90 inline-block" />
                </div>

                {/* Simulated URL Pill */}
                <div className="flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/70 px-3.5 py-1 text-xs text-muted-foreground max-w-[16rem] sm:max-w-md truncate select-none">
                  <Lock className="h-3 w-3 shrink-0 text-[var(--ln-success)]" />
                  <span className="truncate font-mono">{displayDomain}</span>
                </div>

                {/* Live link and original image quick launcher */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.thumbnail}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-muted-foreground hover:text-[var(--ln-accent)] transition-colors inline-flex items-center gap-1"
                    title="View original uncompressed image"
                  >
                    <span className="hidden sm:inline">Original Image</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-muted-foreground hover:text-[var(--ln-accent)] transition-colors inline-flex items-center gap-1"
                      title="Open live site"
                    >
                      <span className="hidden sm:inline">Visit</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Showcase Image Canvas (unoptimized, pristine full-resolution) */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-muted/20 flex items-center justify-center p-2 sm:p-4">
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} interface preview`}
                  fill
                  unoptimized
                  quality={100}
                  className="object-contain [image-rendering:-webkit-optimize-contrast] transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                  priority
                  sizes="(max-width: 1440px) 100vw, 1440px"
                />
                {/* Subtle shine sweep */}
                <span aria-hidden="true" className="thumbnail-shine-sweep" />
              </div>
            </div>
          </section>
        )}

        {/* ── 4. Bento Details Grid (Main Story + Sidebar Specs) ── */}
        <div className="grid gap-10 lg:grid-cols-12">
          
          {/* Main Content Column (8 cols) */}
          <main className="lg:col-span-8 space-y-12">
            
            {/* Overview & Strategic Intent */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xl sm:text-2xl">
                <Sparkles className="h-5 w-5 text-[var(--ln-accent)]" />
                <h2>Project Overview</h2>
              </div>
              <div className="rounded-2xl border border-border/80 bg-card/40 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--ln-accent)]" />
                <p className="text-base sm:text-lg leading-relaxed text-foreground/90 font-normal">
                  {project.caseStudy.lede}
                </p>
              </div>
            </section>

            {/* Architecture & Engineering Decisions */}
            <section className="space-y-5">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xl sm:text-2xl">
                <Layers className="h-5 w-5 text-[var(--ln-accent)]" />
                <h2>System Architecture & Decisions</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-1">
                {project.caseStudy.architecture.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-xl border border-border/70 bg-card/50 p-5 transition-colors hover:border-[var(--ln-accent)]/40 hover:bg-card/80"
                  >
                    <span className="ln-mono flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--ln-accent)]/30 bg-[var(--ln-accent)]/10 text-xs font-bold text-[var(--ln-accent)]">
                      0{i + 1}
                    </span>
                    <p className="text-sm sm:text-base text-foreground/85 leading-relaxed pt-0.5">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Engineering Feats */}
            {project.caseStudy.highlights.length > 0 && (
              <section className="space-y-5">
                <div className="flex items-center gap-2 text-foreground font-semibold text-xl sm:text-2xl">
                  <CheckCircle2 className="h-5 w-5 text-[var(--ln-success)]" />
                  <h2>Key Engineering Highlights</h2>
                </div>
                <div className="grid gap-3.5 sm:grid-cols-1">
                  {project.caseStudy.highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3.5 rounded-xl border border-border/70 bg-card/40 p-4.5 sm:p-5 transition-colors hover:border-border"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ln-success)]" />
                      <span className="text-sm sm:text-base text-foreground/85 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tech Stack Chips */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-foreground font-semibold text-xl sm:text-2xl">
                <Code2 className="h-5 w-5 text-[var(--ln-accent)]" />
                <h2>Technology Stack</h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-[var(--ln-accent)]/50 hover:bg-muted/40 shadow-xs"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--ln-accent)]" />
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar Specifications Column (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Project Quick Specs Card */}
            <Card className="border-border/80 bg-card/70 backdrop-blur-md overflow-hidden">
              <CardHeader className="border-b border-border/60 pb-4">
                <CardTitle className="text-base font-semibold text-foreground flex items-center justify-between">
                  <span>Project Metadata</span>
                  <span className="ln-mono text-[0.625rem] text-muted-foreground uppercase">Specs</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-5 text-sm">
                
                <div>
                  <span className="ln-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                    Project Classification
                  </span>
                  <p className="mt-1 font-medium text-foreground">
                    {project.group === "work" ? "Enterprise Production Software" : "Open Web / Independent Build"}
                  </p>
                </div>

                <div>
                  <span className="ln-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                    Badge & Status
                  </span>
                  <p className="mt-1 font-medium text-foreground">
                    {project.badge}
                  </p>
                </div>

                <div>
                  <span className="ln-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                    Categories
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {project.categories.map((c) => (
                      <span
                        key={c}
                        className="rounded-md border border-border/80 bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {project.liveUrl && (
                  <div className="border-t border-border/60 pt-4">
                    <span className="ln-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                      Deployment
                    </span>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1.5 flex items-center justify-between rounded-lg border border-border/80 bg-muted/30 p-2.5 text-xs text-foreground transition-colors hover:border-[var(--ln-accent)] hover:text-[var(--ln-accent)]"
                    >
                      <span className="truncate max-w-[200px]">{displayDomain}</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  </div>
                )}

                {project.githubUrl && (
                  <div className={project.liveUrl ? "pt-1" : "border-t border-border/60 pt-4"}>
                    <span className="ln-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                      Source Code
                    </span>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1.5 flex items-center justify-between rounded-lg border border-border/80 bg-muted/30 p-2.5 text-xs text-foreground transition-colors hover:border-[var(--ln-accent)] hover:text-[var(--ln-accent)]"
                    >
                      <span className="truncate max-w-[200px]">github.com/shubhsaur/{project.slug}</span>
                      <Github className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Contact / Hire Callout */}
            <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-card/80 to-muted/20 p-6 backdrop-blur-md space-y-4">
              <h3 className="text-base font-semibold text-foreground">
                Interested in building similar interfaces?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                I specialize in high-concurrency frontend platforms, design systems, and responsive applications.
              </p>
              <Button asChild variant="outline" size="sm" className="w-full justify-center">
                <Link href="/contact">
                  <span>Get in Touch</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </Button>
            </div>
          </aside>
        </div>

        {/* ── 5. Rich Previous & Next Project Navigation Cards ── */}
        <section
          aria-label="Project navigation"
          className="border-t border-border/80 pt-10 sm:pt-14"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Explore More Case Studies
            </h3>
            <Link
              href="/projects"
              className="text-xs font-medium text-[var(--ln-accent)] hover:underline"
            >
              All Projects ({projects.length}) →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Prev Project Card */}
            {prevProject && (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group relative flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-4 transition-all duration-300 hover:border-[var(--ln-accent)]/50 hover:bg-card/90"
              >
                {prevProject.thumbnail && (
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-muted/30">
                    <Image
                      src={prevProject.thumbnail}
                      alt={prevProject.title}
                      fill
                      unoptimized
                      className="object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1 space-y-0.5">
                  <span className="ln-mono text-[0.625rem] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                    Previous Project
                  </span>
                  <h4 className="text-base font-semibold text-foreground truncate group-hover:text-[var(--ln-accent)] transition-colors">
                    {prevProject.title}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {prevProject.badge}
                  </p>
                </div>
              </Link>
            )}

            {/* Next Project Card */}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group relative flex items-center justify-between gap-4 rounded-2xl border border-border bg-card/60 p-4 text-right transition-all duration-300 hover:border-[var(--ln-accent)]/50 hover:bg-card/90"
              >
                <div className="min-w-0 flex-1 space-y-0.5 text-left sm:text-right">
                  <span className="ln-mono text-[0.625rem] uppercase tracking-wider text-muted-foreground flex items-center gap-1 justify-start sm:justify-end">
                    Next Project
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                  <h4 className="text-base font-semibold text-foreground truncate group-hover:text-[var(--ln-accent)] transition-colors">
                    {nextProject.title}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {nextProject.badge}
                  </p>
                </div>
                {nextProject.thumbnail && (
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-muted/30 order-first sm:order-last">
                    <Image
                      src={nextProject.thumbnail}
                      alt={nextProject.title}
                      fill
                      unoptimized
                      className="object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
              </Link>
            )}
          </div>
        </section>

      </div>
    </article>
  );
}