"use client";

import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageGrid } from "@/components/layout/PageGrid";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/content/site";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "GitHub",
    href: site.socials.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: site.socials.linkedin,
    icon: Linkedin,
  },
  {
    label: "X",
    href: site.socials.x,
    icon: XIcon,
  },
] as const;

export function ContactSection({ endpoint }: { endpoint: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      setIsSubmitting(true);

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Unable to send message");
      }

      form.reset();
      toast.success("Message sent successfully.", {
        icon: <CheckCircle2 className="h-4 w-4 text-[var(--ln-success)]" />,
      });
    } catch {
      toast.error("Something went wrong. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 sm:pt-40 sm:pb-32">
      <PageGrid className="gap-y-12 sm:gap-y-16">
        <div className="col-span-4 sm:col-span-8 lg:col-span-12">
          <div className="space-y-4 text-left">
            <h1 className="text-5xl font-bold text-foreground sm:text-6xl">
              Have something worth{" "}
              <span className="font-[family-name:var(--font-pacifico)] text-[var(--ln-accent)]">
                building
              </span>
              ?
            </h1>
            <p className="max-w-3xl text-xl text-muted-foreground">
              Whether it&apos;s a product idea, a challenging interface, or simply a conversation about the web — I&apos;m always open to interesting problems and meaningful collaborations.
            </p>
          </div>
        </div>

        {/* Form */}
        <Reveal
          delay={0.03}
          className="col-span-4 sm:col-span-8 lg:col-span-7"
        >
          <Card className="border-border p-5 sm:p-7 md:p-8">
            <p className="ln-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              Send a message
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              Start with a quick note.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
              Fill out the form and your message will be delivered to my inbox
              through Getform notifications.
            </p>

            <form
              action={endpoint}
              method="POST"
              className="mt-8 grid gap-5"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me a bit about your project or say hello."
                  rows={6}
                  required
                />
              </div>

              <div className="pt-1">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[170px]"
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </Button>
              </div>
            </form>
          </Card>
        </Reveal>

        {/* Socials + resume rail */}
        <Reveal
          delay={0.06}
          className="col-span-4 sm:col-span-8 lg:col-span-4 lg:col-start-9"
        >
          <div className="space-y-6">
            <Card className="border-border p-5 sm:p-6">
              <p className="ln-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Elsewhere
              </p>
              <ul className="mt-4 space-y-2">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 rounded-[1rem] border border-transparent px-3 py-2.5 text-sm font-medium text-foreground transition hover:border-border hover:bg-muted/30"
                      >
                        <Icon className="h-4 w-4 text-[var(--ln-accent)]" />
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Card>

            <Card className="border-border p-5 sm:p-6 space-y-4">
              <div>
                <p className="ln-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  Resume
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Download a PDF overview of experience, projects, and stack.
                </p>
              </div>
              <a
                href={site.resumePath}
                download
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-input bg-transparent px-4 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--ln-accent)_25%,transparent)]"
              >
                <Download className="h-4 w-4" />
                Download resume
              </a>
            </Card>

            <Card className="border-border p-5 sm:p-6 space-y-3">
              <p className="ln-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Direct
              </p>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-sm font-medium text-foreground transition hover:text-[var(--ln-accent)]"
              >
                <Mail className="h-4 w-4 text-[var(--ln-accent)]" />
                {site.email}
              </a>
              <p className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-[var(--ln-accent)]" />
                {site.location}
              </p>
              <p className="text-xs leading-5 text-muted-foreground">
                Prefer email? Use the mailto fallback above if the form is unavailable.
              </p>
            </Card>
          </div>
        </Reveal>
      </PageGrid>
    </div>
  );
}
