import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { applyOverride, loadOverrides, normalisePath } from "@/lib/seo-overrides";

/**
 * Applies owner-published SEO overrides to the current page. Build-time head
 * tags stay as the fallback, so pages are never blank for crawlers that don't
 * run JavaScript — the override simply refreshes them without a redeploy.
 */
export function useSeoOverrides() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let active = true;
    void loadOverrides().then((map) => {
      if (!active) return;
      const hit = map[normalisePath(pathname)];
      if (hit) applyOverride(hit);
    });
    return () => {
      active = false;
    };
  }, [pathname]);
}
