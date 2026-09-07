export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border pt-6 pb-12 text-xs text-muted-foreground sm:pb-6">
      <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="ln-mono text-[10px] uppercase tracking-[0.18em]">
          © {year} Shubham Saurabh
        </p>
        <p className="text-[11px] text-muted-foreground">
          Crafted in Next.js · Inspired by Liquid Noir
        </p>
      </div>
    </footer>
  );
}

