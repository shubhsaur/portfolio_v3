import { Footer } from "./Footer";
import { Chrome } from "./Chrome";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Chrome />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
