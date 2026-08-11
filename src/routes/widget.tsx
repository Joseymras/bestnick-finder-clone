import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { generateBatch, decorate, type NameFlavor } from "@/lib/names";
import { stylize } from "@/lib/fancy";
import { track } from "@/lib/analytics";
import { SITE } from "@/lib/content";

type WidgetSearch = {
  theme?: "light" | "dark";
  mode?: "nickname" | "fancy";
  count?: number;
  flavor?: NameFlavor;
  ref?: string;
};

export const Route = createFileRoute("/widget")({
  validateSearch: (search: Record<string, unknown>): WidgetSearch => ({
    theme: search.theme === "dark" ? "dark" : "light",
    mode: search.mode === "fancy" ? "fancy" : "nickname",
    count: Math.min(Math.max(Number(search.count) || 8, 3), 20),
    flavor: (typeof search.flavor === "string" ? search.flavor : "random") as NameFlavor,
    ref: typeof search.ref === "string" ? search.ref.slice(0, 60) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Free Nickname Generator Widget — BestNickFinder" },
      {
        name: "description",
        content:
          "Embeddable nickname generator widget by BestNickFinder. Type a name and get stylish nickname ideas instantly.",
      },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Free Nickname Generator Widget — BestNickFinder" },
      {
        property: "og:description",
        content: "Embeddable nickname generator widget by BestNickFinder.",
      },
    ],
  }),
  component: WidgetPage,
});

const UTM = "?utm_source=widget&utm_medium=embed&utm_campaign=nickname-widget";

function WidgetPage() {
  const { theme, mode, count, flavor, ref } = Route.useSearch();
  const dark = theme === "dark";
  const [name, setName] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const seed = useMemo(() => name.replace(/[^a-zA-Z]/g, "").slice(0, 6), [name]);

  const run = useCallback(() => {
    const list =
      mode === "fancy"
        ? stylize(name || "Nickname", count ?? 8).map((r) => r.value)
        : generateBatch(count ?? 8, flavor ?? "random", seed).map((n, i) =>
            i % 3 === 0 ? decorate(n) : n,
          );
    setResults(list);
    track("generate", "embed-widget", { host: ref ?? "unknown", mode: mode ?? "nickname" });
  }, [mode, name, count, flavor, seed, ref]);

  // Let the host page auto-size the iframe.
  useEffect(() => {
    const post = () => {
      const height = document.documentElement.scrollHeight;
      window.parent?.postMessage({ type: "bnf-widget-height", height }, "*");
    };
    post();
    const ro = new ResizeObserver(post);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [results]);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      window.setTimeout(() => setCopied(null), 1400);
      track("copy", "embed-widget", { host: ref ?? "unknown" });
    } catch {
      /* clipboard blocked in this context */
    }
  };

  return (
    <div
      className={`min-h-[1px] w-full p-4 ${dark ? "bg-ink text-ink-foreground" : "bg-background text-foreground"}`}
    >
      <div
        className={`mx-auto max-w-md rounded-2xl border p-5 ${
          dark ? "border-white/10 bg-white/5" : "border-border bg-surface"
        }`}
      >
        <h1 className="font-display text-base font-bold">🎮 Nickname Generator</h1>

        <label htmlFor="widget-name" className="mt-4 block text-xs font-semibold">
          Enter your name
        </label>
        <div className="mt-1.5 flex gap-2">
          <input
            id="widget-name"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 20))}
            placeholder="e.g. Alex"
            maxLength={20}
            onKeyDown={(e) => e.key === "Enter" && run()}
            className={`min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm outline-none ring-ring/40 transition focus:border-primary focus:ring-4 ${
              dark ? "border-white/15 bg-ink/60" : "border-input bg-background"
            }`}
          />
        </div>

        <button
          type="button"
          onClick={run}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <RefreshCw className="h-4 w-4" /> Generate Nickname
        </button>

        {results.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {results.map((r) => (
              <li key={r}>
                <button
                  type="button"
                  onClick={() => copy(r)}
                  aria-label={`Copy ${r}`}
                  className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    dark
                      ? "border-white/10 bg-ink/50 hover:border-primary"
                      : "border-border bg-background hover:border-primary"
                  }`}
                >
                  <span className="min-w-0 flex-1 truncate font-medium">{r}</span>
                  {copied === r ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 opacity-50" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-center text-[11px] opacity-70">
          Powered by{" "}
          <a
            href={`${SITE.url}/${UTM}`}
            target="_blank"
            rel="noopener"
            className="font-semibold text-primary hover:underline"
          >
            BestNickFinder
          </a>
        </p>
      </div>
    </div>
  );
}
