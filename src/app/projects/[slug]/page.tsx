import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github, ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, Layers, Sparkles } from "lucide-react";
import { projects, type ProjectRecord } from "@/lib/content/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildPageMetadata, caseStudyMeta } from "@/lib/seo";

const SLUG_ORDER = ["uno-booking", "content-ai", "cryptopedia", "codelens"] as const;

export async function generateStaticParams() {
  return SLUG_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = caseStudyMeta[slug];
  const project = projects.find((p) => p.slug === slug);

  if (!meta || !project) {
    return { title: "Project Not Found" };
  }

  return buildPageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/projects/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = SLUG_ORDER.indexOf(slug as typeof SLUG_ORDER[number]);
  const prevSlug = SLUG_ORDER[(currentIndex - 1 + SLUG_ORDER.length) % SLUG_ORDER.length];
  const nextSlug = SLUG_ORDER[(currentIndex + 1) % SLUG_ORDER.length];
  const prevProject = projects.find((p) => p.slug === prevSlug);
  const nextProject = projects.find((p) => p.slug === nextSlug);

  return (
    <main className="relative min-h-screen pt-28 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
          <div className="space-y-2">
            <span className="ln-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              {project.group === "work" ? "Work Project" : "Personal Project"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-50">{project.title}</h1>
            <p className="text-lg text-zinc-300 max-w-2xl">{project.description}</p>
          </div>
        </header>

        {/* Links Row */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {project.liveUrl && (
            <Button asChild>
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Live App
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild variant="outline">
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
          )}
        </div>

        {project.thumbnail && (
          <div className="group relative mb-12 aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-[var(--ln-radius-card)] border border-border bg-card">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
            <span aria-hidden="true" className="thumbnail-shine-sweep" />
          </div>
        )}

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Lede */}
            <section>
              <h2 className="text-xl font-semibold text-zinc-50 mb-3">Overview</h2>
              <p className="text-base text-zinc-300 leading-relaxed">{project.caseStudy.lede}</p>
            </section>

            {/* Architecture */}
            <section>
              <h2 className="text-xl font-semibold text-zinc-50 mb-3">Architecture</h2>
              <ul className="space-y-2">
                {project.caseStudy.architecture.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-zinc-300">
                    <Layers className="mt-1 h-5 w-5 shrink-0 text-[var(--ln-accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {project.caseStudy.highlights.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-zinc-50 mb-3">Key Engineering Feats</h3>
                  <ul className="space-y-2">
                    {project.caseStudy.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-base text-zinc-300">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--ln-success)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Tech Stack */}
            <section>
              <h2 className="text-xl font-semibold text-zinc-50 mb-3">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full border border-white/6 bg-white/[0.03] px-3 py-1 text-sm text-zinc-300 transition-colors hover:border-white/20 hover:text-zinc-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Stats */}
            <section>
              <h2 className="text-xl font-semibold text-zinc-50 mb-3">Metrics</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.stats.map((stat) => (
                  <Card key={stat.label}>
                    <CardContent className="pt-5">
                      <p className="ln-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-zinc-50">{stat.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Nav */}
            <div className="flex items-center justify-between">
              <Link href={`/projects/${prevSlug}`} className="text-sm text-zinc-400 hover:text-zinc-200">
                <ArrowLeft className="h-4 w-4 inline mr-1" />
                Prev
              </Link>
              <Link href={`/projects/${nextSlug}`} className="text-sm text-zinc-400 hover:text-zinc-200 flex items-center gap-1">
                Next
                <ArrowRight className="h-4 w-4 inline ml-1" />
              </Link>
            </div>

            {/* Project Meta */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div>
                  <p className="ln-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Badge</p>
                  <p className="text-sm text-zinc-300 mt-1">{project.badge}</p>
                </div>
                <div>
                  <p className="ln-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Type</p>
                  <p className="text-sm text-zinc-300 mt-1">{project.group === "work" ? "Work" : "Personal"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[var(--ln-accent)] hover:underline">
                    <ExternalLink className="h-4 w-4" />
                    Live App
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200">
                    <Github className="h-4 w-4" />
                    GitHub Repository
                  </a>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}