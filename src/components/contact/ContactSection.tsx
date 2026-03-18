"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, Send, User } from "lucide-react";
import { useState, type FormEvent } from "react";

const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/shubhsaur",
    icon: Github,
  },
  {
    label: "X",
    href: "https://x.com/shubhsaur",
    icon: Send,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shubhsaur",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:shubhamsaurabh@outlook.com",
    icon: Mail,
  },
];

export function ContactSection({ endpoint }: { endpoint: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      setIsSubmitting(true);
      setStatus("idle");

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
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-start gap-5 text-left md:items-center md:text-center">
        <span className="ln-mono inline-flex rounded-full border border-[rgba(232,197,71,0.18)] bg-[rgba(232,197,71,0.08)] px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[var(--ln-accent-gold)]">
          Contact
        </span>
        <div className="space-y-4">
          <h2
            id="contact-heading"
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl"
          >
            Let&apos;s connect
          </h2>
          <p className="max-w-2xl text-base leading-8 text-zinc-400">
            Whether you want to discuss a project, explore a frontend role, or
            just say hello, I&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <Card className="overflow-visible rounded-[2rem] border-white/8 bg-[radial-gradient(circle_at_top,rgba(232,197,71,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] lg:items-start">
          <div>
            <p className="ln-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
              Send a message
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50">
              Start with a quick note.
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
              Fill out the form and your message will be delivered to my inbox
              through Getform notifications.
            </p>
            {status === "success" ? (
              <p className="mt-4 rounded-2xl border border-emerald-400/15 bg-emerald-400/8 px-4 py-3 text-sm text-emerald-200">
                Message sent successfully.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="mt-4 rounded-2xl border border-rose-400/15 bg-rose-400/8 px-4 py-3 text-sm text-rose-200">
                Something went wrong. Please try again.
              </p>
            ) : null}
          </div>

          <form
            action={endpoint}
            method="POST"
            className="grid gap-4"
            onSubmit={handleSubmit}
          >
            <label className="grid gap-2">
              <span className="text-sm font-medium text-zinc-200">Name</span>
              <div className="group relative flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 transition duration-300 focus-within:border-[rgba(232,197,71,0.45)] focus-within:shadow-[0_0_0_1px_rgba(232,197,71,0.14),0_0_24px_rgba(232,197,71,0.18)]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-focus-within:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at top, rgba(232,197,71,0.16), transparent 70%)",
                  }}
                />
                <User className="h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="relative z-10 w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                />
              </div>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-zinc-200">Email</span>
              <div className="group relative flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 transition duration-300 focus-within:border-[rgba(232,197,71,0.45)] focus-within:shadow-[0_0_0_1px_rgba(232,197,71,0.14),0_0_24px_rgba(232,197,71,0.18)]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-focus-within:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at top, rgba(232,197,71,0.16), transparent 70%)",
                  }}
                />
                <Mail className="h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="relative z-10 w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                />
              </div>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-zinc-200">Message</span>
              <div className="group relative rounded-[1.5rem] border border-white/8 bg-black/20 transition duration-300 focus-within:border-[rgba(232,197,71,0.45)] focus-within:shadow-[0_0_0_1px_rgba(232,197,71,0.14),0_0_28px_rgba(232,197,71,0.18)]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 transition duration-300 group-focus-within:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at top, rgba(232,197,71,0.16), transparent 72%)",
                  }}
                />
                <textarea
                  name="message"
                  placeholder="Tell me a bit about your project or say hello."
                  required
                  rows={6}
                  className="relative z-10 w-full rounded-[1.5rem] bg-transparent px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                />
              </div>
            </label>

            <div className="pt-2">
              <motion.div
                className="inline-block rounded-full"
                whileHover={
                  prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }
                }
              >
                <div className="rounded-full shadow-[0_0_0_rgba(232,197,71,0)] transition duration-300 hover:shadow-[0_0_30px_rgba(232,197,71,0.28)]">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[170px] bg-[var(--ln-accent-gold)] text-zinc-950 hover:bg-[#f0d06c]"
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                  </Button>
                </div>
              </motion.div>
            </div>
          </form>
        </div>
      </Card>

      <div className="space-y-5">
        <p className="text-center text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
          Connect here
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {contactLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="group inline-flex min-w-[180px] items-center justify-center gap-3 rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] px-5 py-4 text-base font-medium text-zinc-200 transition hover:border-[rgba(232,197,71,0.22)] hover:text-[var(--ln-accent-gold)]"
              >
                <Icon className="h-5 w-5 transition group-hover:scale-110" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
