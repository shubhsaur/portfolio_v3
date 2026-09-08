import { HeroBackdrop } from "@/components/hero/HeroBackdrop";
import { RotatingIntro } from "@/components/hero/RotatingIntro";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import HeroDesign from "@/components/hero/HeroDesign";
import { SkillsStrip } from "@/components/home/SkillsStrip";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Button } from "@/components/ui/button";
import { getGithubMeta } from "@/lib/github";
import { buildPageMetadata, routeMeta } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";

export const metadata = buildPageMetadata({
  ...routeMeta.home,
  absoluteTitle: true,
});

export default async function Home() {
  const github = await getGithubMeta();

  return (
    <main className="relative pt-40 pb-32 sm:pt-48 sm:pb-40">
      {/* HERO SECTION */}
      <section id="hero" className="scroll-mt-28">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-col sm:flex-row gap-8 sm:items-end sm:justify-between">
            {/* IDENTITY CLUSTER */}
            <div className="flex flex-col sm:w-full sm:max-w-[36rem]">
              <span
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900/60 w-fit px-4 py-1.5 text-[12px] font-medium text-zinc-400 ring-1 ring-zinc-700/60"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.5)]" />
                SDE @ RateGain · Available for collaborations
              </span>

              <h1 className="mt-8 text-balance text-[2.2rem] font-bold leading-none tracking-tighter sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4rem]">
                Hi, I'm{" "}
                <span className="ln-gradient-text">Shubham&nbsp;Saurabh</span>
              </h1>

              <RotatingIntro className="mt-3" />

              <p className="mt-6 max-w-[32rem] text-base text-zinc-300 leading-relaxed sm:text-lg">
                Frontend Engineer with 5+ years of experience designing and building scalable web
                applications using React, Next.js, TypeScript, and JavaScript. Specializing in
                enterprise SaaS platforms, large-scale booking engines, and motion-rich interfaces.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3 sm:flex sm:flex-row sm:items-end sm:justify-start sm:gap-12 text-center sm:text-left">
                <div>
                  <p className="text-[1.5rem] sm:text-[2rem] font-semibold text-zinc-50">5+</p>
                  <p className="mt-2 text-[11px] sm:text-sm tracking-[0.14em] sm:tracking-[0.16em] text-zinc-500 uppercase">Years Exp</p>
                </div>
                <div className="hidden h-12 w-px bg-white/10 sm:block" />
                <div>
                  <p className="text-[1.5rem] sm:text-[2rem] font-semibold text-zinc-50">
                    {github.publicRepos != null ? `${github.publicRepos}+` : "70+"}
                  </p>
                  <p className="mt-2 text-[11px] sm:text-sm tracking-[0.14em] sm:tracking-[0.16em] text-zinc-500 uppercase">GitHub Repos</p>
                </div>
                <div className="hidden h-12 w-px bg-white/10 sm:block" />
                <div>
                  <p className="text-[1.5rem] sm:text-[2rem] font-semibold text-zinc-50">2+</p>
                  <p className="mt-2 text-[11px] sm:text-sm tracking-[0.14em] sm:tracking-[0.16em] text-zinc-500 uppercase">Major Awards</p>
                </div>
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