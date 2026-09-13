"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
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
  const [isNavigating, setIsNavigating] = useState(false);
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
    // 70ms threshold: avoids flash if transition is instantaneous,
    // but responds immediately if there is any perceptible delay
    timerRef.current = setTimeout(() => {
      setIsNavigating(true);
    }, 70);

    // Safety timeout: dismiss after 5s in case navigation is cancelled
    safetyTimerRef.current = setTimeout(() => {
      setIsNavigating(false);
    }, 5000);
  }, [clearTimers]);

  // When pathname changes, route transition has completed!
  useEffect(() => {
    clearTimers();
    setIsNavigating(false);
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
    <AnimatePresence>
      {isNavigating && <LoaderOverlay tagline="Loading Page · Shubham Saurabh" />}
    </AnimatePresence>
  );
}
