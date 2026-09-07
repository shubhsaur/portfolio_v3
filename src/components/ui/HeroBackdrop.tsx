"use client";

export function HeroBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 opacity-60">
        <div
          className="pointer-events-none absolute inset-[-40%] bg-[radial-gradient(circle_at_top,rgba(248,250,252,0.06),transparent_55%),radial-gradient(circle_at_bottom,rgba(0,0,0,0.8),transparent_55%)]"
        />
      </div>
    </div>
  );
}