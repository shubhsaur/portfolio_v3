import { ProjectsIndex } from "@/components/projects/ProjectsIndex";
import { getGithubMeta } from "@/lib/github";
import { buildPageMetadata, routeMeta } from "@/lib/seo";
import { ArrowUpRight, Github } from "lucide-react";

export const metadata = buildPageMetadata(routeMeta.projects);

export default async function ProjectsPage() {
  const github = await getGithubMeta();

  return (
    <div className="relative min-h-screen pt-28 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        <ProjectsIndex />

        <div className="mt-16 flex justify-center">
          <a
            href="https://github.com/shubhsaur"
            target="_blank"
            rel="noreferrer"
            className="ln-btn-base ln-btn-outline group inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium"
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
    </div>
  );
}
