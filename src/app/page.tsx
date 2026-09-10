import { HeroBackdrop } from "@/components/hero/HeroBackdrop";
import { RotatingIntro } from "@/components/hero/RotatingIntro";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import HeroDesign from "@/components/hero/HeroDesign";
import { SkillsStrip } from "@/components/home/SkillsStrip";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Button } from "@/components/ui/button";
import { getGithubMeta } from "@/lib/github";
import { buildPageMetadata, routeMeta } from "@/lib/seo";
import { site } from "@/lib/content/site";

export const metadata = buildPageMetadata({
  ...routeMeta.home,
  absoluteTitle: true,
});

export default async function Home() {
  const github = await getGithubMeta();

  return (
    <main className="relative pt-20 pb-24 sm:pt-28 md:pt-35 sm:pb-32 md:pb-40">
      {/* HERO SECTION */}
      <section id="hero" className="scroll-mt-28">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-col md:flex-row gap-8 md:items-start">
            {/* IDENTITY CLUSTER */}
            <div className="flex flex-col md:w-[60%]">
              <span
                className="hero-badge inline-flex items-center gap-2 rounded-full bg-[var(--ln-accent-wash)] w-fit px-3.5 py-1.5 sm:px-5 sm:py-2 text-[0.75rem] sm:text-[0.8125rem] font-medium text-amber-200 ring-1 ring-[var(--ln-accent)]/15"
              >
                <span className="h-2 w-2 rounded-full bg-[#4B9AA5] shadow-[0_0_0_3px_rgba(75,154,165,0.3)]" />
                SDE @ RateGain · Available for collaborations
              </span>

              <h1 className="mt-6 sm:mt-7 md:mt-9 text-balance text-[2rem] sm:text-[2.5rem] md:text-[3.125rem] lg:text-[3.75rem] xl:text-[4.375rem] font-bold leading-none tracking-tighter">
                Hi, I'm{" "}
                <span className="ln-gradient-text">Shubham&nbsp;Saurabh</span>
              </h1>

              <RotatingIntro className="mt-2.5 sm:mt-3.5" />

              <p className="hero-body-text mt-5 sm:mt-6 md:mt-7 max-w-[34rem] text-[0.9375rem] sm:text-[1.0625rem] md:text-[1.0625rem] sm:leading-relaxed md:leading-relaxed text-zinc-300">
                Frontend Engineer with 5+ years of experience designing and building scalable web
                applications using React, Next.js, TypeScript, and JavaScript. Specializing in
                enterprise SaaS platforms, large-scale booking engines, and motion-rich interfaces.
              </p>

              <div className="mt-6 sm:mt-7 md:mt-9 grid grid-cols-3 gap-2 sm:gap-3 md:gap-3 sm:flex sm:flex-row sm:items-end sm:justify-start sm:gap-10 md:gap-12 text-center sm:text-left">
                <div>
                  <p className="hero-stat-value text-[1.375rem] sm:text-[1.75rem] md:text-[2.25rem] font-semibold text-zinc-50">5+</p>
                  <p className="hero-stat-label mt-1.5 sm:mt-2 text-[0.6875rem] sm:text-[0.75rem] md:text-[0.8125rem] tracking-[0.12em] sm:tracking-[0.14em] md:tracking-[0.16em] text-zinc-500 uppercase">Years Exp</p>
                </div>
                <div className="hidden h-10 sm:h-12 w-px bg-[var(--ln-border-subtle)] sm:block" />
                <div>
                  <p className="hero-stat-value text-[1.375rem] sm:text-[1.75rem] md:text-[2.25rem] font-semibold text-zinc-50">
                    {github.publicRepos != null ? `${github.publicRepos}+` : "70+"}
                  </p>
                  <p className="hero-stat-label mt-1.5 sm:mt-2 text-[0.6875rem] sm:text-[0.75rem] md:text-[0.8125rem] tracking-[0.12em] sm:tracking-[0.14em] md:tracking-[0.16em] text-zinc-500 uppercase">GitHub Repos</p>
                </div>
                <div className="hidden h-10 sm:h-12 w-px bg-[var(--ln-border-subtle)] sm:block" />
                <div>
                  <p className="hero-stat-value text-[1.375rem] sm:text-[1.75rem] md:text-[2.25rem] font-semibold text-zinc-50">2+</p>
                  <p className="hero-stat-label mt-1.5 sm:mt-2 text-[0.6875rem] sm:text-[0.75rem] md:text-[0.8125rem] tracking-[0.12em] sm:tracking-[0.14em] md:tracking-[0.16em] text-zinc-500 uppercase">Major Awards</p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-5 sm:mt-6 md:mt-8 flex w-full gap-3">
                <Button asChild size="sm" className="min-w-0 flex-1 sm:h-auto sm:px-4 sm:py-2">
                  <a href={site.resumePath} download>
                    Download Resume
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm" className="min-w-0 flex-1 sm:h-auto sm:px-4 sm:py-2">
                  <a href="/projects">
                    See my Work
                  </a>
                </Button>
              </div>

            </div>

            <HeroDesign />
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <FeaturedWork />

      {/* COMPACT SKILLS STRIP */}
      <SkillsStrip />

      {/* ABOUT TEASER */}
      <AboutTeaser />

      {/* CTA BAND */}
      <div className="mt-24 md:mt-32 text-center">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-center">
          <Button asChild>
            <a href="/projects">
              View my work
              <span aria-hidden="true" className="ln-mono text-[10px]">
                ↳
              </span>
            </a>
          </Button>

          <Button asChild variant="outline">
            <a href="mailto:shubhamsaurabh@outlook.com">Get in touch</a>
          </Button>
        </div>
      </div>
    </main>
  );
}