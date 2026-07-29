// Lightweight GA4 event layer. Safe to call before gtag loads (or when it never
// loads) — events are queued on dataLayer and flushed by gtag.js when present.

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type ToolEvent =
  | "generate"
  | "copy"
  | "copy_bulk"
  | "download_txt"
  | "download_png"
  | "download_svg"
  | "share"
  | "select_all"
  | "search";

/**
 * Track a tool interaction in GA4.
 * @param action what happened (generate / copy / download_png / ...)
 * @param tool   the tool or page surface that produced it
 */
export function track(action: ToolEvent, tool: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const payload = { tool, ...params };
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", action, payload);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: action, ...payload });
    }
  } catch {
    // Analytics must never break a tool.
  }
}

export function trackPageView(path: string, title?: string) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "page_view", { page_path: path, page_title: title });
  } catch {
    /* noop */
  }
}
