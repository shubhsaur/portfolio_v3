"use client";

import { Github, Linkedin, Twitter, Mail, MapPin, Copyright } from "lucide-react";
import { site } from "@/lib/content/site";
import Link from "next/link";
import Image from "next/image";

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
    <footer className="ln-footer relative mt-20 overflow-hidden border-t border-[var(--ln-accent)]/20">
      {/* Accent glow radiating upward from bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--ln-accent) 30%, transparent) 0%, color-mix(in srgb, var(--ln-accent) 14%, transparent) 20%, color-mix(in srgb, var(--ln-accent) 4%, transparent) 50%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 pt-14 pb-12 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-[1fr_1fr_1fr_auto] lg:gap-16">
          {/* Col 1 — Identity */}
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-1 lg:col-span-1">
            <p className="footer-brand text-lg font-semibold tracking-tight text-white">
              Shubham Saurabh
            </p>
            <p className="text-[0.8125rem] leading-relaxed text-white/70 max-w-[18rem]">
              Frontend Engineer building scalable web applications with React, Next.js &amp; TypeScript. Currently at RateGain.
            </p>
            <div className="flex items-center gap-2 text-[0.75rem] text-white/70">
              <MapPin className="h-3 w-3 text-[var(--ln-accent)]" />
              <span>{site.location}</span>
            </div>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-[0.75rem] text-white/70 transition-colors hover:text-[var(--ln-accent)]"
            >
              <Mail className="h-3 w-3" />
              <span>{site.email}</span>
            </a>
          </div>

          {/* Col 2 — Navigation */}
          <div className="col-span-1 flex flex-col gap-3">
            <p className="ln-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/50">
              Navigation
            </p>
            <nav className="grid gap-2">
              {footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[0.9375rem] text-white/70 transition-colors hover:text-[var(--ln-accent)] w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Connect */}
          <div className="col-span-1 flex flex-col gap-3">
            <p className="ln-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/50">
              Connect
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lg-icon-btn hover:!border-[var(--ln-accent)] hover:!text-[var(--ln-accent)]"
                  aria-label={label}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
            <p className="text-[0.75rem] text-white/70 mt-2">
              Open to collaborations &amp; freelance projects.
            </p>
          </div>

          {/* Col 4 — Logo */}
          <div className="col-span-2 flex items-center justify-center sm:col-span-1 lg:col-span-1">
            <div
              className="relative flex items-center justify-center rounded-full"
              style={{
                boxShadow:
                  "0 0 120px 35px color-mix(in srgb, var(--ln-accent) 40%, transparent), 0 0 60px 15px color-mix(in srgb, var(--ln-accent) 20%, transparent), 0 0 200px 60px color-mix(in srgb, var(--ln-accent) 10%, transparent)",
              }}
            >
              <Image
                src="/logo.png"
                alt="Shubham Saurabh logo"
                width={160}
                height={160}
                className="h-32 w-32 rounded-full object-cover sm:h-36 sm:w-36 lg:h-40 lg:w-40"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — full-width to match top border */}
      <div className="border-t border-[var(--ln-accent)]/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p className="ln-mono flex items-center gap-1.5 text-[0.625rem] uppercase tracking-[0.18em] text-white/70">
            <Copyright className="h-3 w-3" />{year} | All Rights Reserved
          </p>
          <p className="font-[family-name:var(--font-pacifico)] text-sm text-white/70">
            Designed by Shubham
          </p>
        </div>
      </div>
    </footer>
  );
}
