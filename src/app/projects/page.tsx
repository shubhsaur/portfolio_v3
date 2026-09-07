import { PageGrid } from "@/components/layout/PageGrid";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { OpenSourceSection } from "@/components/opensource/OpenSourceSection";

export default function ProjectsPage() {
  return (
    <div>
      <div className="pt-32">
        <PageGrid>
          <Reveal className="col-span-4 lg:col-span-12">
            <span className="ln-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              Coming in Phase 2
            </span>
            <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Projects</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Work and personal builds with thumbnails, skills, and links. Opens in Phase 2.
            </p>
          </Reveal>
        </PageGrid>
      </div>
      <section className="pt-12">
        <PageGrid>
          <Reveal className="col-span-4 lg:col-span-12">
            <ProjectsSection />
          </Reveal>
          <Reveal className="col-span-4 lg:col-span-12 pt-12">
            <OpenSourceSection />
          </Reveal>
        </PageGrid>
      </section>
    </div>
  );
}
