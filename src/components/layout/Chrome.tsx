"use client";

import { useEffect, useState, useCallback } from "react";
import { flushSync } from "react-dom";
import { Navbar } from "./Navbar";
import { CommandMenu } from "@/components/ui/CommandMenu";

export function Chrome() {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

  const handleOpenCommandMenu = useCallback(() => {
    // flushSync guarantees React updates the DOM synchronously within the
    // active user gesture execution stack — essential for mobile iOS Safari
    // and Android Chrome to pop up the virtual software keyboard.
    flushSync(() => {
      setIsCommandMenuOpen(true);
    });

    const input = document.querySelector<HTMLInputElement>('input[data-command-input="true"]');
    if (input) {
      input.focus({ preventScroll: true });
    }
  }, []);

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
      <Navbar onOpenCommandMenu={handleOpenCommandMenu} />
    </>
  );
}
