import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { THEME_BOOT_SCRIPT } from "@/components/theme/theme-boot";
import { Toaster } from "@/components/ui/sonner";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Shubham Saurabh – Frontend Engineer Portfolio",
  description:
    "Frontend Engineer with 5+ years of experience. SDE - I @ RateGain. A Liquid Noir portfolio by Shubham Saurabh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="ln-root dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body
        className={`${outfit.variable} ${spaceMono.variable} ln-body bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
