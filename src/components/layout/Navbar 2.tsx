"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Command, Download, Mail } from "lucide-react";
import { navItems, type NavItem } from "@/lib/nav";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavbarProps {
  onOpenCommandMenu: () => void;
}

export function Navbar({ onOpenCommandMenu }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (item: NavItem) => {
    if (item.disabled) return false;
    if (item.href === "/") return pathname === "/";
    if (item.href.startsWith("/projects")) return pathname.startsWith("/projects");
    return pathname === item.href;
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-4 sm:px-6">
      <div className="pointer-events-auto w-full max-w-[1400px] px-0 sm:px-2 lg:px-4">
        <div className="flex items-center justify-between gap-2 rounded-full border border-border bg-background/70 px-4 py-2.5 shadow-[var(--ln-shadow-surface)] backdrop-blur-2xl backdrop-saturate-150 sm:gap-4 sm:px-5 sm:py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-full"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-foreground sm:tracking-[0.16em]">
                Shubham
              </span>
              <span className="ln-mono hidden text-[10px] text-muted-foreground xs:inline">
                I breathe frontend.
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-2.5 sm:flex">
            <nav className="flex items-center gap-1 rounded-full bg-muted/60 px-1.5 py-1 text-xs font-medium text-muted-foreground">
              {navItems.map((item) => {
                const active = isActive(item);
                if (item.disabled) {
                  return (
                    <span
                      key={item.label}
                      title="Coming soon"
                      className="cursor-default rounded-full px-3.5 py-1.5 text-muted-foreground/50"
                    >
                      {item.label}
                    </span>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative rounded-full px-3.5 py-1.5 transition-colors",
                      "focus-visible:ln-ring-focus",
                      active
                        ? "bg-foreground text-background shadow-sm"
                        : "hover:text-foreground",
                    )}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute bottom-0 left-2 right-2 h-px rounded-full",
                        "bg-[var(--ln-accent)]",
                        "transition-transform duration-300 ease-out",
                        active
                          ? "scale-x-100"
                          : "scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <ThemeSwitcher />

            <button
              type="button"
              onClick={onOpenCommandMenu}
              className="group flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs text-muted-foreground transition hover:border-[var(--ln-accent)] hover:text-foreground focus-visible:ln-ring-focus"
              title="Search & Quick Actions (⌘K)"
            >
              <Search className="h-3.5 w-3.5 text-muted-foreground group-hover:text-[var(--ln-accent)]" />
              <span className="text-[11px]">Search</span>
              <kbd className="ln-mono flex items-center gap-0.5 rounded border border-border bg-background/50 px-1.5 py-0.5 text-[9px] text-muted-foreground group-hover:border-[var(--ln-accent)] group-hover:text-foreground">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </button>
          </div>

          <div className="flex items-center gap-1.5 sm:hidden">
            <ThemeSwitcher />

            <button
              type="button"
              onClick={onOpenCommandMenu}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted/60 text-foreground transition hover:border-[var(--ln-accent)] hover:text-[var(--ln-accent)] active:scale-95"
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted/60 text-foreground transition hover:border-[var(--ln-accent)] hover:text-[var(--ln-accent)] focus-visible:ln-ring-focus active:scale-95"
            >
              <span className="relative h-3.5 w-4">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-0.5 w-4 rounded-full bg-current transition duration-300",
                    isMobileMenuOpen ? "top-[6px] rotate-45" : "",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[6px] h-0.5 w-4 rounded-full bg-current transition duration-200",
                    isMobileMenuOpen ? "opacity-0" : "opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[12px] h-0.5 w-4 rounded-full bg-current transition duration-300",
                    isMobileMenuOpen ? "top-[6px] -rotate-45" : "",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          id="mobile-nav-menu"
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out sm:hidden",
            isMobileMenuOpen
              ? "pointer-events-auto mt-2 max-h-[85vh] opacity-100"
              : "pointer-events-none max-h-0 opacity-0",
          )}
        >
          <div className="max-h-[80vh] overflow-y-auto rounded-[1.75rem] border border-border bg-popover p-3 shadow-[var(--ln-shadow-surface)] backdrop-blur-3xl scrollbar-none">
            <nav className="grid gap-1.5">
              {navItems.map((item, index) => {
                const active = isActive(item);
                if (item.disabled) {
                  return (
                    <span
                      key={item.label}
                      className="flex cursor-default items-center justify-between rounded-xl px-4 py-2.5 text-left text-xs font-medium text-muted-foreground/50"
                    >
                      <span>{item.label}</span>
                      <span className="ln-mono text-[9px] uppercase tracking-[0.18em] opacity-60">
                        0{index + 1}
                      </span>
                    </span>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "group relative flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-xs font-medium transition-colors",
                      "focus-visible:ln-ring-focus active:scale-[0.99]",
                      active
                        ? "bg-foreground text-background font-semibold shadow-sm"
                        : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <span>{item.label}</span>
                    <span className="ln-mono text-[9px] uppercase tracking-[0.18em] opacity-60">
                      0{index + 1}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3">
              <a
                href="/Shubham_Saurabh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Shubham_Saurabh_Resume.pdf"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-muted/40 py-2.5 text-xs font-medium text-foreground transition hover:bg-muted"
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
  );
}
