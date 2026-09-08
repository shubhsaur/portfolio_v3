"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Command, Download, Mail } from "lucide-react";
import { navItems, type NavItem } from "@/lib/nav";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { themes, useTheme, type AccentTheme } from "@/components/theme/ThemeContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavbarProps {
  onOpenCommandMenu: () => void;
}

export function Navbar({ onOpenCommandMenu }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeTheme, setTheme } = useTheme();

  const isActive = (item: NavItem) => {
    if (item.disabled) return false;
    if (item.href === "/") return pathname === "/";
    if (item.href.startsWith("/projects")) return pathname.startsWith("/projects");
    return pathname === item.href;
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 z-40 flex justify-center px-[var(--nav-px)]" style={{ top: "var(--nav-top)" }}>
      <div className="pointer-events-auto w-full max-w-[87.5rem] lg:px-[1rem]">
        <div className="flex items-center justify-between rounded-full border border-border bg-background/70 px-[var(--nav-px)] py-[var(--nav-py)] shadow-[var(--ln-shadow-surface)] backdrop-blur-2xl backdrop-saturate-150">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[0.5rem]">
            <Image
              src="/logo.png"
              alt="Logo"
              width={36}
              height={36}
              className="shrink-0 rounded-full"
              style={{ width: "var(--nav-logo-size)", height: "var(--nav-logo-size)" }}
              priority
            />
            <div className="hidden sm:flex flex-col justify-center leading-tight">
              <span
                className="font-semibold uppercase text-foreground"
                style={{ fontSize: "var(--nav-logo-text)", letterSpacing: "var(--nav-logo-tracking)" }}
              >
                Shubham
              </span>
              <span
                className="font-semibold uppercase text-foreground"
                style={{ fontSize: "var(--nav-logo-text)", letterSpacing: "var(--nav-logo-tracking)" }}
              >
                Saurabh
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center" style={{ gap: "var(--nav-gap)" }}>
            <nav className="flex items-center gap-[0.25rem] rounded-full bg-muted/60 px-[0.375rem] py-[0.25rem] text-xs font-medium text-muted-foreground">
              {navItems.map((item) => {
                const active = isActive(item);
                if (item.disabled) {
                  return (
                    <span
                      key={item.label}
                      title="Coming soon"
                      className="cursor-default rounded-full text-muted-foreground/50"
                      style={{ padding: "var(--nav-item-py) var(--nav-item-px)" }}
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
                      "group relative rounded-full transition-colors",
                      "focus-visible:ln-ring-focus",
                      active
                        ? "bg-foreground text-background shadow-sm"
                        : "hover:text-foreground",
                    )}
                    style={{ padding: "var(--nav-item-py) var(--nav-item-px)" }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute bottom-0 left-2 right-2 h-px rounded-full",
                        "bg-[var(--ln-accent)]",
                        "transition-transform duration-300 ease-out",
                        active
                          ? "scale-x-0"
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
              className="group flex items-center gap-[0.5rem] rounded-full border border-border bg-muted/60 text-xs text-muted-foreground transition hover:border-[var(--ln-accent)] hover:text-foreground focus-visible:ln-ring-focus"
              style={{ padding: "var(--nav-search-py) var(--nav-search-px)" }}
              title="Search & Quick Actions (⌘K)"
            >
              <Search className="text-muted-foreground group-hover:text-[var(--ln-accent)]" style={{ width: "var(--nav-icon)", height: "var(--nav-icon)" }} />
              <span className="hidden lg:inline text-xs">Search</span>
              <kbd className="ln-mono hidden lg:flex items-center gap-[0.125rem] rounded border border-border bg-background/50 px-[0.375rem] py-[0.125rem] text-[9px] text-muted-foreground group-hover:border-[var(--ln-accent)] group-hover:text-foreground">
                <Command className="h-[0.625rem] w-[0.625rem]" />K
              </kbd>
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center md:hidden" style={{ gap: "var(--nav-mobile-gap)" }}>
            <ThemeSwitcher />

            <button
              type="button"
              onClick={onOpenCommandMenu}
              className="flex items-center justify-center rounded-full border border-border bg-muted/60 text-foreground transition hover:border-[var(--ln-accent)] hover:text-[var(--ln-accent)] active:scale-95"
              style={{ width: "var(--nav-mobile-btn)", height: "var(--nav-mobile-btn)" }}
              aria-label="Open Command Menu"
            >
              <Search style={{ width: "var(--nav-icon)", height: "var(--nav-icon)" }} />
            </button>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-menu"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="flex items-center justify-center rounded-full border border-border bg-muted/60 text-foreground transition hover:border-[var(--ln-accent)] hover:text-[var(--ln-accent)] focus-visible:ln-ring-focus active:scale-95"
              style={{ width: "var(--nav-mobile-btn)", height: "var(--nav-mobile-btn)" }}
            >
              <span className="relative h-[0.75rem] w-[1rem]">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[0.125rem] w-full rounded-full bg-current transition duration-300",
                    isMobileMenuOpen ? "top-[0.3125rem] rotate-45" : "",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[0.3125rem] h-[0.125rem] w-full rounded-full bg-current transition duration-200",
                    isMobileMenuOpen ? "opacity-0" : "opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[0.625rem] h-[0.125rem] w-full rounded-full bg-current transition duration-300",
                    isMobileMenuOpen ? "top-[0.3125rem] -rotate-45" : "",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          id="mobile-nav-menu"
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out md:hidden",
            isMobileMenuOpen
              ? "pointer-events-auto mt-[0.5rem] max-h-[85vh] opacity-100"
              : "pointer-events-none max-h-0 opacity-0",
          )}
        >
          <div className="max-h-[80vh] overflow-y-auto rounded-2xl border border-border bg-popover p-[var(--nav-dropdown-px)] shadow-[var(--ln-shadow-surface)] backdrop-blur-3xl scrollbar-none">
            <nav className="grid gap-[0.25rem]">
              {navItems.map((item, index) => {
                const active = isActive(item);
                if (item.disabled) {
                  return (
                    <span
                      key={item.label}
                      className="flex cursor-default items-center justify-between rounded-xl px-[1rem] py-[var(--nav-dropdown-py)] text-left text-xs font-medium text-muted-foreground/50"
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
                      "group relative flex items-center justify-between rounded-xl px-[1rem] py-[var(--nav-dropdown-py)] text-left text-xs font-medium transition-colors",
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

            <div className="mt-[0.75rem] grid grid-cols-2 gap-[0.5rem] border-t border-border pt-[0.75rem]">
              <a
                href="/Shubham_Saurabh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Shubham_Saurabh_Resume.pdf"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-[0.375rem] rounded-xl border border-border bg-muted/40 py-[var(--nav-dropdown-py)] text-xs font-medium text-foreground transition hover:bg-muted"
              >
                <Download className="h-[0.875rem] w-[0.875rem] text-[var(--ln-accent)]" />
                <span>Resume</span>
              </a>

              <a
                href="mailto:shubhamsaurabh@outlook.com"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-[0.375rem] rounded-xl border border-[var(--ln-accent)]/25 bg-[var(--ln-accent)]/10 py-[var(--nav-dropdown-py)] text-xs font-medium text-[var(--ln-accent)] transition hover:bg-[var(--ln-accent)]/18"
              >
                <Mail className="h-[0.875rem] w-[0.875rem]" />
                <span>Contact</span>
              </a>
            </div>

            {/* Accent palette (mobile-only) */}
            <div className="mt-[0.75rem] border-t border-border pt-[0.75rem]">
              <p className="px-[1rem] pb-[0.5rem] text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Accent</p>
              <div className="flex items-center gap-[0.5rem] px-[1rem]">
                {(Object.keys(themes) as AccentTheme[]).map((themeKey) => {
                  const theme = themes[themeKey];
                  return (
                    <button
                      key={themeKey}
                      type="button"
                      onClick={() => setTheme(themeKey)}
                      className={`flex h-[1.5rem] w-[1.5rem] items-center justify-center rounded-full transition-transform hover:scale-110 ${activeTheme === themeKey ? "ring-2 ring-foreground/40 ring-offset-1 ring-offset-popover" : ""}`}
                      aria-label={`Switch theme to ${theme.name}`}
                    >
                      <span
                        className="h-[1rem] w-[1rem] rounded-full"
                        style={{ backgroundColor: theme.dotColor }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
