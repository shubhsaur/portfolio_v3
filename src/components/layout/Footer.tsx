"use client";

import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";
import { site } from "@/lib/content/site";
import Link from "next/link";

const socials = [
  { href: site.socials.github, icon: Github, label: "GitHub" },
  { href: site.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: site.socials.x, icon: Twitter, label: "X (Twitter)" },
];

const footerNav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ln-footer relative mt-20 overflow-hidden border-t border-[var(--ln-glass-border)]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 pt-14 pb-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {/* Col 1 — Identity */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold tracking-tight text-foreground">
              Shubham Saurabh
            </p>
            <p className="text-[0.8125rem] leading-relaxed text-muted-foreground max-w-[18rem]">
              Frontend Engineer building scalable web applications with React, Next.js &amp; TypeScript. Currently at RateGain.
            </p>
            <div className="flex items-center gap-2 text-[0.75rem] text-muted-foreground">
              <MapPin className="h-3 w-3 text-[var(--ln-accent)]" />
              <span>{site.location}</span>
            </div>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-[0.75rem] text-muted-foreground transition-colors hover:text-[var(--ln-accent)]"
            >
              <Mail className="h-3 w-3" />
              <span>{site.email}</span>
            </a>
          </div>

          {/* Col 2 — Navigation */}
          <div className="flex flex-col gap-3">
            <p className="ln-mono text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-[var(--ln-text-soft)]">
              Navigation
            </p>
            <nav className="grid gap-2">
              {footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Connect */}
          <div className="flex flex-col gap-3">
            <p className="ln-mono text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-[var(--ln-text-soft)]">
              Connect
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lg-icon-btn"
                  aria-label={label}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
            <p className="text-[0.75rem] text-muted-foreground mt-2">
              Open to collaborations &amp; freelance projects.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-3 border-t border-[var(--ln-glass-border)] py-6 sm:flex-row sm:justify-between">
          <p className="ln-mono text-[0.625rem] uppercase tracking-[0.18em] text-[var(--ln-text-soft)]">
            © {year} Shubham Saurabh
          </p>
          <p className="text-[0.625rem] text-[var(--ln-text-soft)]">
            Crafted in Next.js · Liquid Noir
          </p>
        </div>
      </div>
    </footer>
  );
}
