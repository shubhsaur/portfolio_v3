import { Footer } from "./Footer";
import { Chrome } from "./Chrome";
import { HeroBackdrop } from "@/components/hero/HeroBackdrop";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeroBackdrop />
      <Chrome />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
