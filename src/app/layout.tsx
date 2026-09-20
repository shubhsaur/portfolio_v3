import type { Metadata, Viewport } from "next";
import { Outfit, Space_Mono, Pacifico } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { THEME_BOOT_SCRIPT } from "@/components/theme/theme-boot";
import { Toaster } from "@/components/ui/sonner";
import { SiteShell } from "@/components/layout/SiteShell";
import { Loader } from "@/components/ui/Loader";
import { NavigationProgress } from "@/components/providers/NavigationProgress";
import { SITE_URL, routeMeta } from "@/lib/seo";
import { personSchema } from "@/lib/schema";
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
  keywords: [
    "Shubham Saurabh",
    "Full Stack Developer",
    "UI Designer",
    "Software Engineer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Frontend Engineer",
    "Portfolio",
  ],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Shubham Saurabh",
    images: [{ url: "/og/default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fa" },
    { media: "(prefers-color-scheme: dark)", color: "#06060a" },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${spaceMono.variable} ${pacifico.variable} ln-body bg-background text-foreground antialiased`}
      >
        <Loader />
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
          <Toaster />
          <NavigationProgress />
        </ThemeProvider>
      </body>
    </html>
  );
}
