import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { CodeCard } from "@/components/hero/CodeCard";
import { RotatingIntro } from "@/components/hero/RotatingIntro";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { SkillsStrip } from "@/components/home/SkillsStrip";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Button } from "@/components/ui/button";
import { getGithubMeta } from "@/lib/github";
import { ArrowUpRight } from "lucide-react";

export default async function Home() {
  const github = await getGithubMeta();

  return (
    <main className="relative pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* HERO SECTION */}
      <section id="hero" className="scroll-mt-28">
        <HeroBackdrop />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-col sm:flex-row gap-6 sm:items-end sm:justify-between">
            {/* IDENTITY CLUSTER */}
            <div className="flex flex-col sm:w-full sm:max-w-xl">
              <span
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900/60 px-3 py-1 text-[11px] font-medium text-zinc-400 ring-1 ring-zinc-700/60"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.5)]" />
                SDE - I @ RateGain · Available for collaborations
              </span>

              <h1 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Hi, I{" "}
                <span className="ln-gradient-text">Shubham&nbsp;Saurabh</span>
              </h1>

              <RotatingIntro />

              <p className="mt-4 max-w-xl text-sm text-zinc-300 sm:text-base">
                Frontend Engineer with 5+ years of experience designing and building scalable web
                applications using React, Next.js, TypeScript, and JavaScript. Specializing in
                enterprise SaaS platforms, large-scale booking engines, and motion-rich interfaces.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2 sm:flex sm:flex-row sm:items-end sm:justify-start sm:gap-10 text-center sm:text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-semibold text-zinc-50">5+</p>
                  <p className="mt-1 text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.16em] text-zinc-500 uppercase">Years Exp</p>
                </div>
                <div className="hidden h-10 w-px bg-white/10 sm:block" />
                <div>
                  <p className="text-xl sm:text-2xl font-semibold text-zinc-50">
                    {github.publicRepos != null ? `${github.publicRepos}+` : "70+"}
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.16em] text-zinc-500 uppercase">GitHub Repos</p>
                </div>
                <div className="hidden h-10 w-px bg-white/10 sm:block" />
                <div>
                  <p className="text-xl sm:text-2xl font-semibold text-zinc-50">2+</p>
                  <p className="mt-1 text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.16em] text-zinc-500 uppercase">Major Awards</p>
                </div>
              </div>
            </div>

            {/* CODE CARD */}
            <CodeCard />
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