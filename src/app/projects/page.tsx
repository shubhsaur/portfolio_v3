import { ProjectsIndex } from "@/components/projects/ProjectsIndex";
import { getGithubMeta } from "@/lib/github";
import { buildPageMetadata, routeMeta } from "@/lib/seo";
import { ArrowUpRight, Github } from "lucide-react";

export const metadata = buildPageMetadata(routeMeta.projects);

export default async function ProjectsPage() {
  const github = await getGithubMeta();

  return (
    <main className="relative min-h-screen pt-28 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <ProjectsIndex />

        <div className="mt-16 flex justify-center">
          <a
            href="https://github.com/shubhsaur"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-center gap-3 rounded-full border border-[var(--ln-accent)]/20 bg-[var(--ln-accent)]/10 px-7 py-3.5 text-sm font-medium text-[var(--ln-accent)] transition duration-300 hover:border-[var(--ln-accent)]/40 hover:bg-[var(--ln-accent)]/15"
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
            <ArrowUpRight className="sr-only" />
          </a>
        </div>
      </div>
    </main>
  );
}
