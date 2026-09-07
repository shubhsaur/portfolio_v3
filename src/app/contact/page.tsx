import { PageGrid } from "@/components/layout/PageGrid";
import { Reveal } from "@/components/motion/Reveal";
import { ContactSection } from "@/components/contact/ContactSection";
import type { Metadata } from "next";

export default function ContactPage() {
  return (
    <div>
      <div className="pt-32">
        <PageGrid>
          <Reveal className="col-span-4 lg:col-span-12">
            <span className="ln-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              Coming in Phase 5
            </span>
            <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Contact</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Two-column layout: Getform message form on left, socials + resume on right.
            </p>
          </Reveal>
        </PageGrid>
      </div>
      <section className="pt-12">
        <PageGrid>
          <Reveal className="col-span-4 lg:col-span-12">
            <ContactSection endpoint={"https://getform.io/f/f07994de-98f2-4f00-91b1-d2aec22d8ee8"} />
          </Reveal>
        </PageGrid>
      </section>
    </div>
  );
}