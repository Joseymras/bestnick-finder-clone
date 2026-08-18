import { useCallback, useMemo, useState } from "react";
import {
  generateNames,
  STYLE_LABELS,
  THEME_LABELS,
  type GenLength,
  type GenOptions,
  type GenStyle,
  type GenTheme,
} from "@/lib/engine";
import type { GenPage } from "@/lib/generators";
import { PLATFORMS } from "@/lib/markets";
import { useSelection } from "@/hooks/use-selection";
import { SelectableResults, SelectionControls } from "./SelectableResults";
import { ExportBar } from "./ExportBar";
import { FavouriteButton } from "./FavouriteButton";
import { track } from "@/lib/analytics";

const COUNTS = [10, 25, 50, 100] as const;
const LENGTHS: GenLength[] = ["any", "short", "medium", "long"];

/** Folds a visitor-supplied word into a generated name. */
function withBase(base: string, name: string, i: number): string {
  const clean = base.replace(/\s+/g, "");
  const parts = name.split(/[\s._-]+/).filter(Boolean);
  const tail = parts[parts.length - 1] ?? name;
  const head = parts[0] ?? name;
  const patterns = [
    `${clean}${tail}`,
    `${head}${clean}`,
    `${clean}.${tail.toLowerCase()}`,
    `its${clean}`,
    `${clean}${tail}x`,
    `${clean}hq`,
    `real${clean}`,
    `${head}${clean}${tail.slice(0, 2)}`,
  ];
  return patterns[i % patterns.length]!;
}

function clanTag(name: string): string {
  const letters = name.replace(/[^A-Za-z]/g, "").toUpperCase();
  return `[${letters.slice(0, 3) || "BNF"}]`;
}

/**
 * The shared generator UI for every registry-driven page: base word, style,
 * theme, length, quantity, results with copy/save/vote and one-click exports.
 */
export function GeneratorStudio({ page }: { page: GenPage }) {
  const [base, setBase] = useState("");
  const [style, setStyle] = useState<GenStyle>(page.style);
  const [theme, setTheme] = useState<GenTheme>(page.theme);
  const [length, setLength] = useState<GenLength>(page.length);
  const [numbers, setNumbers] = useState(page.numbers);
  const [symbols, setSymbols] = useState(page.symbols);
  const [count, setCount] = useState<number>(25);
  const [platform, setPlatform] = useState<string>("");
  const [seed, setSeed] = useState(0);

  const options = useMemo<GenOptions>(
    () => ({
      mode: page.mode,
      style,
      theme,
      length,
      numbers,
      symbols,
      words: page.words,
      ...(page.customNouns ? { customNouns: page.customNouns } : {}),
    }),
    [page.mode, page.words, page.customNouns, style, theme, length, numbers, symbols],
  );

  const activePlatform = PLATFORMS.find((p) => p.slug === platform);

  const results = useMemo(() => {
    void seed;
    const raw = generateNames(options, count);
    const trimmed = base.trim()
      ? raw.map((n, i) => withBase(base.trim(), n, i))
      : raw;
    const limit = activePlatform?.maxLength ?? 0;
    const fitted = limit ? trimmed.filter((n) => n.length <= limit) : trimmed;
    const unique = [...new Set(fitted.length ? fitted : trimmed)];
    return page.mode === "clan"
      ? unique.map((n) => ({ value: n, label: clanTag(n) }))
      : unique.map((n) => ({ value: n }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, count, base, seed, activePlatform?.maxLength, page.mode]);

  const values = useMemo(() => results.map((r) => r.value), [results]);
  const { selected, toggle, selectAll, clear, exportLines, count: picked } = useSelection(values);

  const regenerate = useCallback(() => {
    clear();
    setSeed((s) => s + 1);
    track("generate", page.slug, { count, style, theme });
  }, [clear, count, page.slug, style, theme]);

  const select =
    "rounded-lg border border-input bg-surface px-3 py-2 text-sm outline-none ring-ring/40 transition focus:border-primary focus:ring-4";

  return (
    <div className="surface-card p-4 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div>
          <label htmlFor="studio-base" className="mb-1.5 block text-sm font-semibold">
            Your word or name (optional)
          </label>
          <input
            id="studio-base"
            value={base}
            onChange={(e) => setBase(e.target.value)}
            maxLength={18}
            placeholder="e.g. ghost"
            className="w-full rounded-lg border border-input bg-surface px-4 py-3 text-lg outline-none ring-ring/40 transition focus:border-primary focus:ring-4"
          />
        </div>
        <div className="flex items-end">
          <button
            type="button"
            onClick={regenerate}
            className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
          >
            Generate
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <label className="sr-only" htmlFor="studio-style">
          Style
        </label>
        <select
          id="studio-style"
          value={style}
          onChange={(e) => setStyle(e.target.value as GenStyle)}
          className={select}
        >
          {Object.entries(STYLE_LABELS).map(([k, label]) => (
            <option key={k} value={k}>
              {label}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="studio-theme">
          Theme
        </label>
        <select
          id="studio-theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value as GenTheme)}
          className={select}
        >
          {Object.entries(THEME_LABELS).map(([k, label]) => (
            <option key={k} value={k}>
              {label}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="studio-length">
          Length
        </label>
        <select
          id="studio-length"
          value={length}
          onChange={(e) => setLength(e.target.value as GenLength)}
          className={select}
        >
          {LENGTHS.map((l) => (
            <option key={l} value={l}>
              {l === "any" ? "Any length" : `${l[0]!.toUpperCase()}${l.slice(1)}`}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="studio-platform">
          Platform
        </label>
        <select
          id="studio-platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className={select}
        >
          <option value="">Any platform</option>
          {PLATFORMS.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="studio-count">
          How many
        </label>
        <select
          id="studio-count"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className={select}
        >
          {COUNTS.map((c) => (
            <option key={c} value={c}>
              {c} results
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 rounded-lg border border-input bg-surface px-3 py-2 text-sm">
          <input
            type="checkbox"
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          Numbers
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-input bg-surface px-3 py-2 text-sm">
          <input
            type="checkbox"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          Symbols
        </label>
      </div>

      {activePlatform && (
        <p className="mt-3 rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          <strong className="text-foreground">{activePlatform.name}:</strong> results are filtered to{" "}
          {activePlatform.maxLength} characters or fewer. Availability is not checked — confirm the
          name on {activePlatform.name} before you commit to it.
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <SelectionControls
          total={values.length}
          selectedCount={picked}
          onSelectAll={selectAll}
          onClear={clear}
          tool={page.slug}
        />
        <ExportBar
          lines={exportLines}
          fileBase={`${base.trim() || page.slug}`}
          title={page.h1}
          tool={page.slug}
        />
      </div>

      <h2 className="mt-6 font-display text-lg font-bold">{page.resultLabel}</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Tap a name to copy it, heart it to save it in this browser, or vote to push it into the
        trending lists.
      </p>

      <div className="mt-3">
        <SelectableResults
          items={results}
          selected={selected}
          onToggle={toggle}
          tool={page.slug}
          votable
        />
      </div>

      {values.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
          <span>Save your top pick:</span>
          {values.slice(0, 6).map((v) => (
            <span key={v} className="flex items-center gap-1 rounded-md border border-border px-2 py-1">
              <span className="max-w-[10rem] truncate">{v}</span>
              <FavouriteButton value={v} source={page.slug} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
