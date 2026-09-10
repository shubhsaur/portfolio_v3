import type { Metadata } from "next";
import { Outfit, Space_Mono, Pacifico } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { THEME_BOOT_SCRIPT } from "@/components/theme/theme-boot";
import { Toaster } from "@/components/ui/sonner";
import { SiteShell } from "@/components/layout/SiteShell";
import { Loader } from "@/components/ui/Loader";
import { SITE_URL, routeMeta } from "@/lib/seo";
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

const pacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-pacifico",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: routeMeta.home.title,
    template: "%s · Shubham Saurabh",
  },
  description: routeMeta.home.description,
  openGraph: {
    type: "website",
    siteName: "Shubham Saurabh",
    images: [{ url: "/og/default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
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
        className={`${outfit.variable} ${spaceMono.variable} ${pacifico.variable} ln-body bg-background text-foreground antialiased`}
      >
        <Loader />
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
