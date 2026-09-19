import { Suspense } from "react";
import { ProjectsIndex } from "@/components/projects/ProjectsIndex";
import { getGithubMeta } from "@/lib/github";
import { buildPageMetadata, routeMeta } from "@/lib/seo";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = buildPageMetadata(routeMeta.projects);

async function GithubRepoCount() {
  const github = await getGithubMeta();
  return (
    <span>
      View all{" "}
      {github.publicRepos != null ? (
        <span className="font-semibold">{github.publicRepos}+</span>
      ) : (
        "70+"
      )}{" "}
      repositories on GitHub
    </span>
  );
}

function GithubRepoCountFallback() {
  return <span>View all 70+ repositories on GitHub</span>;
}

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen pt-28 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto w-full max-w-[87.5rem] px-4 sm:px-6 lg:px-8">
        <ProjectsIndex />

        <div className="mt-16 flex justify-center">
          <Button asChild variant="outline">
            <a
              href="https://github.com/shubhsaur"
              target="_blank"
              rel="noreferrer"
            >
              <Suspense fallback={<GithubRepoCountFallback />}>
                <GithubRepoCount />
              </Suspense>
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
