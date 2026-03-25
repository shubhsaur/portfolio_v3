import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/Reveal";
import { CodeCard } from "@/components/hero/CodeCard";
import { RotatingIntro } from "@/components/hero/RotatingIntro";
import { ContactSection } from "@/components/contact/ContactSection";
import { SkillsShowcase } from "@/components/skills/SkillsShowcase";
import { getGithubMeta } from "@/lib/github";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";

export default async function Home() {
  const github = await getGithubMeta();
  const getformEndpoint = "https://getform.io/f/f07994de-98f2-4f00-91b1-d2aec22d8ee8";
  const aboutFacts = [
    {
      icon: "🎓",
      label: "Education",
      value: "B.Tech in Chemical Engineering, Delhi Technological University (2020)",
    },
    {
      icon: "🏢",
      label: "Current Role",
      value: "SDE (Frontend) at RateGain",
    },
    {
      icon: "📍",
      label: "Location",
      value: "Noida, India",
    },
    {
      icon: "🏆",
      label: "Recognition",
      value: "Best Performer Q3 Award at RateGain",
    },
  ];
  const codelensTech = [
    "Next.js",
    "Tailwind CSS",
    "Supabase",
    "Google Gemini",
  ];

  return (
    <div className="relative min-h-screen text-sm text-zinc-100 sm:text-base">
      <Navbar />
      <ScrollToTopButton />
      <main className="mx-auto flex max-w-6xl flex-col gap-32 px-4 pb-24 pt-28 sm:px-6 lg:px-8 xl:px-10">
        <section
          id="hero"
          className="scroll-mt-28"
          aria-labelledby="hero-heading"
        >
          <Reveal className="ln-surface relative overflow-hidden p-6 sm:p-10">
            <div className="absolute inset-0 opacity-40">
              <div className="pointer-events-none absolute inset-[-40%] bg-[radial-gradient(circle_at_top,rgba(248,250,252,0.06),transparent_55%),radial-gradient(circle_at_bottom,rgba(0,0,0,0.8),transparent_55%)]" />
            </div>

            <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-zinc-900/60 px-3 py-1 text-[11px] font-medium text-zinc-400 ring-1 ring-zinc-700/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.5)]" />
                  Available for frontend roles & collaborations
                </span>

                <h1
                  id="hero-heading"
                  className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl"
                >
                  Hi, I&apos;m{" "}
                  <span className="ln-gradient-text">Shubham&nbsp;Saurabh</span>
                </h1>

                <RotatingIntro />

                <p className="mt-4 max-w-xl text-sm text-zinc-300 sm:text-base">
                  Frontend engineer crafting expressive interfaces and motion-rich
                  experiences that feel intentional, performant, and calm.
                </p>

                <div className="mt-6 flex flex-col gap-6 border-t border-white/10 pt-5 text-xs text-zinc-400 sm:text-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-start sm:gap-10">
                    <div>
                      <p className="text-xl font-semibold text-zinc-50">
                        5+
                      </p>
                      <p className="mt-1 tracking-[0.16em] text-zinc-500">
                        YEARS EXPERIENCE
                      </p>
                    </div>
                    <div className="hidden h-10 w-px bg-white/10 sm:block" />
                    <div>
                      <p className="text-xl font-semibold text-zinc-50">
                        {github.publicRepos != null ? `${github.publicRepos}+` : "70+"}
                      </p>
                      <p className="mt-1 tracking-[0.16em] text-zinc-500">
                        GITHUB REPOS
                      </p>
                    </div>
                    <div className="hidden h-10 w-px bg-white/10 sm:block" />
                    <div>
                      <p className="text-xl font-semibold text-zinc-50">
                        2+
                      </p>
                      <p className="mt-1 tracking-[0.16em] text-zinc-500">
                        OPEN SOURCE CONTRIBUTIONS
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button href="#projects">
                      View my work
                      <span aria-hidden="true" className="ln-mono text-[10px]">
                        ↳
                      </span>
                    </Button>
                    <Button type="button" variant="outline">
                      Download resume
                    </Button>
                  </div>
                </div>
              </div>

              <CodeCard />
            </div>
          </Reveal>
        </section>

        <section
          id="about"
          className="scroll-mt-28 border-t border-white/5 pt-12"
          aria-labelledby="about-heading"
        >
          <Reveal className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.9fr)] lg:items-start">
            <div>
              <span className="ln-mono inline-flex rounded-full border border-[rgba(232,197,71,0.18)] bg-[rgba(232,197,71,0.08)] px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[var(--ln-accent-gold)]">
                About Me
              </span>
              <h2
                id="about-heading"
                className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl"
              >
                Building thoughtful frontend experiences with an engineer&apos;s
                eye for structure.
              </h2>

              <div className="mt-10 max-w-3xl space-y-6 text-base leading-8 text-zinc-300">
                <p>
                  I&apos;m <span className="font-semibold text-zinc-50">Shubham Saurabh</span>,
                  a frontend engineer currently working as{" "}
                  <span className="font-semibold text-[var(--ln-accent-gold)]">
                    SDE (Frontend) at RateGain
                  </span>
                  . I enjoy turning product ideas into polished interfaces that
                  feel fast, expressive, and easy to use.
                </p>
                <p>
                  My path into software started at Delhi Technological University,
                  where I graduated in 2020 with a B.Tech in Chemical Engineering.
                  That shift from core engineering into frontend shaped how I work:
                  grounded in systems thinking, careful execution, and a strong
                  bias toward clarity.
                </p>
                <p>
                  Based in Noida, India, I focus on building modern web experiences
                  with clean architecture, thoughtful motion, and strong attention
                  to detail. Along the way, I was honored with the{" "}
                  <span className="font-semibold text-zinc-50">
                    Best Performer Q3 Award
                  </span>{" "}
                  at RateGain.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {aboutFacts.map((fact) => (
                  <Card
                    key={fact.label}
                    className="rounded-3xl border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-xl" aria-hidden="true">
                        {fact.icon}
                      </span>
                      <div>
                        <p className="ln-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                          {fact.label}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-zinc-100">
                          {fact.value}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="relative min-h-[420px] overflow-visible rounded-[2rem] border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(232,197,71,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(248,113,113,0.18),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(93,228,199,0.14),transparent_28%)]" />

              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="ln-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                      Profile Snapshot
                    </p>
                    <p className="mt-2 text-lg font-medium text-zinc-50">
                      Frontend systems, motion, and product craft
                    </p>
                  </div>
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
                    Currently at RateGain
                  </span>
                </div>

                <div className="relative mx-auto mt-12 flex w-full max-w-[340px] items-center justify-center">
                  <div className="relative flex aspect-square w-full items-center justify-center rounded-[2.75rem] bg-[linear-gradient(145deg,#f2c14e_0%,#f87171_48%,#8bd3c7_100%)] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                    <div className="rounded-[2rem] bg-black/12 px-8 py-5 backdrop-blur-sm">
                      <span className="text-6xl font-semibold tracking-tight text-black/85 sm:text-7xl">
                        SS
                      </span>
                    </div>
                  </div>

                  <span className="absolute -left-5 bottom-12 rounded-2xl bg-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                    React
                  </span>
                  <span className="absolute -right-4 -top-4 rounded-2xl bg-yellow-300 px-4 py-3 text-sm font-semibold text-zinc-950 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                    JS
                  </span>
                  <span className="absolute -bottom-5 right-8 rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                    TS
                  </span>
                </div>

                <div className="relative mt-10 grid gap-3 text-sm text-zinc-300">
                  <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                    <span className="text-zinc-500">Name</span>
                    <span className="font-medium text-zinc-50">Shubham Saurabh</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                    <span className="text-zinc-500">Location</span>
                    <span className="font-medium text-zinc-50">Noida, India</span>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </section>

        <section
          id="skills"
          className="scroll-mt-28 border-t border-white/5 pt-12"
          aria-labelledby="skills-heading"
        >
          <Reveal delay={0.05}>
            <SkillsShowcase />
          </Reveal>
        </section>

        <section
          id="projects"
          className="scroll-mt-28 border-t border-white/5 pt-12"
          aria-labelledby="projects-heading"
        >
          <Reveal className="space-y-10" delay={0.05}>
            <div className="flex flex-col items-start gap-5 text-left md:items-center md:text-center">
              <span className="ln-mono inline-flex rounded-full border border-[rgba(232,197,71,0.18)] bg-[rgba(232,197,71,0.08)] px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[var(--ln-accent-gold)]">
                Projects
              </span>
              <div className="space-y-4">
                <h2
                  id="projects-heading"
                  className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl"
                >
                  Featured work
                </h2>
                <p className="max-w-2xl text-base leading-8 text-zinc-400">
                  Product-focused builds where interface clarity, developer
                  experience, and ambitious ideas all meet in the same surface.
                </p>
              </div>
            </div>

            <Card className="overflow-hidden rounded-[2.25rem] border-[rgba(232,197,71,0.16)] bg-[radial-gradient(circle_at_top_right,rgba(93,228,199,0.12),transparent_24%),radial-gradient(circle_at_top_left,rgba(232,197,71,0.08),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-0">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div className="relative border-b border-white/6 p-5 sm:p-6 lg:border-b-0 lg:border-r">
                  <div className="relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,#09111d_0%,#06060a_100%)] shadow-[0_24px_65px_rgba(0,0,0,0.4)]">
                    <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_left,rgba(232,197,71,0.08),transparent_22%),radial-gradient(circle_at_top_right,rgba(93,228,199,0.1),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_20%)]" />
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src="/codelens.png"
                        alt="Codelens project dashboard preview"
                        fill
                        className="object-contain object-center"
                        sizes="(min-width: 1024px) 40vw, 100vw"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-500">
                      <span>AI tooling</span>
                      <span>Developer UX</span>
                      <span>Search</span>
                    </div>
                    <span className="rounded-full border border-[rgba(232,197,71,0.18)] bg-[rgba(232,197,71,0.08)] px-3 py-1 text-[11px] font-medium text-[var(--ln-accent-gold)]">
                      Featured
                    </span>
                  </div>

                  <h3 className="mt-8 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                    Codelens
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">
                    AI-powered codebase explorer that indexes GitHub repos,
                    builds searchable context, and answers repo questions with
                    grounded citations, file preview, and syntax-highlighted
                    code.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {codelensTech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <Button
                      href="https://shubhsaur-codelens.vercel.app"
                      target="_blank"
                      rel="noreferrer"
                      className="min-w-[180px]"
                    >
                      Open live app
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                    <Button
                      href="https://github.com/shubhsaur/codelens"
                      target="_blank"
                      rel="noreferrer"
                      variant="outline"
                      className="min-w-[180px]"
                    >
                      View GitHub repo
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center pt-2">
              <a
                href="https://github.com/shubhsaur"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-[rgba(232,197,71,0.2)] bg-[rgba(232,197,71,0.08)] px-7 py-3.5 text-sm font-medium text-[var(--ln-accent-gold)] shadow-[0_0_0_rgba(232,197,71,0)] transition duration-300 hover:border-[rgba(232,197,71,0.4)] hover:bg-[rgba(232,197,71,0.12)] hover:shadow-[0_0_30px_rgba(232,197,71,0.22)]"
              >
                <span>
                  View all{" "}
                  {github.publicRepos != null ? (
                    <span className="font-semibold">
                      {github.publicRepos}+
                    </span>
                  ) : (
                    "my"
                  )}{" "}
                  repositories
                </span>
                <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        </section>

        <section
          id="content"
          className="scroll-mt-28 border-t border-white/5 pt-12"
          aria-labelledby="content-heading"
        >
          <Reveal className="space-y-6" delay={0.05}>
            <h2
              id="content-heading"
              className="ln-mono text-xs uppercase tracking-[0.24em] text-zinc-500"
            >
              Content
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  UI & Frontend
                </p>
                <p className="mt-2 text-sm text-zinc-200">
                  Placeholder for articles, talks, or videos on frontend
                  architecture and animation.
                </p>
              </Card>
              <Card>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Experiments
                </p>
                <p className="mt-2 text-sm text-zinc-200">
                  A space for prototypes, creative coding experiments, and
                  small visual demos.
                </p>
              </Card>
            </div>
          </Reveal>
        </section>

        <section
          id="contact"
          className="scroll-mt-28 border-t border-white/5 pt-12"
          aria-labelledby="contact-heading"
        >
          <Reveal delay={0.05}>
            <ContactSection endpoint={getformEndpoint} />
          </Reveal>
        </section>
        <Footer />
      </main>
    </div>
  );
}
