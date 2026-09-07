import { ProjectsIndex } from "@/components/projects/ProjectsIndex";
import { getGithubMeta } from "@/lib/github";
import { ArrowUpRight, Github } from "lucide-react";

export const metadata = {
  title: "Projects — Shubham Saurabh",
  description:
    "Frontend Engineer projects including hotel booking engines, content management platforms, AI tools, and personal web apps.",
};

export default async function ProjectsPage() {
  const github = await getGithubMeta();

  return (
    <main className="relative min-h-screen pt-28 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <ProjectsIndex />

        {/* GitHub CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href="https://github.com/shubhsaur"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-center gap-3 rounded-full border border-[rgba(232,197,71,0.2)] bg-[rgba(232,197,71,0.08)] px-7 py-3.5 text-sm font-medium text-[var(--ln-accent-gold)] shadow-[0_0_0_rgba(232,197,71,0)] transition duration-300 hover:border-[rgba(232,197,71,0.4)] hover:bg-[rgba(232,197,71,0.12)] hover:shadow-[0_0_30px_rgba(232,197,71,0.22)]"
          >
            <span>
              View all{" "}
              {github.publicRepos != null ? (
                <span className="font-semibold">{github.publicRepos}+</span>
              ) : (
                "70+"
              )}{" "}
              repositories on GitHub
            </span>
            <Github className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </main>
  );
}
