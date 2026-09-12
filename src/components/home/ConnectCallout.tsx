"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content/site";

export function ConnectCallout() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      toast.success("Email copied to clipboard!", {
        description: site.email,
      });
      setTimeout(() => setCopied(false), 2400);
    } catch {
      toast.error("Failed to copy email. Please copy manually: " + site.email);
    }
  };

  return (
    <section
      aria-labelledby="connect-callout-heading"
      className="relative mt-8 sm:mt-12 md:mt-16 mx-auto max-w-[87.5rem] px-4 sm:px-6 lg:px-8"
    >
      <div className="group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-border/70 border-t-white/15 bg-card/60 backdrop-blur-2xl shadow-[var(--ln-shadow-surface)] transition-all duration-500 hover:border-border hover:shadow-2xl">
        {/* Theme-reactive ambient radial glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-60 blur-3xl transition-colors duration-700 sm:h-96 sm:w-96"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--ln-accent) 30%, transparent) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full opacity-40 blur-3xl transition-colors duration-700 sm:h-[28rem] sm:w-[28rem]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--ln-accent) 22%, transparent) 0%, color-mix(in srgb, var(--ln-accent-cyan, #4b9aa5) 12%, transparent) 45%, transparent 70%)",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center px-6 py-14 sm:px-12 sm:py-20 md:py-24 text-center">
          {/* Status Kicker Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-4 py-1.5 text-xs text-foreground/90 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4B9AA5] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4B9AA5]" />
            </span>
            <span className="ln-mono text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground">
              Available for select opportunities
            </span>
          </div>

          {/* Heading */}
          <h2
            id="connect-callout-heading"
            className="mt-6 sm:mt-8 max-w-4xl text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15]"
          >
            Building something ambitious?{" "}
            <span className="font-[family-name:var(--font-pacifico)] text-[var(--ln-accent)] font-normal inline-block transition-colors duration-500">
              Let&apos;s craft it together.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-6 max-w-2xl text-balance text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
            Whether you&apos;re looking to scale an enterprise SaaS platform, architect a high-performance web application, or collaborate on open-source — my inbox is always open.
          </p>

          {/* Actions */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md sm:max-w-none">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/contact" className="group/btn inline-flex items-center gap-2">
                <span>Start a conversation</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </Button>

            <Button
              variant="outline"
              onClick={handleCopyEmail}
              className="w-full sm:w-auto"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Email copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy email</span>
                </>
              )}
            </Button>
          </div>

          {/* Subtle metadata footnote */}
          <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground/80">
            <Sparkles className="h-3 w-3 text-[var(--ln-accent)]" />
            <span>Based in Noida, India · Open to remote &amp; hybrid global roles</span>
          </div>
        </div>
      </div>
    </section>
  );
}
