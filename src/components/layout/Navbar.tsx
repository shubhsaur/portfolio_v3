"use client";

import { useEffect, useState } from "react";
import { sections, type SectionId } from "@/lib/sections";

interface ActiveState {
  id: SectionId;
}

export function Navbar() {
  const [active, setActive] = useState<ActiveState>({ id: "hero" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => section != null);

    const updateActiveSection = () => {
      const offset = 140;
      let currentId: SectionId = "hero";

      for (const section of sectionElements) {
        if (window.scrollY >= section.offsetTop - offset) {
          currentId = section.id as SectionId;
        }
      }

      setActive((prev) => (prev.id === currentId ? prev : { id: currentId }));
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const handleClick = (id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;

    setIsMobileMenuOpen(false);
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4 sm:px-6">
      <div className="pointer-events-auto w-full max-w-5xl">
        <div className="flex items-center justify-between gap-4 rounded-full border border-white/5 bg-black/50 px-4 py-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl backdrop-saturate-150">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-linear-to-tr from-yellow-400 via-rose-400 to-emerald-300 shadow-[0_0_0_1px_rgba(15,23,42,0.8)]" />
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
                Shubham Saurabh
              </span>
              <span className="ln-mono text-[10px] text-zinc-500">
                I breathe frontend.
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-1 rounded-full bg-zinc-900/40 px-1 py-0.5 text-[11px] font-medium text-zinc-400 sm:flex">
            {sections.map((section) => {
              const isActive = active.id === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleClick(section.id)}
                  className={[
                    "group relative rounded-full px-3 py-1 transition-colors",
                    "focus-visible:ln-ring-focus",
                    isActive
                      ? "bg-zinc-100 text-zinc-950 shadow-sm"
                      : "hover:text-zinc-100",
                  ].join(" ")}
                >
                  <span className="relative z-10">{section.label}</span>
                  <span
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute bottom-0 left-2 right-2 h-px rounded-full",
                      "bg-[var(--ln-accent-gold)] shadow-[0_0_12px_rgba(232,197,71,0.7)]",
                      "transition-transform duration-300 ease-out",
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-zinc-900/40 text-zinc-200 transition hover:border-[rgba(232,197,71,0.3)] hover:text-[var(--ln-accent-gold)] focus-visible:ln-ring-focus sm:hidden"
          >
            <span className="relative h-4 w-5">
              <span
                className={[
                  "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition duration-300",
                  isMobileMenuOpen ? "top-[7px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition duration-200",
                  isMobileMenuOpen ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition duration-300",
                  isMobileMenuOpen ? "top-[7px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>

        <div
          id="mobile-nav-menu"
          className={[
            "overflow-hidden transition-all duration-300 ease-out sm:hidden",
            isMobileMenuOpen
              ? "pointer-events-auto mt-3 max-h-[420px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="rounded-[1.75rem] border border-white/8 bg-black/70 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
            <nav className="grid gap-2">
              {sections.map((section) => {
                const isActive = active.id === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleClick(section.id)}
                    className={[
                      "group relative flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition-colors",
                      "focus-visible:ln-ring-focus",
                      isActive
                        ? "bg-zinc-100 text-zinc-950"
                        : "bg-white/[0.02] text-zinc-300 hover:bg-white/[0.04] hover:text-zinc-50",
                    ].join(" ")}
                  >
                    <span>{section.label}</span>
                    <span className="ln-mono text-[10px] uppercase tracking-[0.18em]">
                      0{sections.findIndex((item) => item.id === section.id) + 1}
                    </span>
                    <span
                      aria-hidden="true"
                      className={[
                        "pointer-events-none absolute bottom-2 left-4 right-4 h-px rounded-full",
                        "bg-[var(--ln-accent-gold)] shadow-[0_0_12px_rgba(232,197,71,0.7)]",
                        "transition-transform duration-300 ease-out",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left",
                      ].join(" ")}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
