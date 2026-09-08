"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { CommandMenu } from "@/components/ui/CommandMenu";

export function Chrome() {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandMenuOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <CommandMenu
        isOpen={isCommandMenuOpen}
        onClose={() => setIsCommandMenuOpen(false)}
      />
      <Navbar onOpenCommandMenu={() => setIsCommandMenuOpen(true)} />
    </>
  );
}
