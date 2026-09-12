"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AboutTeaser() {
  return (
    <section className="pt-12 md:pt-20 pb-6 md:pb-10">
      <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
        <p className="hero-body-text text-base md:text-lg leading-8 text-zinc-300 mb-6">
          I&apos;m <span className="hero-stat-value font-semibold text-zinc-50">Shubham Saurabh</span>,
          a Frontend Engineer with <span className="hero-stat-value font-semibold text-zinc-50">5+ years of experience</span> building
          scalable SaaS platforms, large-scale hotel booking engines, and robust cloud workflows.
          Currently <span className="hero-stat-value font-semibold text-zinc-50">SDE - I at RateGain</span>,
          previously Senior System Engineer at Infosys.
        </p>
        <p className="hero-body-text text-base md:text-lg leading-8 text-zinc-300 mb-8">
          My engineering foundation began at <span className="hero-label-detail font-medium text-zinc-100">Delhi Technological University (DTU)</span>,
          where I graduated with a B.Tech in Polymer Science & Chemical Technology.
          That background in analytical modeling and systems thinking continues to shape my approach
          to building resilient frontend architectures.
        </p>
        <Button asChild variant="outline">
          <Link href="/about">
            <span>Read my story</span>
            <span aria-hidden="true" className="ln-mono text-[10px]">↳</span>
          </Link>
        </Button>
      </div>
    </section>
  );
}