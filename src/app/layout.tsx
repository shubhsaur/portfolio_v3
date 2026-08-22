import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeContext";
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
    <html lang="en" className="ln-root">
      <body
        className={`${outfit.variable} ${spaceMono.variable} ln-body antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
