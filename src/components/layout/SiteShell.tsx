import { Footer } from "./Footer";
import { Chrome } from "./Chrome";
import { HeroBackdrop } from "@/components/hero/HeroBackdrop";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeroBackdrop />
      <Chrome />
      <main className="relative z-10 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
