"use client";

import { useEffect, useState } from "react";
import { Search, Command, Download, Mail } from "lucide-react";
import { sections, type SectionId } from "@/lib/sections";
import { CommandMenu } from "@/components/ui/CommandMenu";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

interface ActiveState {
  id: SectionId;
}

export function Navbar() {
  const [active, setActive] = useState<ActiveState>({ id: "hero" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandMenuOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    <>
      <CommandMenu
        isOpen={isCommandMenuOpen}
        onClose={() => setIsCommandMenuOpen(false)}
      />
      <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-4 sm:px-6">
        <div className="pointer-events-auto w-full max-w-6xl xl:px-4">
          <div className="flex items-center justify-between gap-2 rounded-full border border-white/8 bg-black/60 px-3 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl backdrop-saturate-150 sm:gap-4 sm:px-4 sm:py-2.5">
            {/* Logo / Brand */}
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 shrink-0 rounded-full bg-linear-to-tr from-yellow-400 via-rose-400 to-emerald-300 shadow-[0_0_0_1px_rgba(15,23,42,0.8)]" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300 sm:tracking-[0.16em]">
                  Shubham
                </span>
                <span className="ln-mono hidden text-[10px] text-zinc-500 xs:inline">
                  I breathe frontend.
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-2.5 sm:flex">
              <nav className="flex items-center gap-1 rounded-full bg-zinc-900/40 px-1 py-0.5 text-[11px] font-medium text-zinc-400">
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

              {/* Theme Palette Switcher */}
              <ThemeSwitcher />

              {/* Cmd + K palette trigger button */}
              <button
                type="button"
                onClick={() => setIsCommandMenuOpen(true)}
                className="group flex items-center gap-2 rounded-full border border-white/8 bg-zinc-900/40 px-3 py-1 text-xs text-zinc-400 transition hover:border-[rgba(232,197,71,0.4)] hover:text-zinc-200 focus-visible:ln-ring-focus"
                title="Search & Quick Actions (⌘K)"
              >
                <Search className="h-3.5 w-3.5 text-zinc-400 group-hover:text-[var(--ln-accent-gold)]" />
                <span className="text-[11px]">Search</span>
                <kbd className="ln-mono flex items-center gap-0.5 rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[9px] text-zinc-400 group-hover:border-[rgba(232,197,71,0.3)] group-hover:text-zinc-300">
                  <Command className="h-2.5 w-2.5" />K
                </kbd>
              </button>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex items-center gap-1.5 sm:hidden">
              <ThemeSwitcher />

              <button
                type="button"
                onClick={() => setIsCommandMenuOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/8 bg-zinc-900/40 text-zinc-300 transition hover:border-[rgba(232,197,71,0.3)] hover:text-[var(--ln-accent-gold)] active:scale-95"
                aria-label="Open Command Menu"
              >
                <Search className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-menu"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/8 bg-zinc-900/40 text-zinc-200 transition hover:border-[rgba(232,197,71,0.3)] hover:text-[var(--ln-accent-gold)] focus-visible:ln-ring-focus active:scale-95"
              >
                <span className="relative h-3.5 w-4">
                  <span
                    className={[
                      "absolute left-0 top-0 h-0.5 w-4 rounded-full bg-current transition duration-300",
                      isMobileMenuOpen ? "top-[6px] rotate-45" : "",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "absolute left-0 top-[6px] h-0.5 w-4 rounded-full bg-current transition duration-200",
                      isMobileMenuOpen ? "opacity-0" : "opacity-100",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "absolute left-0 top-[12px] h-0.5 w-4 rounded-full bg-current transition duration-300",
                      isMobileMenuOpen ? "top-[6px] -rotate-45" : "",
                    ].join(" ")}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Drawer */}
          <div
            id="mobile-nav-menu"
            className={[
              "overflow-hidden transition-all duration-300 ease-out sm:hidden",
              isMobileMenuOpen
                ? "pointer-events-auto mt-2 max-h-[85vh] opacity-100"
                : "pointer-events-none max-h-0 opacity-0",
            ].join(" ")}
          >
            <div className="max-h-[80vh] overflow-y-auto rounded-[1.75rem] border border-white/10 bg-black/85 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.85)] backdrop-blur-3xl scrollbar-none">
              <nav className="grid gap-1.5">
                {sections.map((section) => {
                  const isActive = active.id === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => handleClick(section.id)}
                      className={[
                        "group relative flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-xs font-medium transition-colors",
                        "focus-visible:ln-ring-focus active:scale-[0.99]",
                        isActive
                          ? "bg-zinc-100 text-zinc-950 font-semibold shadow-sm"
                          : "bg-white/[0.02] text-zinc-300 hover:bg-white/[0.05] hover:text-zinc-50",
                      ].join(" ")}
                    >
                      <span>{section.label}</span>
                      <span className="ln-mono text-[9px] uppercase tracking-[0.18em] opacity-60">
                        0{sections.findIndex((item) => item.id === section.id) + 1}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Mobile Quick Action Buttons */}
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/8 pt-3">
                <a
                  href="/Shubham_Saurabh_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Shubham_Saurabh_Resume.pdf"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-medium text-zinc-200 transition hover:bg-white/[0.08]"
                >
                  <Download className="h-3.5 w-3.5 text-[var(--ln-accent-gold)]" />
                  <span>Resume</span>
                </a>

                <a
                  href="mailto:shubhamsaurabh@outlook.com"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-[rgba(232,197,71,0.25)] bg-[rgba(232,197,71,0.1)] py-2.5 text-xs font-medium text-[var(--ln-accent-gold)] transition hover:bg-[rgba(232,197,71,0.18)]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Contact</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
