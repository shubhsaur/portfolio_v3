"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderOverlay } from "@/components/ui/LoaderOverlay";

export function startRouteTransition(targetHref: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("portfolio:route-transition-start", {
      detail: { href: targetHref },
    })
  );
}

export function NavigationProgress() {
  const pathname = usePathname();
  const [isNavigatingBar, setIsNavigatingBar] = useState(false);
  const [isNavigatingOverlay, setIsNavigatingOverlay] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
  }, []);

  const triggerLoading = useCallback(() => {
    clearTimers();
    // Instant (0ms) top progress bar gives immediate feedback on click
    setIsNavigatingBar(true);

    // 80ms threshold: client-side route transitions that take more than
    // a single frame (~80ms) smoothly fade in the signature rotating logo loader.
    timerRef.current = setTimeout(() => {
      setIsNavigatingOverlay(true);
    }, 80);

    // Safety timeout: dismiss after 4s in case navigation is cancelled
    safetyTimerRef.current = setTimeout(() => {
      setIsNavigatingBar(false);
      setIsNavigatingOverlay(false);
    }, 4000);
  }, [clearTimers]);

  // When pathname changes, route transition has completed!
  useEffect(() => {
    clearTimers();
    setIsNavigatingBar(false);
    setIsNavigatingOverlay(false);
  }, [pathname, clearTimers]);

  // Intercept internal link clicks and popstate
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Ignore modified clicks (new tab / window)
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore hash-only links, downloads, mailto, tel, external links
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.hasAttribute("download") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      try {
        const targetUrl = new URL(href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Same origin and different pathname
        if (
          targetUrl.origin === currentUrl.origin &&
          targetUrl.pathname !== currentUrl.pathname
        ) {
          startRouteTransition(targetUrl.pathname);
          triggerLoading();
        }
      } catch {
        // Invalid URL, ignore
      }
    };

    const handleCustomStart = (e: Event) => {
      const customEvent = e as CustomEvent<{ href: string }>;
      if (customEvent.detail?.href) {
        try {
          const targetUrl = new URL(customEvent.detail.href, window.location.href);
          if (targetUrl.pathname !== window.location.pathname) {
            triggerLoading();
          }
        } catch {
          triggerLoading();
        }
      }
    };

    const handlePopState = () => {
      triggerLoading();
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    window.addEventListener("portfolio:route-transition-start", handleCustomStart);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      window.removeEventListener("portfolio:route-transition-start", handleCustomStart);
      window.removeEventListener("popstate", handlePopState);
      clearTimers();
    };
  }, [triggerLoading, clearTimers]);

  return (
    <>
      <AnimatePresence>
        {isNavigatingBar && (
          <motion.div
            key="top-progress-bar"
            className="fixed top-0 left-0 right-0 z-[10000] h-[2.5px] pointer-events-none"
            style={{
              background: "var(--ln-gradient-primary)",
              boxShadow: "0 0 10px rgba(185,130,74,0.6)",
            }}
            initial={{ scaleX: 0, transformOrigin: "0% 50%" }}
            animate={{ scaleX: 0.85 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            exit={{ scaleX: 1, opacity: 0, transition: { duration: 0.2 } }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNavigatingOverlay && <LoaderOverlay tagline="Loading Page · Shubham Saurabh" />}
      </AnimatePresence>
    </>
  );
}
