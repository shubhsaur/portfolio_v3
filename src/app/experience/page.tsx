import { PageGrid } from "@/components/layout/PageGrid";
import { Reveal } from "@/components/motion/Reveal";

export default function ExperiencePage() {
  return (
    <PageGrid>
      <Reveal className="col-span-4 pt-32 sm:col-span-8 lg:col-span-12">
        <span className="ln-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Coming in Phase 3
        </span>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Experience</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          RateGain SDE-I and Infosys SSE career arc with metrics and timeline.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          <a href="/" className="text-[var(--ln-accent)] hover:underline">
            ← Back to home
          </a>
        </p>
      </Reveal>
    </PageGrid>
  );
}
