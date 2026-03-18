export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/5 pt-6 text-xs text-zinc-500">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="ln-mono text-[10px] uppercase tracking-[0.18em]">
          © {year} Shubham Saurabh
        </p>
        <p className="text-[11px] text-zinc-500">
          Crafted in Next.js · Inspired by Liquid Noir
        </p>
      </div>
    </footer>
  );
}

